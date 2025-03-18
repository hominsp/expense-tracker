/*

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BudgetScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget Management</Text>
      <Text>Coming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold' },
});


*/




import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar } from 'react-native-paper';

export default function BudgetScreen() {
  const [budget, setBudget] = useState({});
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const loadBudget = async () => {
      const savedBudget = await AsyncStorage.getItem('budget');
      if (savedBudget) setBudget(JSON.parse(savedBudget));

      const savedExpenses = await AsyncStorage.getItem('expenses');
      if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    };

    loadBudget();
  }, []);

  const addBudget = async () => {
    if (!category || !amount) return;
    const newBudget = { ...budget, [category]: parseFloat(amount) };
    setBudget(newBudget);
    await AsyncStorage.setItem('budget', JSON.stringify(newBudget));
    setCategory('');
    setAmount('');
  };

  const getCategorySpent = (category) => {
    return expenses
      .filter((exp) => exp.category === category)
      .reduce((sum, exp) => sum + exp.amount, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Budget</Text>
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <TextInput
        placeholder="Budget Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />
      <Button title="Add Budget" onPress={addBudget} />

      <FlatList
        data={Object.keys(budget)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const spent = getCategorySpent(item);
          const limit = budget[item];
          return (
            <View style={styles.budgetItem}>
              <Text>{item}: ${spent} / ${limit}</Text>
              <ProgressBar progress={spent / limit} color={spent > limit ? 'red' : 'green'} />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  budgetItem: { marginVertical: 10 },
});
