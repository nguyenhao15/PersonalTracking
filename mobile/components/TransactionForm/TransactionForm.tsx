import { useCreateTransaction } from '@/hooks/useTransaction';
import {
  TransactionInput,
  transactionSchema,
} from '@/validations/transactionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import AmountInputComponent from '../UI/AmountInputComponent';
import CategorySelectComponent from '../UI/CategorySelectComponent';
import DatePickerComponent from '../UI/DatePickerComponent';
import InputWithModalComponent from '../UI/InputWithModalComponent';
import LabelContainer from '../UI/LabelContainer';
import SwitchControl from '../UI/SwitchControl';
import TagSelectComponent from '../UI/TagSelectComponent';
import WalletSelectComponent from '../UI/WalletSelectComponent';

const tagEnum = [
  { value: 'nice-to-have', label: 'Nice to have' },
  { value: 'must-have', label: 'Must have' },
  { value: 'not-necessary', label: 'Not necessary' },
];

const TransactionForm = ({ type }: { type: 'expense' | 'income' }) => {
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

  console.log('Errors: ', errors);

  return (
    <ScrollView className='p-4 gap-4'>
      <View className='gap-4 mb-2'>
        <AmountInputComponent
          control={control}
          currency='VND'
          name='amount'
          errorMessage={errors.amount?.message}
        />

        <Controller
          control={control}
          name='date'
          render={({ field: { onChange, onBlur, value } }) => (
            <DatePickerComponent
              label='Date'
              iconName='calendar'
              iconColor='white'
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
              errorMessage={errors.walletId?.message}
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
              errorMessage={errors.categoryId?.message}
            />
          )}
        />
        <InputWithModalComponent
          label='Description'
          iconName='pencil'
          iconColor='white'
          placeholder='Enter description...'
          onChangeAction={(text) => setValue('description', text)}
          initialValue={watch('description') || ''}
          onResetAction={reset}
        />
        {type === 'expense' && (
          <Controller
            control={control}
            name='tag'
            render={({ field: { onChange, value, ...field } }) => (
              <TagSelectComponent
                data={tagEnum}
                onChangeTag={onChange}
                initialTag={value}
                onResetAction={reset}
                {...field}
                errorMessage={errors.tag?.message}
              />
            )}
          />
        )}
        <Controller
          name='excludedFromReports'
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <LabelContainer
              isHasIcon={false}
              iconColor='white'
              direction='column'
              label='Excluded Report'
              isRequired={true}
              errorMessage={errors.excludedFromReports?.message}
            >
              <SwitchControl
                isLabelVisible={false}
                label={value ? 'Yes' : 'No'}
                onChangeAction={onChange}
                defaultValue={value}
                {...field}
              />
            </LabelContainer>
          )}
        />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className={`w-full py-3 rounded-md items-center justify-center mt-4 ${type === 'expense' ? 'bg-status-negative' : 'bg-status-positive'}`}
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
