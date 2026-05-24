import React from 'react';
import AmountInputComponent from './AmountInputComponent';
import { Text, View } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
``;
interface ExchangeRateInputComponentProps {
  errorMessage?: string;
  placeholder?: string;
  onChange?: (text: any) => void;
  onBlur?: () => void;
  value?: any;
  disabled: boolean;
}

const ExchangeRateInputComponent = ({
  placeholder = 'Exchange rate...',
  errorMessage,
  onChange,
  onBlur,
  value,
  disabled,
}: ExchangeRateInputComponentProps) => {
  return (
    <View className='flex gap-2 items-center border-b-2 border-b-primary py-4'>
      <Text className='font-bold text-white'>Tỷ giá</Text>
      <CurrencyInput
        className={`text-2xl py-2 text-white text-center `}
        value={value}
        onChangeValue={onChange}
        delimiter='.'
        minValue={0}
        separator=','
        readOnly={disabled}
        precision={0}
        onBlur={onBlur}
        placeholder={placeholder}
        keyboardType='decimal-pad'
        placeholderTextColor='#9ca3af'
      />
    </View>
  );
};

export default ExchangeRateInputComponent;
