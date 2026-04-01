import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

type LoadingPageProps = {
  message?: string;
};

const LoadingPage = ({ message = 'Loading...' }: LoadingPageProps) => {
  return (
    <View className='flex-1 items-center justify-center bg-white px-6'>
      <ActivityIndicator size='large' color='bg-primary' />
      <Text className='mt-4 text-center text-base font-medium text-gray-700'>   
        {message}
      </Text>
    </View>
  );
};

export default LoadingPage;
