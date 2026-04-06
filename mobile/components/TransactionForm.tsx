import {
  TransactionInput,
  transactionSchema,
} from '@/validations/transactionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CategorySelectComponent from './CategorySelectComponent';
import InputWithModalComponent from './InputWithModalComponent';
import SelectModal from './SelectModal';
import LabelContainer from './UI/LabelContainer';
import PressableCardComponent from './UI/PressableCardComponent';
import SwitchControl from './UI/SwitchControl';
import WalletSelectComponent from './WalletSelectComponent';

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
      categoryId: 0,
      walletId: 0,
      excludeReport: false,
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

  const [excludeReport, date, description] = watch([
    'excludeReport',
    'date',
    'description',
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
    <ScrollView className='p-4 gap-4'>
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

        <WalletSelectComponent
          initialWallet={watch('walletId')}
          onSelectWallet={(wallet) => setValue('walletId', wallet.id)}
        />
        <CategorySelectComponent
          transactionType={type}
          initialCategory={watch('categoryId')}
          onSelectCategory={(category) => setValue('categoryId', category.id)}
        />
        <InputWithModalComponent
          label='Description'
          iconName='pencil'
          iconColor='gray'
          placeholder='Enter description...'
          onChangeAction={(text) => setValue('description', text)}
          initialValue={watch('description') || ''}
        />
        <LabelContainer
          isHasIcon={false}
          iconColor='black'
          direction='column'
          label='Excluded Report'
          isRequired={true}
        >
          <SwitchControl
            isLabelVisible={false}
            label={excludeReport ? 'Yes' : 'No'}
            onChangeAction={(value) => setValue('excludeReport', value)}
            defaultValue={excludeReport}
          />
        </LabelContainer>

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
    </ScrollView>
  );
};

export default TransactionForm;
