import { useAuthStore } from '@/stores/AuthStores';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabsLayout = () => {
  const { accessToken, isHydrated } = useAuthStore();
  const insets = useSafeAreaInsets();

  if (!isHydrated) {
    return (
      <View className='flex-1 items-center justify-center bg-white'>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  if (!accessToken) {
    return <Redirect href='/(auth)' />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          height: 32 + insets.bottom,
          paddingTop: 4,
          marginHorizontal: 100,
          marginBottom: insets.bottom,
          borderRadius: 24,
          overflow: 'hidden',
        },
        tabBarBackground: () => (
          <BlurView
            tint='dark'
            intensity={80}
            style={StyleSheet.absoluteFill}
            className='absolute inset-0'
          />
        ),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='report'
        options={{
          title: 'Report',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='bar-chart' color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
