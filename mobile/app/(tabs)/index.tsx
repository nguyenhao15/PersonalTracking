import { useLogOut } from '@/hooks/useAuthentication';
import { useGetExpenses } from '@/hooks/useExpenses';

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Home = () => {
  const { data: expenses, isLoading, error } = useGetExpenses();
  const { mutate: logout } = useLogOut();
  const handleLogout = () => {
    logout();
  };

  return (
    <View>
      <Text className='text-2xl font-bold mb-4'>Home Screen</Text>
      <Text>
        {isLoading
          ? 'Loading...'
          : error
            ? `Error: ${error.message}`
            : `Expenses: ${JSON.stringify(expenses)}`}
      </Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text className='text-blue-500 mt-4'>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
