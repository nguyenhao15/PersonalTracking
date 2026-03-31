import React from 'react';
import { Text, View } from 'react-native';
import SafeScreen from './SafeScreen';

const ErrorPage = ({ error }: { error?: { message: string } }) => {
  return (
    <SafeScreen>
      <View className='p-5 items-center justify-center'>
        <Text className='text-2xl font-bold mb-4 text-white'>ErrorPage</Text>
        {error && <Text className='text-red-500'>{error.message}</Text>}
        {!error && (
          <Text className='text-gray-500'>An unknown error occurred.</Text>
        )}
      </View>
    </SafeScreen>
  );
};

export default ErrorPage;
