/*

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddExpenseScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const saveExpense = async () => {
    if (!amount || !category) return;
    const newExpense = { amount: parseFloat(amount), category };
    const storedData = await AsyncStorage.getItem('expenses');
    const expenses = storedData ? JSON.parse(storedData) : [];
    expenses.push(newExpense);
    await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Category:</Text>
      <TextInput style={styles.input} onChangeText={setCategory} />
      <Text>Amount:</Text>
      <TextInput style={styles.input} keyboardType="numeric" onChangeText={setAmount} />
      <Button title="Save Expense" onPress={saveExpense} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
});


*/


import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddExpenseScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    const fetchCurrency = async () => {
      const savedCurrency = await AsyncStorage.getItem('currency');
      if (savedCurrency) setCurrency(savedCurrency);
    };
    fetchCurrency();
  }, []);

  const saveExpense = async () => {
    if (!amount || !category) return;
    const newExpense = { amount: parseFloat(amount), category };
    const storedData = await AsyncStorage.getItem('expenses');
    const expenses = storedData ? JSON.parse(storedData) : [];
    expenses.push(newExpense);
    await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Category:</Text>
      <TextInput style={styles.input} onChangeText={setCategory} />
      <Text>Amount ({currency}):</Text>
      <TextInput style={styles.input} keyboardType="numeric" onChangeText={setAmount} />
      <Button title="Save Expense" onPress={saveExpense} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
});
