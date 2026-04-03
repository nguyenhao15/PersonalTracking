import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import SafeScreen from './SafeScreen';

type LoadingPageProps = {
  message?: string;
};

const LoadingPage = ({ message = 'Loading...' }: LoadingPageProps) => {
  return (
    <SafeScreen>
      <ActivityIndicator size='large' color='bg-primary' />
      <Text className='mt-4 text-center text-base font-medium text-gray-700'>
        {message}
      </Text>
    </SafeScreen>
  );
};

export default LoadingPage;
