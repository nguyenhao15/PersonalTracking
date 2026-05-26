import { useCreateDebt } from '@/hooks/useDebt';
import { LoanInput, loanSchema } from '@/validations/loanSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AmountInputComponent from '../UI/AmountInputComponent';
import DatePickerComponent from '../UI/DatePickerComponent';
import InputWithModalComponent from '../UI/InputWithModalComponent';
import WalletSelectComponent from '../UI/WalletSelectComponent';
import { handleShowToast } from '../ToastComponent';

const LoanForm = () => {
  const { mutateAsync, isPending } = useCreateDebt();
  const [walletCurrencyId, setWalletCurrencyId] = useState<string>('');

  const methods = useForm<any, any, LoanInput>({
    mode: 'onBlur',
    resolver: zodResolver(loanSchema),
    defaultValues: {
      amount: 0,
      walletId: 0,
      type: 'borrow',
      date: new Date(),
      description: '',
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = methods;

  const currentType = watch('type');
  const currentDate = watch('date');
  const currentDescription = watch('description');

  const onSubmit = async (data: LoanInput) => {
    try {
      // Gửi api tạo mới debt
      // Status mặc định là 'pending' cho debt mới
      await mutateAsync({
        ...data,
        status: 'pending',
        transactionDate: data.date, // Đảm bảo trùng tên trường ở backend
      });
      handleShowToast('Create Debt / Loan Success', 'success');
      reset({
        amount: 0,
        walletId: 0,
        type: 'borrow',
        date: new Date(),
        description: '',
      });
    } catch (error: any) {
      console.log('Error creating debt', error);
      handleShowToast(error?.message || 'An error occurred', 'error');
    }
  };

  return (
    <ScrollView className='p-4' contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Selector cho Borrow vs Lend */}
      <View className='flex-row bg-background-light/30 border border-white/5 rounded-full p-1.5 mb-6'>
        <TouchableOpacity
          className={`flex-1 py-3 rounded-full items-center justify-center ${
            currentType === 'borrow' ? 'bg-primary' : ''
          }`}
          onPress={() => setValue('type', 'borrow', { shouldValidate: true })}
          activeOpacity={0.8}
        >
          <Text
            className={`text-xs font-bold tracking-wider ${
              currentType === 'borrow' ? 'text-white' : 'text-text-secondary'
            }`}
          >
            I BORROWED (VAY)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-3 rounded-full items-center justify-center ${
            currentType === 'lend' ? 'bg-primary' : ''
          }`}
          onPress={() => setValue('type', 'lend', { shouldValidate: true })}
          activeOpacity={0.8}
        >
          <Text
            className={`text-xs font-bold tracking-wider ${
              currentType === 'lend' ? 'text-white' : 'text-text-secondary'
            }`}
          >
            I LENT (CHO VAY)
          </Text>
        </TouchableOpacity>
      </View>

      <Controller
        control={control}
        name='amount'
        render={({ field: { onChange, onBlur, value } }) => (
          <AmountInputComponent
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            errorMessage={errors?.amount?.message as string}
            isDisabled={isPending}
            isLoading={isPending}
          />
        )}
      />

      <View className='gap-4 mb-6'>
        <Controller
          control={control}
          name='walletId'
          render={({ field: { onChange, onBlur, value } }) => (
            <WalletSelectComponent
              initialWallet={value}
              throwCurrencyId={setWalletCurrencyId}
              onSelectWallet={onChange}
              onBlur={onBlur}
              resetAction={reset}
              errorMessage={errors.walletId?.message as string}
              disabled={isPending}
            />
          )}
        />

        <DatePickerComponent
          label='Transaction Date'
          iconName='calendar'
          iconColor='#588157'
          placeholder='Select date...'
          onChangeAction={(date) =>
            setValue('date', date, { shouldValidate: true })
          }
          initialValue={currentDate}
          disabled={isPending}
        />

        <Controller
          control={control}
          name='description'
          render={({ field: { onChange, value } }) => (
            <InputWithModalComponent
              label='Description'
              iconName='pencil'
              iconColor='#588157'
              placeholder='Enter debt description...'
              errorMessage={errors.description?.message as string}
              initialValue={value}
              onChangeAction={onChange}
              onResetAction={reset}
              disabled={isPending}
            />
          )}
        />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
          className='w-full py-4 rounded-full items-center justify-center mt-6 bg-primary active:opacity-90'
          activeOpacity={0.8}
        >
          <Text className='text-white font-bold text-sm tracking-widest'>
            {isPending ? 'CREATING...' : 'CREATE DEBT & LOAN'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoanForm;
