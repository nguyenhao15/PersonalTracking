import React from 'react';
import { View, Text } from 'react-native';
import { formatPrice, formatDate, toArray } from '@/utils/formatValue';

interface LoanTransactionLogsProps {
  transactions: any[];
  isBorrow: boolean;
}

export const LoanTransactionLogs = ({
  transactions,
  isBorrow,
}: LoanTransactionLogsProps) => {
  const txList = toArray<any>(transactions);

  if (txList.length === 0) {
    return (
      <View className='py-3 px-1.5 items-center justify-center'>
        <Text className='text-text-secondary text-xs italic'>
          No payments logged yet.
        </Text>
      </View>
    );
  }

  return (
    <View className='bg-background-light/50 rounded-xl p-3 border border-white/5 gap-2.5'>
      <Text className='text-text-primary text-xs font-bold uppercase tracking-wider mb-1'>
        Payment History
      </Text>
      {txList.map((tx, idx) => (
        <View
          key={tx.id || `tx-${idx}`}
          className={`flex-row justify-between items-start ${
            idx > 0 ? 'border-t border-background-light/40 pt-2.5' : ''
          }`}
        >
          <View className='flex-1 pr-3'>
            <Text className='text-text-primary text-sm font-semibold mb-0.5'>
              {tx.description || 'Repayment Log'}
            </Text>
            <Text className='text-text-secondary text-[10px] font-medium'>
              {formatDate(tx.transactionDate || '')}
            </Text>
          </View>
          <Text
            className={`text-sm font-bold mt-0.5 ${
              isBorrow ? 'text-[#a73b21]' : 'text-primary'
            }`}
          >
            {isBorrow ? '-' : '+'}
            {formatPrice(tx.amount)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default LoanTransactionLogs;
