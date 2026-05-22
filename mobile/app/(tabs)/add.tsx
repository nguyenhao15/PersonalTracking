import SafeScreen from '@/components/SafeScreen';
import TabChoices from '@/components/TabChoices';
import TransactionForm from '@/components/TransactionForm/TransactionForm';
import TransferForm from '@/components/Transfer/TransferForm';
import { TransactionInput } from '@/validations/transactionSchema';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

type AddType = 'expense' | 'income' | 'transfer' | 'loan';

const add = ({ initial }: { initial?: TransactionInput }) => {
  const [type, setType] = useState<AddType>('expense');

  const handleTabChange = (key: string) => {
    if (
      key === 'expense' ||
      key === 'income' ||
      key === 'transfer' ||
      key === 'loan'
    ) {
      setType(key);
    }
  };

  const onSubmitTransfer = async (data: any) => {
    console.log(data);
  };

  return (
    <SafeScreen>
      <View className='px-4 pb-2 pt-6 mb-2'>
        <Text className='text-text-primary text-3xl font-bold tracking-tight'>
          New Entry
        </Text>
        <Text className='text-text-secondary text-sm mt-1'>
          Log details to your personal archive
        </Text>
      </View>

      <View className='flex-1 px-2'>
        <TabChoices value={type} onChange={handleTabChange} />
        <View className='flex-1 mt-2'>
          {(type === 'expense' || type === 'income') && (
            <TransactionForm key={type} type={type} />
          )}
          {type === 'transfer' && (
            <TransferForm key={type} onSubmitTransfer={onSubmitTransfer} />
          )}
          {type === 'loan' && (
            <View className='p-6 bg-background-light rounded-2xl items-center justify-center mt-4 border border-white/5'>
              <Text className='text-[#588157] text-lg font-bold mb-2 tracking-wide'>
                DEBT & LOAN TRACKING
              </Text>
              <Text className='text-text-secondary text-xs text-center leading-relaxed px-4'>
                The Debt & Loan tracking module is currently under active development. You can log them as Expenses or Incomes to keep your balance updated for now!
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeScreen>
  );
};

export default add;
