import { TransferInput, transferSchema } from '@/validations/transferSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import z from 'zod';
import InputWithModalComponent from './InputWithModalComponent';
import AmountInputComponent from './UI/AmountInputComponent';
import DatePickerComponent from './UI/DatePickerComponent';
import InputInlineComponent from './UI/InputInlineComponent';
import WalletSelectComponent from './WalletSelectComponent';

type TransferFormProps = {
  onSubmitTransfer?: (data: TransferInput) => Promise<void> | void;
};

type TransferFormInput = z.input<typeof transferSchema>;
type TransferFormOutput = z.output<typeof transferSchema>;

const TransferForm = ({ onSubmitTransfer }: TransferFormProps) => {
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
    clearErrors,
    control,
    reset,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors },
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
    <ScrollView className='p-4 gap-4'>
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

      <View className='gap-4 mb-6'>
        <Controller
          control={control}
          name='fromWalletId'
          render={({ field: { onChange, onBlur, value } }) => (
            <WalletSelectComponent
              initialWallet={value}
              onSelectWallet={onChange}
              resetAction={reset}
              errorMessage={errors.fromWalletId?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='toWalletId'
          render={({ field: { onChange, onBlur, value } }) => (
            <WalletSelectComponent
              initialWallet={value}
              onSelectWallet={onChange}
              resetAction={reset}
              errorMessage={errors.toWalletId?.message}
            />
          )}
        />

        <DatePickerComponent
          label='Transfer Date'
          iconName='calendar'
          iconColor='black'
          placeholder='Select transfer date...'
          onChangeAction={(date) =>
            setValue('date', date, { shouldValidate: true })
          }
          initialValue={watch('date')}
        />

        <Controller
          control={control}
          name='fee'
          render={({ field: { onChange, onBlur, value } }) => (
            <InputInlineComponent
              label='Transfer Fee'
              iconName='cash'
              iconColor='gray'
              placeholder='0'
              value={value ? String(value) : ''}
              onChange={onChange}
              onBlur={onBlur}
              errorMessage={errors.fee?.message}
            />
          )}
        />

        <InputWithModalComponent
          label='Description'
          iconName='pencil'
          iconColor='gray'
          placeholder='Add transfer note...'
          onChangeAction={(text) =>
            setValue('description', text, { shouldValidate: true })
          }
          initialValue={watch('description') || ''}
        />

        <TouchableOpacity
          onPress={handleSubmit(submitTransfer)}
          className='w-full py-3 rounded-md items-center justify-center mt-2 bg-blue-500'
        >
          <Text className='text-white font-bold'>Create Transfer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TransferForm;
