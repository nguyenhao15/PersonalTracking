import { TransferInput, transferSchema } from '@/validations/transferSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import z from 'zod';
import AmountInputComponent from '../UI/AmountInputComponent';
import DatePickerComponent from '../UI/DatePickerComponent';
import InputInlineComponent from '../UI/InputInlineComponent';
import InputWithModalComponent from '../UI/InputWithModalComponent';
import WalletSelectComponent from '../UI/WalletSelectComponent';

type TransferFormProps = {
  onSubmitTransfer?: (data: TransferInput) => Promise<void> | void;
};

type TransferFormInput = z.input<typeof transferSchema>;
type TransferFormOutput = z.output<typeof transferSchema>;

const TransferForm = ({ onSubmitTransfer }: TransferFormProps) => {
  const [walletCurrencyId, setWalletCurrencyId] = useState<string>('');
  const methods = useForm<TransferFormInput, any, TransferFormOutput>({
    mode: 'onBlur',
    resolver: zodResolver(transferSchema),
    defaultValues: {
      amount: 0,
      date: new Date(),
      description: '',
      fromWalletId: 0,
      toWalletId: 0,
      fee: 0,
    },
  });

  const {
    control,
    reset,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const submitTransfer = async (data: TransferFormOutput) => {
    if (data.fromWalletId === data.toWalletId) {
      setError('toWalletId', {
        type: 'manual',
        message: 'Destination wallet must be different from source wallet',
      });
      return;
    }

    if (onSubmitTransfer) {
      await onSubmitTransfer(data);
    } else {
      console.log('Transfer payload', data);
    }

    reset({
      amount: 0,
      date: new Date(),
      description: '',
      fromWalletId: 0,
      toWalletId: 0,
      fee: 0,
    });
  };

  return (
    <ScrollView className='p-4' contentContainerStyle={{ paddingBottom: 100 }}>
      <Controller
        control={control}
        name='amount'
        render={({ field: { onChange, onBlur, value } }) => (
          <AmountInputComponent
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            errorMessage={errors?.amount?.message}
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
          />
        )}
      />

      <View className='gap-4 mb-6'>
        <Controller
          control={control}
          name='fromWalletId'
          render={({ field: { onChange, onBlur, value } }) => (
            <WalletSelectComponent
              initialWallet={value}
              throwCurrencyId={setWalletCurrencyId}
              onSelectWallet={onChange}
              resetAction={reset}
              errorMessage={errors.fromWalletId?.message}
              disabled={isSubmitting}
            />
          )}
        />

        <Controller
          control={control}
          name='toWalletId'
          render={({ field: { onChange, onBlur, value } }) => (
            <WalletSelectComponent
              label='To Wallet'
              initialWallet={value}
              onSelectWallet={onChange}
              onBlur={onBlur}
              resetAction={reset}
              errorMessage={errors.toWalletId?.message}
              disabled={isSubmitting}
            />
          )}
        />

        <DatePickerComponent
          label='Transfer Date'
          iconName='calendar'
          iconColor='#588157'
          placeholder='Select transfer date...'
          onChangeAction={(date) =>
            setValue('date', date, { shouldValidate: true })
          }
          initialValue={watch('date')}
          disabled={isSubmitting}
        />

        <Controller
          control={control}
          name='fee'
          render={({ field: { onChange, onBlur, value } }) => (
            <InputInlineComponent
              label='Transfer Fee'
              keyboardType='numeric'
              iconName='cash'
              iconColor='#588157'
              placeholder='0'
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              errorMessage={errors.fee?.message}
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
            />
          )}
        />

        <InputWithModalComponent
          label='Description'
          iconName='pencil'
          iconColor='#588157'
          errorMessage={errors.description?.message}
          placeholder='Add transfer note...'
          onChangeAction={(text) =>
            setValue('description', text, { shouldValidate: true })
          }
          initialValue={watch('description') || ''}
          disabled={isSubmitting}
        />

        <TouchableOpacity
          onPress={handleSubmit(submitTransfer)}
          className='w-full py-4 rounded-full items-center justify-center mt-6 bg-primary active:opacity-90'
          activeOpacity={0.8}
        >
          <Text className='text-white font-bold text-sm tracking-widest'>
            CREATE TRANSFER
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TransferForm;
