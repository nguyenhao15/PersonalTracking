import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatPrice } from '@/utils/formatValue';

interface LoanSummaryProps {
  debts: any[];
}

export const LoanSummary = ({ debts }: LoanSummaryProps) => {
  const { totalReceivable, totalPayable } = useMemo(() => {
    let rec = 0;
    let pay = 0;

    debts.forEach((debt) => {
      if (debt.status === 'cancelled') return;

      const totalPaid = (debt.transactions || []).reduce(
        (sum: number, tx: any) => sum + tx.amount,
        0,
      );
      const remaining = Math.max(0, debt.amount - totalPaid);

      if (debt.type === 'lend') {
        rec += remaining;
      } else if (debt.type === 'borrow') {
        pay += remaining;
      }
    });

    return { totalReceivable: rec, totalPayable: pay };
  }, [debts]);

  const netValue = totalReceivable - totalPayable;

  return (
    <View className='bg-surface rounded-2xl p-5 mb-5 border border-white/5 shadow-sm'>
      <Text className='text-text-secondary text-xs uppercase tracking-widest font-semibold mb-2'>
        Net Balance
      </Text>
      <Text
        className={`text-3xl font-extrabold mb-5 tracking-tight ${
          netValue >= 0 ? 'text-primary' : 'text-[#a73b21]'
        }`}
      >
        {netValue >= 0 ? '+' : ''}
        {formatPrice(netValue)}
      </Text>

      <View className='flex-row justify-between border-t border-background-light pt-4 gap-4'>
        <View className='flex-1'>
          <View className='flex-row items-center gap-1.5 mb-1'>
            <Ionicons name='arrow-down-circle' size={16} color='#588157' />
            <Text className='text-text-secondary text-xs font-medium'>
              To Receive (Phải thu)
            </Text>
          </View>
          <Text className='text-primary text-base font-bold tracking-tight'>
            {formatPrice(totalReceivable)}
          </Text>
        </View>

        <View className='w-px bg-background-light' />

        <View className='flex-1'>
          <View className='flex-row items-center gap-1.5 mb-1'>
            <Ionicons name='arrow-up-circle' size={16} color='#a73b21' />
            <Text className='text-text-secondary text-xs font-medium'>
              To Pay (Phải trả)
            </Text>
          </View>
          <Text className='text-[#a73b21] text-base font-bold tracking-tight'>
            {formatPrice(totalPayable)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoanSummary;
