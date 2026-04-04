import SafeScreen from '@/components/SafeScreen';
import {
  TransactionInput,
  transactionSchema,
} from '@/validations/transactionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import CardInputComponent from '@/components/UI/CardInputComponent';
import FormCardPicker from '@/components/UI/FormCardPicker';
import { View } from 'react-native';
import ModalScreen from '@/app-example/app/modal';
import BaseModal from '@/components/BaseModal';
import CategorySelect from '@/components/Category/CategorySelect';

const add = ({ initial }: { initial?: TransactionInput }) => {
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const router = useRouter();
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
      <View className='p-4 bg-white rounded-lg shadow-md'>
        <FormProvider {...methods}>
          <CardInputComponent
            label='Number'
            inputType='number'
            control={control}
            name='amount'
            placeholder='Enter amount'
            errorMessage={errors.amount?.message}
          />
          <CardInputComponent
            label='Date'
            inputType='date'
            control={control}
            name='date'
            minimumDate={new Date('2000-01-01')}
            maximumDate={new Date()}
            errorMessage={errors.date?.message}
          />
          <CardInputComponent
            label='Description'
            inputType='text'
            control={control}
            name='description'
            placeholder='Enter description'
            errorMessage={errors.description?.message}
          />
          <FormCardPicker
            control={control}
            name='card'
            label='Card'
            placeholder='Select a card'
            onPress={() => setCardModalOpen(true)}
          />
        </FormProvider>
      </View>
      <BaseModal
        visible={isCardModalOpen}
        onClose={() => setCardModalOpen(false)}
        title='Choose card'
      >
        <CategorySelect onSelect={() => {}} />
      </BaseModal>
    </SafeScreen>
  );
};

export default add;
