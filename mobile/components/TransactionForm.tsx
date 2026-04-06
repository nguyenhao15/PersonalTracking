import { useCreateTransaction } from '@/hooks/useTransaction';
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
import TagSelectComponent from './TagSelectComponent';
import LabelContainer from './UI/LabelContainer';
import PressableCardComponent from './UI/PressableCardComponent';
import SwitchControl from './UI/SwitchControl';
import WalletSelectComponent from './WalletSelectComponent';

const TransactionForm = ({ type }: { type: 'expense' | 'income' }) => {
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const [labelObject, setLabelObject] = useState<{ [key: string]: string }>({});
  const [modalTitle, setModalTitle] = useState('');

  const {
    mutateAsync,
    isPending,
    error: errorFromApi,
  } = useCreateTransaction();
  const methods = useForm<TransactionInput>({
    mode: 'onBlur',
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
      date: new Date(),
      description: '',
      categoryId: 0,
      walletId: 0,
      excludedFromReports: false,
      tag: 'nice-to-have',
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

  const [excludedFromReports, date, description] = watch([
    'excludedFromReports',
    'date',
    'description',
  ]);

  const handleOpenCardModal = (title: string) => {
    setModalTitle(title);
    setCardModalOpen(true);
  };

  const onSubmit = async (data: TransactionInput) => {
    const finalData = {
      ...data,
      transactionType: type,
    };

    try {
      await mutateAsync(finalData);
      reset();
    } catch (error) {
      console.log(
        errorFromApi?.response?.data?.message ||
          errorFromApi?.message ||
          'An error occurred',
      );
    }
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
          resetAction={reset}
        />
        <CategorySelectComponent
          transactionType={type}
          initialCategory={watch('categoryId')}
          resetActions={reset}
          onSelectCategory={(category) => setValue('categoryId', category.id)}
        />
        <InputWithModalComponent
          label='Description'
          iconName='pencil'
          iconColor='gray'
          placeholder='Enter description...'
          onChangeAction={(text) => setValue('description', text)}
          initialValue={watch('description') || ''}
          onResetAction={reset}
        />
        {type === 'expense' && (
          <TagSelectComponent
            onChangeTag={(tag) => setValue('tag', tag)}
            initialTag={watch('tag')}
            onResetAction={reset}
          />
        )}
        <LabelContainer
          isHasIcon={false}
          iconColor='black'
          direction='column'
          label='Excluded Report'
          isRequired={true}
        >
          <SwitchControl
            isLabelVisible={false}
            label={excludedFromReports ? 'Yes' : 'No'}
            onChangeAction={(value) => setValue('excludedFromReports', value)}
            defaultValue={excludedFromReports}
          />
        </LabelContainer>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
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
    </ScrollView>
  );
};

export default TransactionForm;
