import { formatThousands } from '@/utils/formatValue';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import CurrencyInput from 'react-native-currency-input';

interface AmountInputComponentProps {
  value?: any;
  onChange?: (text: any) => void;
  onBlur?: () => void;
  errorMessage?: string;
  textSize?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  currencyCode?: string;
}

const AmountInputComponent = ({
  value,
  onChange,
  onBlur,
  errorMessage,
  textSize = '3xl',
  isDisabled = false,
  isLoading = false,
}: AmountInputComponentProps) => {
  return (
    <View className='mb-2 gap-4'>
      <CurrencyInput
        className={`text-${textSize} border-b-[#588157] border-b-2 py-2 text-white text-center `}
        value={value}
        onChangeValue={onChange}
        delimiter='.'
        minValue={0}
        separator=','
        precision={0}
        onBlur={onBlur}
        aria-disabled={isDisabled}
        keyboardType='decimal-pad'
        placeholderTextColor='#9ca3af'
      />
      {errorMessage && (
        <Text className='text-red-600 text-xs mt-2'>{errorMessage}</Text>
      )}
    </View>
  );
};

export default AmountInputComponent;
