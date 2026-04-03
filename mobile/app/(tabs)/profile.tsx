import SafeScreen from '@/components/SafeScreen';
import React from 'react';
import { Text } from 'react-native';

const profile = () => {
  return (
    <SafeScreen>
      <Text className='text-white font-bold'>profile</Text>
    </SafeScreen>
  );
};

export default profile;
