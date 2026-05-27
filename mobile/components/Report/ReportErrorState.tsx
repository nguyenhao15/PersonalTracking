import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SafeScreen from '@/components/SafeScreen';

interface ReportErrorStateProps {
  message?: string;
}

export const ReportErrorState = ({ message }: ReportErrorStateProps) => {
  return (
    <SafeScreen>
      <View className='p-6 items-center justify-center my-auto flex-1'>
        <Ionicons name='alert-circle' size={48} color='#ef4444' />
        <Text className='text-text-primary text-base font-bold mt-3 mb-1'>
          Failed to assemble reports
        </Text>
        <Text className='text-text-secondary text-xs text-center leading-relaxed'>
          {message || 'An unknown network error occurred.'}
        </Text>
      </View>
    </SafeScreen>
  );
};

export default ReportErrorState;
