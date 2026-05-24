import { useCreateTransaction } from '@/hooks/useTransaction';
import {
  TransactionInput,
  TransactionOutput,
  transactionSchema,
} from '@/validations/transactionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FormElements from './FormElements';
import { handleShowToast } from '../ToastComponent';
import BaseModal from '../BaseModal';
import LoadingPage from '../LoadingPage';

const TransactionForm = ({ type }: { type: 'expense' | 'income' }) => {
  const {
    mutateAsync,
    isPending,
    error: errorFromApi,
  } = useCreateTransaction();
  const methods = useForm({
    resolver: zodResolver(transactionSchema),
    mode: 'onBlur',
    defaultValues: {
      baseAmount: 0,
      baseCurrency: 'VND',
      originalAmount: 0,
      originalCurrency: 'VND',
      exchangeRate: 1,
      date: new Date(),
      description: '',
      categoryId: 0,
      walletId: 0,
      excludedFromReports: false,
      tag: 'nice-to-have',
    },
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = async (data: TransactionOutput) => {
    const finalData = {
      ...(data as TransactionInput),
      transactionType: type,
    };

    try {
      await mutateAsync(finalData);
      handleShowToast('Create Transaction Success', 'success');

      reset();
    } catch (error) {
      console.log(errorFromApi?.message || 'An error occurred');
    }
  };

  return (
    <ScrollView className='p-4' contentContainerStyle={{ paddingBottom: 100 }}>
      <View className='gap-4 mb-2'>
        <FormProvider {...methods}>
          <FormElements isLoading={isPending} type={type} />

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className={`w-full py-4 rounded-full items-center justify-center mt-6 active:opacity-90 ${
              type === 'expense' ? 'bg-[#a73b21]' : 'bg-primary'
            }`}
            activeOpacity={0.8}
          >
            <Text className='text-white font-bold text-sm tracking-widest'>
              CREATE {type === 'expense' ? 'EXPENSE' : 'INCOME'}
            </Text>
          </TouchableOpacity>
        </FormProvider>
      </View>
      <BaseModal visible={isPending} onClose={() => {}}>
        <LoadingPage />
      </BaseModal>
    </ScrollView>
  );
};

export default TransactionForm;
