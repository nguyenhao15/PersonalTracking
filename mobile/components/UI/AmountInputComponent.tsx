import { formatPrice } from '@/utils/formatValue';
import React, { useState } from 'react';
import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import BaseModal from '../BaseModal';
import CurrencyComponent from '../Currencies/CurrencyComponent';

interface AmountInputComponentProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  value?: string | number;
  onChange?: (text: string) => void;
  onBlur?: () => void;
  control?: any;
  name?: TName;
  errorMessage?: string;
  currency: string;
}

const AmountInputComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  value,
  onChange,
  onBlur,
  errorMessage,
  control,
  name,
  currency = 'VND',
}: AmountInputComponentProps<TFieldValues, TName>) => {
  const [isCardModalOpen, setCardModalOpen] = useState(false);

  const handleOpenCardModal = () => {
    setCardModalOpen(true);
  };

  const renderAmountInput = (
    fieldValue: string | number,
    fieldOnChange: (text: string) => void,
    fieldOnBlur: () => void,
    restFieldProps = {},
  ) => {
    const onChangeText = (text: string) => {
      const rawValue = text.replace(/\D/g, '');
      fieldOnChange(rawValue);
    };

    return (
      <TextInput
        style={{
          width: '100%',
          fontSize: 30,
          textAlign: 'center',
          padding: 20,
          borderBottomWidth: 1,
          borderColor: errorMessage ? '#ef4444' : '#d1d5db',
          marginBottom: 10,
          color: 'white',
        }}
        keyboardType='numeric'
        placeholder='0'
        placeholderTextColor='#9ca3af'
        value={fieldValue ? formatPrice(fieldValue, currency) : ''}
        onChangeText={onChangeText}
        onBlur={fieldOnBlur}
      />
    );
  };

  return (
    <View className='mb-2 gap-4 items-center justify-between'>
      <TouchableOpacity
        onPress={handleOpenCardModal}
        className='self-start items-center justify-center mx-auto mb-1 px-3 py-2 bg-background-lighter rounded-md'
      >
        <Text className='font-bold text-text-primary'>{currency}</Text>
      </TouchableOpacity>

      {control && name ? (
        <Controller
          control={control}
          name={name}
          render={({
            field: {
              onChange: fieldOnChange,
              onBlur: fieldOnBlur,
              value: fieldValue,
              ...restFieldProps
            },
          }) =>
            renderAmountInput(
              fieldValue,
              fieldOnChange,
              fieldOnBlur,
              restFieldProps,
            )
          }
        />
      ) : (
        renderAmountInput(
          value || '',
          onChange || (() => {}),
          onBlur || (() => {}),
        )
      )}
      {errorMessage ? (
        <Text className='text-red-500 text-sm'>{errorMessage}</Text>
      ) : null}
      <BaseModal
        visible={isCardModalOpen}
        onClose={() => setCardModalOpen(false)}
      >
        <View className='p-4'>
          <Text className='text-lg text-text-primary font-bold mb-4'>
            Select Currency
          </Text>
          <CurrencyComponent />
        </View>
      </BaseModal>
    </View>
  );
};

export default AmountInputComponent;
