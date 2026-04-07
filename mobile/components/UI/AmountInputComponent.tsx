import { formatPrice, formatThousands } from '@/utils/formatValue';
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
  walletCurrencyId: string;
  errorMessage?: string;
}

const AmountInputComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  value,
  onChange,
  onBlur,
  walletCurrencyId,
  errorMessage,
  control,
  name,
}: AmountInputComponentProps<TFieldValues, TName>) => {
  const isControlled = !!control && !!name;
  const [exchangeRate, setExchangeRate] = useState(1);
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const [currency, setCurrency] = useState({
    titleField: 'VND',
    descriptionField: 'Vietnamese Dong',
    id: 'vnd',
  });
  const handleOpenCardModal = () => {
    setCardModalOpen(true);
  };

  const isDifferentCurrency =
    walletCurrencyId && currency.id !== walletCurrencyId;

  const handleSelectCurrency = (currency: any) => {
    setCurrency(currency);
    setCardModalOpen(false);
  };

  const renderAmountInput = (
    fieldValue: string | number,
    fieldOnChange: (text: string) => void,
    fieldOnBlur: () => void,
    ...restFieldProps: any
  ) => {
    const onChangeText = (text: string) => {
      const rawValue = text.replace(/\D/g, '');
      const updateValue = isDifferentCurrency
        ? Number(rawValue) * exchangeRate
        : Number(rawValue);
      fieldOnChange(updateValue.toString());
    };

    const displayValue = (textnum: number | string) => {
      const handleDisplayValue = isDifferentCurrency
        ? formatThousands(Number(textnum) * exchangeRate)
        : formatThousands(textnum);
      return handleDisplayValue;
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
        {...restFieldProps}
        keyboardType='numeric'
        placeholder='0'
        placeholderTextColor='#9ca3af'
        value={displayValue(fieldValue)}
        onChangeText={onChangeText}
        onBlur={fieldOnBlur}
      />
    );
  };

  const renderCurrencyInput = (
    currencyOnChange: (currency: string) => void,
    ...restFieldProps: any
  ) => {
    const handleSelectCurrency = (currency: any) => {
      setCurrency(currency);
      setCardModalOpen(false);
      currencyOnChange(currency);
    };
    return (
      <CurrencyComponent
        selectedCurrency={currency.id}
        onSelectItem={handleSelectCurrency}
        {...restFieldProps}
      />
    );
  };

  return (
    <View className='mb-2 gap-4 items-center justify-between'>
      <TouchableOpacity
        onPress={handleOpenCardModal}
        className='self-start items-center justify-center mx-auto mb-1 px-3 py-2 bg-background-lighter rounded-md'
      >
        <Text className='font-bold text-text-primary'>
          {currency?.descriptionField}
        </Text>
      </TouchableOpacity>

      {isControlled ? (
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
      {exchangeRate !== 1 && (
        <Text className='text-gray-400 text-sm'>
          {`Exchange Rate: ${formatPrice(exchangeRate, 'VND')} = 1 ${currency.titleField.toUpperCase()}`}
        </Text>
      )}
      <BaseModal
        visible={isCardModalOpen}
        onClose={() => setCardModalOpen(false)}
      >
        <View className='p-4'>
          <Text className='text-lg text-text-primary font-bold mb-4'>
            Select Currency
          </Text>
          <TextInput
            placeholder='Exchange rate...'
            placeholderTextColor='#9ca3af'
            placeholderClassName='text-lg text-text-primary font-bold mb-4'
            keyboardType='numeric'
            className='w-full py-3 self-center text-xl text-text-primary font-bold border-b-2 border-gray-300 mb-4'
            value={exchangeRate.toString()}
            onChangeText={(text) => setExchangeRate(Number(text))}
          />
        </View>
        {isControlled ? (
          <Controller
            control={control}
            name={name}
            render={({
              field: {
                onChange: fieldOnChange,
                value: fieldValue,
                ...restFieldProps
              },
            }) => renderCurrencyInput(fieldOnChange, restFieldProps)}
          />
        ) : (
          renderCurrencyInput(handleSelectCurrency || (() => {}))
        )}
      </BaseModal>
    </View>
  );
};

export default AmountInputComponent;
