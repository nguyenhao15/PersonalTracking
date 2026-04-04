import SafeScreen from '@/components/SafeScreen';
import {
  TransactionInput,
  transactionSchema,
} from '@/validations/transactionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import BaseModal from '@/components/BaseModal';
import CategorySelect from '@/components/Category/CategorySelect';

import PressableCardComponent from '@/components/UI/PressableCardComponent';

const add = ({ initial }: { initial?: TransactionInput }) => {
  const [isCardModalOpen, setCardModalOpen] = useState(false);

  const [modalTitle, setModalTitle] = useState('');
  const router = useRouter();
  const methods = useForm<TransactionInput>({
    mode: 'onBlur',
    resolver: zodResolver(transactionSchema),
    defaultValues: initial || {
      amount: 0,
      date: new Date(),
      description: '',
      categoryId: '',
      walletId: '',
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

  const [amount, date, description, categoryId, walletId] = watch([
    'amount',
    'date',
    'description',
    'categoryId',
    'walletId',
  ]);

  const handleOnSelectCategory = (category: any) => {
    console.log('Category: ', category);

    setValue('categoryId', category.id);
    setCardModalOpen(false);
  };

  const handleOpenCardModal = (title: string) => {
    setModalTitle(title);
    setCardModalOpen(true);
  };

  return (
    <SafeScreen>
      <View className='p-4 my-2 bg-white rounded-lg shadow-md'>
        <FormProvider {...methods}>
          <View className='flex gap-4'>
            <View className='mb-10 gap-4 h-32 items-center justify-between'>
              <TouchableOpacity
                onPress={() => handleOpenCardModal('Choose currency')}
                className='self-start items-center justify-center mx-auto mb-1 px-3 py-2 bg-gray-200 rounded-md'
              >
                <Text className='font-bold'>USD</Text>
              </TouchableOpacity>
              <Controller
                control={control}
                name='amount'
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{
                      width: '100%',
                      fontSize: 30,
                      textAlign: 'center',
                      padding: 20,
                      borderBottomWidth: 1,
                      borderColor: '#ccc',
                      marginBottom: 10,
                    }}
                    keyboardType='numeric'
                    placeholder='0'
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>

            <PressableCardComponent
              title='Date'
              value={date ? new Date(date).toLocaleDateString() : undefined}
              error={errors.date?.message}
              iconName='calendar'
              onPress={() => handleOpenCardModal('Choose date')}
            />

            <PressableCardComponent
              title='Wallet'
              value={walletId ? walletId : undefined}
              error={errors.walletId?.message}
              iconName='wallet'
              onPress={() => handleOpenCardModal('Choose wallet')}
            />
            <PressableCardComponent
              title='Category'
              value={categoryId ? categoryId : undefined}
              error={errors.categoryId?.message}
              iconName='pricetag'
              onPress={() => handleOpenCardModal('Choose category')}
            />
          </View>
        </FormProvider>
        <TouchableOpacity
          onPress={handleSubmit((data) => {
            console.log('Form data: ', data);
          })}
          className='w-full py-3 bg-blue-500 rounded-md items-center justify-center mt-4'
        >
          <Text className='text-white font-bold'>Save</Text>
        </TouchableOpacity>
      </View>
      <BaseModal
        visible={isCardModalOpen}
        onClose={() => setCardModalOpen(false)}
        title={modalTitle}
      >
        {modalTitle === 'Choose category' && (
          <CategorySelect
            selectedCategory={methods.getValues('categoryId')}
            onSelect={handleOnSelectCategory}
          />
        )}

        {modalTitle === 'Choose date' && (
          <View className='items-center justify-center w-full'>
            <DateTimePicker
              style={{ width: '100%' }}
              value={date || new Date()}
              mode='date'
              display='inline'
              onValueChange={(event, selectedDate) => {
                if (selectedDate) {
                  methods.setValue('date', selectedDate);
                  setCardModalOpen(false);
                }
              }}
            />
          </View>
        )}
        {/* Add more modals for wallet and currency selection as needed */}
      </BaseModal>
    </SafeScreen>
  );
};

export default add;
