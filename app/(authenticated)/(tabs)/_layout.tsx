import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const Layout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary_violet[700],
    }}>
      <Tabs.Screen name="home" 
      options={{
        title: 'Home',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: Colors.primary_zinc[900],  },
        headerLeft: () => (
          <TouchableOpacity style={{ marginLeft: 16}}>
            <Ionicons name="person-circle-outline" size={36} color={Colors.primary_violet[700]} />
          </TouchableOpacity>),
        tabBarIcon: ({size, color}) => (
          <FontAwesome name='home' size={size} color={color} />
        )
      }}/>
      <Tabs.Screen name="invest" 
      options={{
        title: 'Invest',
        tabBarIcon: ({size, color}) => (
          <FontAwesome name='line-chart' size={size} color={color} />
        )
      }}/>
      <Tabs.Screen name="transfers" 
      options={{
        title: 'Transfers',
        tabBarIcon: ({size, color}) => (
          <FontAwesome name='exchange' size={size} color={color} />
        )
      }}/>
      <Tabs.Screen name="crypto" 
      options={{
        title: 'Crypto',
        tabBarIcon: ({size, color}) => (
          <FontAwesome name='bitcoin' size={size} color={color} />
        )
      }}/>
      <Tabs.Screen name="lifestyle" 
      options={{
        title: 'Lifestyle',
        tabBarIcon: ({size, color}) => (
          <FontAwesome name='th' size={size} color={color} />
        )
      }}/>
    </Tabs>
  )
}

export default Layout