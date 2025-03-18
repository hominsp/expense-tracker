/*


import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TransactionsScreen() {
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
      <Text style={styles.title}>All Transactions</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.category}: ${item.amount}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});


*/



import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TransactionsScreen() {
  const [expenses, setExpenses] = useState([]);
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem('expenses');
      if (data) setExpenses(JSON.parse(data));

      const savedCurrency = await AsyncStorage.getItem('currency');
      if (savedCurrency) setCurrency(savedCurrency);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Transactions</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.category}: {currency} {item.amount}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});
