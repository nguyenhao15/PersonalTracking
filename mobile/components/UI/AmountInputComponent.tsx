import { formatPrice, formatThousands } from '@/utils/formatValue';
import React, { useEffect, useState } from 'react';
import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import BaseModal from '../BaseModal';
import CurrencyComponent from '../Currencies/CurrencyComponent';
import ExchangeRateInputComponent from './ExchangeRateInputComponent';

interface AmountInputComponentProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  value?: string | number;
  onChange?: (text: string) => void;
  onBlur?: () => void;
  control?: any;
  baseAmountFieldName?: string;
  exchangeRateFieldName?: string;
  originalCurrencyFieldName?: string;
  originalAmountFieldName?: string;
  errorMessage?: string;
  setValueFromParent?: (value: any) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
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
  exchangeRateFieldName,
  baseAmountFieldName,
  originalCurrencyFieldName,
  setValueFromParent,
  originalAmountFieldName,
  isDisabled = false,
  isLoading = false,
}: AmountInputComponentProps<TFieldValues, TName>) => {
  const isControlled = !!control && !!originalAmountFieldName;
  const [exchangeRate, setExchangeRate] = useState<number | string>(1);
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const [currency, setCurrency] = useState({
    titleField: 'VND',
    descriptionField: 'Vietnamese Dong',
    id: 'vnd',
  });

  const handleOpenCardModal = () => {
    setCardModalOpen(true);
  };

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
      if (text === '') {
        fieldOnChange('');
        return;
      }
      const rawValue = text.replace(/\./g, '');
      const updateValue = Number(rawValue);
      fieldOnChange(updateValue.toString());
    };

    return (
      <TextInput
        style={{
          width: '100%',
          fontSize: 30,
          textAlign: 'center',
          padding: 20,
          borderBottomWidth: isDisabled || isLoading ? 0 : 2,
          borderColor: errorMessage ? '#ef4444' : '#588157',
          marginBottom: 10,
          color: 'white',
        }}
        {...restFieldProps}
        keyboardType='numeric'
        placeholder='0'
        placeholderTextColor='#9ca3af'
        value={fieldValue && formatThousands(Number(fieldValue))}
        onChangeText={onChangeText}
        isDisabled={isDisabled}
        editable={!isDisabled && !isLoading}
        selectTextOnFocus={!isDisabled && !isLoading}
        isLoading={isLoading}
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
      currencyOnChange(currency.id);
    };
    return (
      <CurrencyComponent
        selectedCurrency={currency.id}
        onSelectItem={handleSelectCurrency}
        {...restFieldProps}
      />
    );
  };

  useEffect(() => {
    if (isControlled && baseAmountFieldName && exchangeRateFieldName) {
      setValueFromParent &&
        setValueFromParent(Number(value || 0) * Number(exchangeRate));
    }
  }, [exchangeRate, value]);

  return (
    <View className='mb-2 gap-4 items-center justify-between'>
      <TouchableOpacity
        disabled={isDisabled || isLoading}
        onPress={handleOpenCardModal}
        className='self-start items-center justify-center mx-auto mb-1 px-4 py-2 bg-primary/20 rounded-full border border-primary/10'
        activeOpacity={0.8}
      >
        <Text className='font-bold text-primary text-xs tracking-wider'>
          {currency?.descriptionField?.toUpperCase()}
        </Text>
      </TouchableOpacity>

      {isControlled ? (
        <Controller
          control={control}
          name={originalAmountFieldName as TName}
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
          <ExchangeRateInputComponent
            control={control}
            exchangeRateFieldName={exchangeRateFieldName || ''}
            placeholder='Enter exchange rate...'
            errorMessage={errorMessage}
            onChange={setExchangeRate}
          />
        </View>
        {isControlled ? (
          <Controller
            control={control}
            name={originalCurrencyFieldName as TName}
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
