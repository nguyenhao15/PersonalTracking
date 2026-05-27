import React from 'react';
import { Text, View } from 'react-native';

export const ReportHeader = () => {
  return (
    <View className='px-4 pb-2 pt-6 mb-2'>
      <Text className='text-text-primary text-3xl font-bold tracking-tight'>
        Dashboard Reports
      </Text>
      <Text className='text-text-secondary text-sm mt-1'>
        Interactive charts of habits and daily flow balance
      </Text>
    </View>
  );
};

export default ReportHeader;
