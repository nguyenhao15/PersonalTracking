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
import CategorySelect from '@/components/CardSelectList';

import PressableCardComponent from '@/components/UI/PressableCardComponent';
import SelectModal from '@/components/SelectModal';

const add = ({ initial }: { initial?: TransactionInput }) => {
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const [labelObject, setLabelObject] = useState<{ [key: string]: string }>({});
  const [modalTitle, setModalTitle] = useState('');
  const router = useRouter();
  const methods = useForm<TransactionInput>({
    mode: 'onBlur',
    resolver: zodResolver(transactionSchema),
    defaultValues: initial || {
      amount: 0,
      date: new Date(),
      description: '',
      categoryId: undefined,
      walletId: undefined,
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

  const handleOnSelectItem = (item: any) => {
    if (modalTitle.includes('category')) {
      setValue('categoryId', item.id);
      setLabelObject((prev) => ({ ...prev, category: item.name }));
    } else if (modalTitle.includes('wallet')) {
      setValue('walletId', item.id);
      setLabelObject((prev) => ({ ...prev, wallet: item.walletName }));
    } else if (modalTitle.includes('date')) {
      setValue('date', item);
    }
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
              value={
                labelObject.wallet || (walletId ? walletId.name : undefined)
              }
              error={errors.walletId?.message}
              iconName='wallet'
              onPress={() => handleOpenCardModal('Choose wallet')}
            />
            <PressableCardComponent
              title='Category'
              value={
                labelObject.category ||
                (categoryId ? categoryId.name : undefined)
              }
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
      <SelectModal
        modalTitle={modalTitle}
        isCardModalOpen={isCardModalOpen}
        onSelectItem={handleOnSelectItem}
        setCardModalOpen={setCardModalOpen}
        type={
          modalTitle.includes('category')
            ? 'category'
            : modalTitle.includes('wallet')
              ? 'wallet'
              : 'date'
        }
      />
    </SafeScreen>
  );
};

export default add;
