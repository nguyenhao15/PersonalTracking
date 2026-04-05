import {
  TransactionInput,
  transactionSchema,
} from '@/validations/transactionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import SelectModal from './SelectModal';
import PressableCardComponent from './UI/PressableCardComponent';

const TransactionForm = ({ type }: { type: 'expense' | 'income' }) => {
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const [labelObject, setLabelObject] = useState<{ [key: string]: string }>({});
  const [modalTitle, setModalTitle] = useState('');
  const methods = useForm<TransactionInput>({
    mode: 'onBlur',
    resolver: zodResolver(transactionSchema),
    defaultValues: {
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

  const [date, description] = watch(['date', 'description']);

  const handleOnSelectItem = (item: any) => {
    if (modalTitle.includes('category')) {
      setValue('categoryId', item.id);
      setLabelObject((prev) => ({ ...prev, category: item.name }));
    } else if (modalTitle.includes('wallet')) {
      setValue('walletId', item.id);
      setLabelObject((prev) => ({ ...prev, wallet: item.walletName }));
    } else if (modalTitle.includes('date')) {
      setValue('date', item);
    } else if (modalTitle.includes('description')) {
      setValue('description', item.nativeEvent.text);
    }
    setCardModalOpen(false);
  };

  const handleOpenCardModal = (title: string) => {
    setModalTitle(title);
    setCardModalOpen(true);
  };

  return (
    <View className='p-4 gap-4'>
      <View className='gap-4 mb-2'>
        <View className='mb-10 gap-4 h-32 items-center justify-between'>
          <TouchableOpacity
            onPress={() => handleOpenCardModal('Choose currency')}
            className='self-start items-center justify-center mx-auto mb-1 px-3 py-2 bg-gray-200 rounded-md'
          >
            <Text className='font-bold'>VND</Text>
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
          value={labelObject.wallet || ''}
          error={errors.walletId?.message}
          iconName='wallet'
          onPress={() => handleOpenCardModal('Choose wallet')}
        />
        <PressableCardComponent
          title='Category'
          value={labelObject.category || ''}
          error={errors.categoryId?.message}
          iconName='pricetag'
          onPress={() => handleOpenCardModal('Choose category')}
        />
        <PressableCardComponent
          title='Description'
          value={description || ''}
          error={errors.description?.message}
          iconName='document-text'
          onPress={() => handleOpenCardModal('Choose description')}
        />

        <TouchableOpacity
          onPress={handleSubmit((data) => {
            console.log('Form data: ', data);
          })}
          style={
            type === 'expense'
              ? { backgroundColor: '#ef4444' }
              : { backgroundColor: '#10b981' }
          }
          className='w-full py-3 rounded-md items-center justify-center mt-4'
        >
          <Text className='text-white font-bold'>
            Create {type === 'expense' ? 'Expense' : 'Income'}
          </Text>
        </TouchableOpacity>
      </View>

      <SelectModal
        defaultValue={getValues()}
        modalTitle={modalTitle}
        isCardModalOpen={isCardModalOpen}
        onSelectItem={handleOnSelectItem}
        setCardModalOpen={setCardModalOpen}
        transactionType={type}
        type={
          modalTitle.includes('category')
            ? 'category'
            : modalTitle.includes('wallet')
              ? 'wallet'
              : modalTitle.includes('date')
                ? 'date'
                : 'description'
        }
      />
    </View>
  );
};

export default TransactionForm;
