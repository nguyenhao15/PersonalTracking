import { useCreateTransaction } from '@/hooks/useTransaction';
import {
  TransactionInput,
  transactionSchema,
} from '@/validations/transactionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import InputWithModalComponent from '../InputWithModalComponent';
import TagSelectComponent from '../TagSelectComponent';
import AmountInputComponent from '../UI/AmountInputComponent';
import CategorySelectComponent from '../UI/CategorySelectComponent';
import DatePickerComponent from '../UI/DatePickerComponent';
import LabelContainer from '../UI/LabelContainer';
import SwitchControl from '../UI/SwitchControl';
import WalletSelectComponent from '../WalletSelectComponent';

const TransactionForm = ({ type }: { type: 'expense' | 'income' }) => {
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const [labelObject, setLabelObject] = useState<{ [key: string]: string }>({});
  const [modalTitle, setModalTitle] = useState('');

  const {
    mutateAsync,
    isPending,
    error: errorFromApi,
  } = useCreateTransaction();
  const methods = useForm<TransactionInput>({
    mode: 'onBlur',
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
      date: new Date(),
      description: '',
      categoryId: 0,
      walletId: 0,
      excludedFromReports: false,
      tag: 'nice-to-have',
    },
  });

  const {
    control,
    reset,
    watch,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = methods;

  const [excludedFromReports, date, description] = watch([
    'excludedFromReports',
    'date',
    'description',
  ]);

  const handleOpenCardModal = (title: string) => {
    setModalTitle(title);
    setCardModalOpen(true);
  };

  const onSubmit: React.Dispatch<
    React.SetStateAction<TransactionInput>
  > = async (data) => {
    const finalData = {
      ...(data as TransactionInput),
      transactionType: type,
    };

    try {
      await mutateAsync(finalData);
      reset();
    } catch (error) {
      console.log(
        errorFromApi?.response?.data?.message ||
          errorFromApi?.message ||
          'An error occurred',
      );
    }
  };

  return (
    <ScrollView className='p-4 gap-4'>
      <View className='gap-4 mb-2'>
        <Controller
          control={control}
          name='amount'
          render={({ field: { onChange, onBlur, value } }) => (
            <AmountInputComponent
              value={value ? String(value) : ''}
              onChange={onChange}
              onBlur={onBlur}
              errorMessage={errors.amount?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='date'
          render={({ field: { onChange, onBlur, value } }) => (
            <DatePickerComponent
              label='Date'
              iconName='calendar'
              iconColor='black'
              placeholder='Select a date...'
              onChangeAction={onChange}
              initialValue={value}
            />
          )}
        />

        <Controller
          control={control}
          name='walletId'
          render={({ field: { onChange, onBlur, value } }) => (
            <WalletSelectComponent
              initialWallet={value}
              onSelectWallet={onChange}
              resetAction={reset}
            />
          )}
        />

        <Controller
          control={control}
          name='categoryId'
          render={({ field: { onChange, onBlur, value } }) => (
            <CategorySelectComponent
              transactionType={type}
              initialCategory={value}
              resetActions={reset}
              onSelectCategory={onChange}

            />
          )}
        />
        <InputWithModalComponent
          label='Description'
          iconName='pencil'
          iconColor='gray'
          placeholder='Enter description...'
          onChangeAction={(text) => setValue('description', text)}
          initialValue={watch('description') || ''}
          onResetAction={reset}
        />
        {type === 'expense' && (
          <Controller
            control={control}
            name='tag'
            render={({ field: { onChange, onBlur, value } }) => (
              <TagSelectComponent
                onChangeTag={onChange}
                initialTag={value}
                onResetAction={reset}
              />
            )}
          />
        )}
        <LabelContainer
          isHasIcon={false}
          iconColor='black'
          direction='column'
          label='Excluded Report'
          isRequired={true}
          errorMessage={errors.excludedFromReports?.message}
        >
          <SwitchControl
            isLabelVisible={false}
            label={excludedFromReports ? 'Yes' : 'No'}
            onChangeAction={(value) => setValue('excludedFromReports', value)}
            defaultValue={excludedFromReports}
          />
        </LabelContainer>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={
            type === 'expense'
              ? { backgroundColor: '#ef4444' }
              : { backgroundColor: '#10b981' }
          }
          className='w-full py-3 rounded-md items-center justify-center mt-4'
        >
          <Text className='text-white font-bold'>
            Create {type === 'expense' ? 'Expense' : 'Income'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TransactionForm;
