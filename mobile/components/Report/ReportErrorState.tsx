import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SafeScreen from '@/components/SafeScreen';

interface ReportErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ReportErrorState = ({ message, onRetry }: ReportErrorStateProps) => {
  return (
    <SafeScreen>
      <View className='flex-1 justify-center items-center px-8'>
        <View
          className='bg-white rounded-3xl p-8 items-center w-full'
          style={{
            shadowColor: '#2d342c',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.06,
            shadowRadius: 16,
            elevation: 3,
          }}
        >
          <View className='w-14 h-14 rounded-full bg-[#fd795a]/15 items-center justify-center mb-4'>
            <Ionicons name='alert-circle' size={32} color='#a73b21' />
          </View>
          <Text className='text-[#2d342c] text-base font-bold mb-1.5'>
            Unable to load reports
          </Text>
          <Text className='text-[#5a6157] text-xs text-center leading-5 mb-4'>
            {message || 'An unknown network error occurred. Please try again.'}
          </Text>
          {onRetry && (
            <TouchableOpacity
              onPress={onRetry}
              className='bg-[#406841] rounded-2xl px-6 py-3'
              activeOpacity={0.8}
            >
              <Text className='text-white text-xs font-bold uppercase tracking-wider'>
                Try Again
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeScreen>
  );
};

export default ReportErrorState;
