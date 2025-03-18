import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import BudgetScreen from './screens/BudgetScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} /> }} 
      />
      <Tab.Screen 
        name="Transactions" 
        component={TransactionsScreen} 
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" color={color} size={size} /> }} 
      />
      <Tab.Screen 
        name="Budget" 
        component={BudgetScreen} 
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="wallet-outline" color={color} size={size} /> }} 
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" color={color} size={size} /> }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={Tabs} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
