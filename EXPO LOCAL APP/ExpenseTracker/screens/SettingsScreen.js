/*

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text>Dark Mode, Currency Selection (coming soon)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold' },
});


*/





import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    const loadSettings = async () => {
      const savedMode = await AsyncStorage.getItem('darkMode');
      const savedCurrency = await AsyncStorage.getItem('currency');
      if (savedMode) setDarkMode(JSON.parse(savedMode));
      if (savedCurrency) setCurrency(savedCurrency);
    };

    loadSettings();
  }, []);

  const toggleDarkMode = async () => {
    setDarkMode((prev) => !prev);
    await AsyncStorage.setItem('darkMode', JSON.stringify(!darkMode));
  };

  const changeCurrency = async (value) => {
    setCurrency(value);
    await AsyncStorage.setItem('currency', value);
  };

  const resetData = async () => {
    Alert.alert('Warning', 'Are you sure you want to reset all data?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.clear();
          Alert.alert('Data Reset', 'All saved data has been deleted.');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Dark Mode Toggle */}
      <View style={styles.row}>
        <Text>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>

      {/* Currency Selection */}
      <View style={styles.row}>
        <Text>Currency</Text>
        <Picker selectedValue={currency} onValueChange={changeCurrency} style={{ width: 150 }}>
          <Picker.Item label="USD ($)" value="USD" />
          <Picker.Item label="Euro (€)" value="EUR" />
          <Picker.Item label="INR (₹)" value="INR" />
        </Picker>
      </View>

      {/* Reset Data Button */}
      <Button title="Reset All Data" color="red" onPress={resetData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
});
