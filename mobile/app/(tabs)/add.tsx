import SafeScreen from '@/components/SafeScreen';
import TabChoices from '@/components/TabChoices';
import TransactionForm from '@/components/TransactionForm/TransactionForm';
import TransferForm from '@/components/Transfer/TransferForm';
import { TransactionInput } from '@/validations/transactionSchema';
import React, { useState } from 'react';
import { View } from 'react-native';

type AddType = 'expense' | 'income' | 'transfer';

const add = ({ initial }: { initial?: TransactionInput }) => {
  const [type, setType] = useState<AddType>('expense');

  const handleTabChange = (key: string) => {
    if (key === 'expense' || key === 'income' || key === 'transfer') {
      setType(key);
    }
  };

  const onSubmitTransfer = async (data: TransactionInput) => {
    console.log('Transfer data:', data);
    // Handle transfer submission logic here
  };

  return (
    <SafeScreen>
      <View className='p-4 my-2 max-h-[90%] bg-white rounded-lg shadow-md'>
        <TabChoices value={type} onChange={handleTabChange} />
        {(type === 'expense' || type === 'income') && (
          <TransactionForm type={type} />
        )}
        {type === 'transfer' && (
          <TransferForm onSubmitTransfer={onSubmitTransfer} />
        )}
      </View>
    </SafeScreen>
  );
};

export default add;
