import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ReportHeaderProps {
  selectedRange?: 'week' | 'month';
  onRangeChange?: (range: 'week' | 'month') => void;
}

export const ReportHeader = ({
  selectedRange = 'month',
  onRangeChange,
}: ReportHeaderProps) => {
  const [range, setRange] = useState<'week' | 'month'>(selectedRange);

  const handleSelect = (value: 'week' | 'month') => {
    setRange(value);
    onRangeChange?.(value);
  };

  return (
    <View className='px-4 pb-3 pt-6'>
      {/* Title */}
      <View className='flex-row items-center justify-between mb-1'>
        <Text
          style={{ fontFamily: 'Manrope', letterSpacing: -0.5 }}
          className='text-[#2d342c] text-2xl font-extrabold'
        >
          Monthly Report
        </Text>
        <View className='w-9 h-9 rounded-full bg-[#f1f5ec] items-center justify-center'>
          <Ionicons name='options-outline' size={18} color='#5a6157' />
        </View>
      </View>
      <Text className='text-[#5a6157] text-[13px] mb-4'>
        Financial Report & Analytics
      </Text>

      {/* Date Range Selector */}
      <View className='flex-row bg-[#eaf0e5] rounded-2xl p-1'>
        <TouchableOpacity
          onPress={() => handleSelect('week')}
          className={`flex-1 items-center justify-center py-2.5 rounded-xl ${
            range === 'week' ? 'bg-white' : ''
          }`}
          style={
            range === 'week'
              ? {
                  shadowColor: '#2d342c',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.06,
                  shadowRadius: 8,
                  elevation: 2,
                }
              : undefined
          }
          activeOpacity={0.7}
        >
          <Text
            className={`text-[13px] font-bold ${
              range === 'week' ? 'text-[#2d342c]' : 'text-[#5a6157]'
            }`}
          >
            This Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSelect('month')}
          className={`flex-1 items-center justify-center py-2.5 rounded-xl ${
            range === 'month' ? 'bg-white' : ''
          }`}
          style={
            range === 'month'
              ? {
                  shadowColor: '#2d342c',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.06,
                  shadowRadius: 8,
                  elevation: 2,
                }
              : undefined
          }
          activeOpacity={0.7}
        >
          <Text
            className={`text-[13px] font-bold ${
              range === 'month' ? 'text-[#2d342c]' : 'text-[#5a6157]'
            }`}
          >
            This Month
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReportHeader;
