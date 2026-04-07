import { formatThousands } from '@/utils/formatValue';
import React from 'react';
import { Controller } from 'react-hook-form';
import { TextInput } from 'react-native';

interface ExchangeRateInputComponentProps {
  exchangeRateFieldName: string;
  control: any;
  errorMessage?: string;
  placeholder?: string;
  onChange?: (text: number | string) => void;
  onBlur?: () => void;
  value?: number;
}

const ExchangeRateInputComponent = ({
  exchangeRateFieldName,
  control,
  placeholder = 'Exchange rate...',
  errorMessage,
  onChange,
  onBlur,
  value,
}: ExchangeRateInputComponentProps) => {
  const isControlled = !!control && !!exchangeRateFieldName;

  const renderExchangeRateInput = ({
    fieldValue,
    fieldOnChange,
    fieldBlur,
  }: {
    fieldValue: string | number;
    fieldOnChange: (text: string | number) => void;
    fieldBlur: () => void;
  }) => {
    const handleOnChangeText = (text: string) => {
      const cleanedText = text.replace(/\./g, '');
      const numericValue = cleanedText ? Number(cleanedText) : 0;
      fieldOnChange(cleanedText);
      onChange && onChange(numericValue);
    };

    return (
      <TextInput
        placeholder={placeholder || 'Exchange rate...'}
        placeholderTextColor='#9ca3af'
        placeholderClassName='text-lg text-text-primary font-bold mb-4'
        keyboardType='numeric'
        className='w-full py-3 self-center text-xl text-text-primary font-bold border-b-2 border-gray-300 mb-4'
        value={formatThousands(fieldValue)}
        onChangeText={handleOnChangeText}
        onBlur={fieldBlur}
      />
    );
  };

  return isControlled ? (
    <Controller
      control={control}
      name={exchangeRateFieldName}
      render={({
        field: {
          onChange: fieldOnChange,
          onBlur: fieldOnBlur,
          value: fieldValue,
          ...restFieldProps
        },
      }) =>
        renderExchangeRateInput({
          fieldValue,
          fieldOnChange,
          fieldBlur: fieldOnBlur,
          ...restFieldProps,
        })
      }
    />
  ) : (
    renderExchangeRateInput({
      fieldValue: value || '',
      fieldOnChange: onChange || (() => {}),
      fieldBlur: onBlur || (() => {}),
    })
  );
};

export default ExchangeRateInputComponent;
