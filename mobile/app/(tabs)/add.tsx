import SafeScreen from '@/components/SafeScreen';
import React from 'react';
import { Text, TextInput, View } from 'react-native';

const add = () => {
  return (
    <SafeScreen>
      <View>
        <Text className='text-white font-bold'>add</Text>
        <TextInput
          className='mt-4 p-2 border border-gray-300 text-white rounded'
          placeholder='Enter something...'
          placeholderTextColor='#888'
        />
      </View>
    </SafeScreen>
  );
};

export default add;
