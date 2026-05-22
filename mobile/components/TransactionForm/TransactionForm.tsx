import { useCreateTransaction } from '@/hooks/useTransaction';
import {
  TransactionInput,
  TransactionInputInform,
  TransactionOutput,
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
  const methods = useForm<TransactionInputInform, any, TransactionOutput>({
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

  const {
    control,
    reset,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const handleOnChangeCurrency = (currencyId: string) => {
    setValue('baseCurrency', currencyId.toLowerCase());
  };

  const onSubmit = async (data: TransactionOutput) => {
    const finalData = {
      ...(data as TransactionInput),
      transactionType: type,
    };

    try {
      await mutateAsync(finalData);
      reset();
    } catch (error) {
      console.log(errorFromApi?.message || 'An error occurred');
    }
  };

  return (
    <ScrollView className='p-4' contentContainerStyle={{ paddingBottom: 100 }}>
      <View className='gap-4 mb-2'>
        <AmountInputComponent
          control={control}
          setValueFromParent={(value: any) => setValue('baseAmount', value)}
          exchangeRateFieldName='exchangeRate'
          originalCurrencyFieldName='originalCurrency'
          originalAmountFieldName='originalAmount'
          errorMessage={
            errors.originalAmount?.message || errors.baseAmount?.message
          }
          value={watch('originalAmount')}
          baseAmountFieldName={'baseAmount'}
        />

        <Controller
          control={control}
          name='date'
          render={({ field: { onChange, onBlur, value } }) => (
            <DatePickerComponent
              label='Date'
              iconName='calendar'
              iconColor='#588157'
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
              throwCurrencyId={handleOnChangeCurrency}
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
          name='description'
          control={control}
          iconName='pencil'
          iconColor='#588157'
          placeholder='Enter description...'
          onChangeAction={(text) => {
            setValue('description', text);
          }}
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
              isHasIcon={true}
              iconName='eye-off'
              iconColor='#588157'
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
          className={`w-full py-4 rounded-full items-center justify-center mt-6 active:opacity-90 ${
            type === 'expense' ? 'bg-[#a73b21]' : 'bg-primary'
          }`}
          activeOpacity={0.8}
        >
          <Text className='text-white font-bold text-sm tracking-widest'>
            CREATE {type === 'expense' ? 'EXPENSE' : 'INCOME'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TransactionForm;
