import SafeScreen from '@/components/SafeScreen';
import TabChoices from '@/components/TabChoices';
import TransactionForm from '@/components/TransactionForm/TransactionForm';
import TransferForm from '@/components/TransferForm';
import { TransactionInput } from '@/validations/transactionSchema';
import React, { useState } from 'react';
import { View } from 'react-native';

const add = ({ initial }: { initial?: TransactionInput }) => {
  const [type, setType] = useState('expense');

  const handleTabChange = (key: string) => {
    setType(key);
  };

  return (
    <SafeScreen>
      <View className='p-4 my-2 max-h-[90%] bg-white rounded-lg shadow-md'>
        <TabChoices value={type} onChange={handleTabChange} />
        {(type === 'expense' || type === 'income') && (
          <TransactionForm type={type} />
        )}
        {type === 'transfer' && <TransferForm />}
      </View>
    </SafeScreen>
  );
};

export default add;
