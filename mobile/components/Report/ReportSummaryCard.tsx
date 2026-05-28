import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatPrice } from '@/utils/formatValue';

interface ReportSummaryCardProps {
  netCashFlow: number;
  totalIncome: number;
  totalExpenses: number;
}

export const ReportSummaryCard = ({
  netCashFlow,
  totalIncome,
  totalExpenses,
}: ReportSummaryCardProps) => {
  const isPositive = netCashFlow >= 0;

  return (
    <View
      className='bg-white rounded-3xl p-5 mb-4 mx-4'
      style={{
        shadowColor: '#2d342c',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 16,
        elevation: 3,
      }}
    >
      {/* Net Cash Flow */}
      <View className='items-center mb-5'>
        <Text className='text-[#5a6157] text-[11px] uppercase tracking-widest font-bold mb-2'>
          Net Cash Flow
        </Text>
        <Text
          style={{ fontFamily: 'Manrope', letterSpacing: -1 }}
          className={`text-[32px] font-black ${
            isPositive ? 'text-[#406841]' : 'text-[#a73b21]'
          }`}
        >
          {isPositive ? '+' : ''}
          {formatPrice(netCashFlow)}
        </Text>
        <View
          className={`flex-row items-center mt-2 px-3 py-1 rounded-full ${
            isPositive ? 'bg-[#c1eebc]/40' : 'bg-[#fd795a]/15'
          }`}
        >
          <Ionicons
            name={isPositive ? 'trending-up' : 'trending-down'}
            size={14}
            color={isPositive ? '#406841' : '#a73b21'}
          />
          <Text
            className={`text-[11px] font-bold ml-1 ${
              isPositive ? 'text-[#406841]' : 'text-[#a73b21]'
            }`}
          >
            {isPositive ? 'Surplus' : 'Deficit'}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View className='h-px bg-[#eaf0e5] mb-4' />

      {/* Income & Expenses side by side */}
      <View className='flex-row'>
        <View className='flex-1 items-center'>
          <View className='flex-row items-center mb-1.5'>
            <View className='w-2 h-2 rounded-full bg-[#406841] mr-1.5' />
            <Text className='text-[#5a6157] text-[10px] uppercase tracking-wider font-bold'>
              Income
            </Text>
          </View>
          <Text
            style={{ fontFamily: 'Manrope' }}
            className='text-[#2d342c] text-base font-black'
          >
            {formatPrice(totalIncome)}
          </Text>
        </View>

        <View className='w-px bg-[#eaf0e5]' />

        <View className='flex-1 items-center'>
          <View className='flex-row items-center mb-1.5'>
            <View className='w-2 h-2 rounded-full bg-[#a73b21] mr-1.5' />
            <Text className='text-[#5a6157] text-[10px] uppercase tracking-wider font-bold'>
              Expenses
            </Text>
          </View>
          <Text
            style={{ fontFamily: 'Manrope' }}
            className='text-[#2d342c] text-base font-black'
          >
            {formatPrice(totalExpenses)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ReportSummaryCard;
