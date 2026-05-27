import { useCreateWallet } from '@/hooks/useWallets';
import { walletSchema, WalletTypeEnum } from '@/validations/walletSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Button from '../UI/Button';
import InputInlineComponent from '../UI/InputInlineComponent';
import TagSelectComponent from '../UI/TagSelectComponent';

const WalletForm = ({ backAction }: { backAction?: () => void }) => {
  const { mutateAsync: createWallet, isPending: isCreatingWallet } =
    useCreateWallet();
  const methods = useForm({
    resolver: zodResolver(walletSchema),
    mode: 'onBlur',
    defaultValues: {
      walletName: '',
      balance: 0,
      currency: 'VND',
      description: '',
      walletType: 'cash',
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: any) => {
    try {
      await createWallet(data);
      reset();
      backAction && backAction();
    } catch (error: any) {
      console.error('Error creating wallet:', error?.response?.data?.message);
    }
  };

  return (
    <ScrollView className='gap-2'>
      <View>
        <TouchableOpacity
          onPress={backAction}
          className='bg-surface-light p-2 px-4 rounded-lg self-start'
        >
          <Text className='text-text-secondary font-bold'> Back</Text>
        </TouchableOpacity>
        <Text className='text-lg self-center font-bold text-text-primary'>
          Create New Wallet
        </Text>
      </View>
      <FormProvider {...methods}>
        <View className='gap-2 p-4'>
          <Controller
            control={control}
            name='walletName'
            render={({ field: { onChange, onBlur, value } }) => (
              <InputInlineComponent
                label='Wallet Name'
                keyboardType='default'
                isRequired
                placeholder='Enter wallet name'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                errorMessage={errors.walletName?.message}
                isDisabled={isCreatingWallet}
                isLoading={isCreatingWallet}
              />
            )}
          />

          <Controller
            control={control}
            name='currency'
            render={({ field: { onChange, onBlur, value } }) => (
              <InputInlineComponent
                label='Currency'
                keyboardType='default'
                isRequired
                placeholder='Enter currency'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                errorMessage={errors.currency?.message}
                isDisabled={isCreatingWallet}
                isLoading={isCreatingWallet}
              />
            )}
          />

          <Controller
            control={control}
            name='balance'
            render={({ field: { onChange, onBlur, value } }) => (
              <InputInlineComponent
                label='Initial Balance'
                keyboardType='numeric'
                isDisabled={isCreatingWallet}
                isLoading={isCreatingWallet}
                isRequired
                placeholder='Enter initial balance'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                errorMessage={errors.balance?.message}
              />
            )}
          />
          <Controller
            control={control}
            name='description'
            render={({ field: { onChange, onBlur, value } }) => (
              <InputInlineComponent
                isDisabled={isCreatingWallet}
                isLoading={isCreatingWallet}
                label='Description'
                isMultiline
                keyboardType='default'
                iconColor='white'
                placeholder='Enter description'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />

          <Controller
            control={control}
            name='walletType'
            render={({ field: { onChange, value, ...field } }) => (
              <TagSelectComponent
                onChangeTag={onChange}
                initialTag={value}
                data={WalletTypeEnum}
                onResetAction={reset}
                errorMessage={errors.walletType?.message}
                disabled={field.disabled || false}
              />
            )}
          />
        </View>
      </FormProvider>
      <Button
        title='Create Wallet'
        onPress={handleSubmit(onSubmit)}
        isLoading={isCreatingWallet}
      />
    </ScrollView>
  );
};

export default WalletForm;
