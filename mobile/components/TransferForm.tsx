import { transferSchema } from '@/validations/transferSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

const TransferForm = () => {
  const methods = useForm({
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
    watch,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = methods;

  return (
    <View className=' m-2 bg-white'>
      <FormProvider {...methods}>
        <Text>Transfer Form</Text>
      </FormProvider>
    </View>
  );
};

export default TransferForm;
