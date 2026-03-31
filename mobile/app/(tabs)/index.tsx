import ErrorPage from '@/components/ErrorPage';
import SafeScreen from '@/components/SafeScreen';
import { useLogOut } from '@/hooks/useAuthentication';
import { useGetExpenses } from '@/hooks/useExpenses';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Home = () => {
  const { data: expenses, isLoading, error } = useGetExpenses();
  const { mutate: logout } = useLogOut();
  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <SafeScreen>
        <Text className='text-2xl font-bold mb-4'>Home Screen</Text>
        <Text>Loading...</Text>
      </SafeScreen>
    );
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <SafeScreen>
      <ScrollView
        className='flex-1'
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className='px-6 pb-4 pt-6'>
          <View className={`flex-row items-center justify-between mb-6`}>
            <View>
              <Text className='text-text-primary text-3xl font-bold tracking-tight'>
                Expenses
              </Text>
              <Text className='text-text-secondary text-sm mt-1'>
                Your expenses overview
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleLogout}
              className='bg-surface/50 p-3 rounded-full'
              activeOpacity={0.4}
            >
              <Ionicons name='log-out-outline' size={22} color='#fff' />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default Home;
