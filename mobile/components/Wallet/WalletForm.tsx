import { useCreateWallet } from '@/hooks/useWallets';
import { walletSchema, WalletTypeEnum } from '@/validations/walletSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import Button from '../UI/Button';
import InputInlineComponent from '../UI/InputInlineComponent';
import TagSelectComponent from '../UI/TagSelectComponent';

const WalletForm = () => {
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
    } catch (error) {
      console.error('Error creating wallet:', error?.response?.data?.message);
    }
  };

  return (
    <ScrollView className='gap-2'>
      <Text className='text-lg self-center font-bold text-text-primary'>
        Create New Wallet
      </Text>
      <FormProvider {...methods}>
        <View className='gap-2 p-4'>
          <InputInlineComponent
            label='Wallet Name'
            keyboardType='default'
            isRequired
            placeholder='Enter wallet name'
            control={control}
            name='walletName'
            errorMessage={errors.walletName?.message}
            isDisabled={isCreatingWallet}
            isLoading={isCreatingWallet}
          />

          <InputInlineComponent
            label='Currency'
            keyboardType='default'
            isRequired
            placeholder='Enter currency'
            control={control}
            name='currency'
            errorMessage={errors.currency?.message}
            isDisabled={isCreatingWallet}
            isLoading={isCreatingWallet}
          />

          <InputInlineComponent
            label='Initial Balance'
            keyboardType='numeric'
            isDisabled={isCreatingWallet}
            isLoading={isCreatingWallet}
            isRequired
            placeholder='Enter initial balance'
            control={control}
            name='balance'
            errorMessage={errors.balance?.message}
          />
          <InputInlineComponent
            isDisabled={isCreatingWallet}
            isLoading={isCreatingWallet}
            label='Description'
            isMultiline
            keyboardType='default'
            iconColor='white'
            placeholder='Enter description'
            control={control}
            name='description'
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
                {...field}
                errorMessage={errors.walletType?.message}
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
