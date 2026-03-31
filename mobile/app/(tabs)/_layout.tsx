import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useAuthStore } from '@/stores/AuthStores';

const TabsLayout = () => {
  const { accessToken, isHydrated } = useAuthStore();

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
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
