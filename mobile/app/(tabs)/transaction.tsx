import SafeScreen from '@/components/SafeScreen';
import React from 'react';
import { Text } from 'react-native';

const transaction = () => {
  return (
    <SafeScreen>
      <Text className='text-white font-bold'>transaction</Text>
    </SafeScreen>
  );
};

export default transaction;
