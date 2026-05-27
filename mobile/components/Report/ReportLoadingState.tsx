import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import SafeScreen from '@/components/SafeScreen';

export const ReportLoadingState = () => {
  return (
    <SafeScreen>
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size='large' color='#588157' />
        <Text className='text-text-secondary text-sm mt-3 font-semibold'>
          Assembling your dashboard...
        </Text>
      </View>
    </SafeScreen>
  );
};

export default ReportLoadingState;
