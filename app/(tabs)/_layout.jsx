import { Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: true,  // Ensure that labels are visible
          tabBarActiveTintColor: '#FFFFFF', // Color when tab is active (black)
          tabBarInactiveTintColor: '#00000', // Color when tab is inactive (yellow)
          tabBarStyle: {
            height: 60,  // Adjust height to give enough space
            backgroundColor: '#ADD8E6', // Set background color of the tab bar
            borderTopWidth: 1,
            borderTopColor: '#FFFFFF', // Border color to separate from content
          },
        }}
      >
        <Tabs.Screen
          name="ReportScreen"
          options={{
            title: "Report",  // Set the title directly
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontSize: 14, fontWeight: '600', color: focused ? '#FFFFFF' : '#00000' }}>
                Report
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="CaseStatusScreen"
          options={{
            title: "Cases Status",
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontSize: 14, fontWeight: '600', color: focused ? '#FFFFFF' : '#00000' }}>
                Cases Status
              </Text>
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;