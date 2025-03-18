/*


import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const data = await AsyncStorage.getItem('expenses');
      if (data) setExpenses(JSON.parse(data));
    };
    fetchExpenses();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Expenses: ${expenses.reduce((sum, item) => sum + item.amount, 0)}</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={ styles.expenseHistory } >{item.category}: ${item.amount}</Text>}
      />
      <Button style={styles.addBtnStyle} title="Add Expense" onPress={() => navigation.navigate('AddExpense')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 30, fontWeight: 'bold', marginBottom: 10, marginTop: 30 },
expenseHistory: { fontSize: 25 },
addBtnStyle: { marginBottom: 100 }
}); 


*/





import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState({});
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    const fetchExpenses = async () => {
      const data = await AsyncStorage.getItem('expenses');
      if (data) setExpenses(JSON.parse(data));

      const budgetData = await AsyncStorage.getItem('budget');
      if (budgetData) setBudget(JSON.parse(budgetData));

      const savedCurrency = await AsyncStorage.getItem('currency');
      if (savedCurrency) setCurrency(savedCurrency);
    };

    fetchExpenses();
  }, []);

  const checkBudget = () => {
    const warnings = [];
    Object.keys(budget).forEach((category) => {
      const spent = expenses
        .filter((exp) => exp.category === category)
        .reduce((sum, exp) => sum + exp.amount, 0);
      if (spent > budget[category]) {
        warnings.push(`${category} budget exceeded! (${currency} ${spent}/${budget[category]})`);
      }
    });

    if (warnings.length > 0) {
      Alert.alert('Budget Warnings', warnings.join('\n'));
    }
  };

  useEffect(() => {
    checkBudget();
  }, [expenses]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Expenses: {currency} {expenses.reduce((sum, item) => sum + item.amount, 0)}</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.category}: {currency} {item.amount}</Text>}
      />
      <Button style={styles.addBtn} title="Add Expense" onPress={() => navigation.navigate('AddExpense')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 30 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginTop: 40 },
  addBtn: {marginBottom: 50}
});
