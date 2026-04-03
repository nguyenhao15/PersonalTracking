import SafeScreen from '@/components/SafeScreen';
import FormInput from '@/components/UI/FormInput';
import {
  TransactionInput,
  transactionSchema,
} from '@/validations/transactionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';

import { View } from 'react-native';

const add = ({ initial }: { initial?: TransactionInput }) => {
  const methods = useForm<TransactionInput>({
    mode: 'onBlur',
    resolver: zodResolver(transactionSchema),
    defaultValues: initial,
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <SafeScreen>
      <View className='p-4'>
        <FormProvider {...methods}>
          <FormInput
            name='amount'
            control={control}
            label='Amount'
            placeholder='Enter amount'
            keyboardType='numeric'
          />
        </FormProvider>
      </View>
    </SafeScreen>
  );
};

export default add;
