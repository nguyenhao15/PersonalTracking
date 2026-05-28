import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import SafeScreen from '@/components/SafeScreen';

export const ReportLoadingState = () => {
  return (
    <SafeScreen>
      <View className='flex-1 justify-center items-center'>
        <View className='bg-white rounded-3xl p-8 items-center' style={{
          shadowColor: '#2d342c',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.06,
          shadowRadius: 16,
          elevation: 3,
        }}>
          <ActivityIndicator size='large' color='#406841' />
          <Text className='text-[#2d342c] text-sm mt-4 font-bold'>
            Loading reports…
          </Text>
          <Text className='text-[#5a6157] text-xs mt-1'>
            Gathering your financial data
          </Text>
        </View>
      </View>
    </SafeScreen>
  );
};

export default ReportLoadingState;
