import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import BaseModal from '../BaseModal';
import CurrencyComponent from '../Currencies/CurrencyComponent';

interface CurrencyChipComponentProps {
  label: string;
  onSelectItem: (currency: string) => void;
  disabled: boolean;
  errorMessage?: string;
}

const CurrencyChipComponent = ({
  label,
  onSelectItem,
  disabled,
  errorMessage,
  ...props
}: CurrencyChipComponentProps) => {
  const [visible, setVisible] = useState(false);
  const baseStyle =
    'self-center w-1/4 border h-12 rounded-lg items-center justify-center';
  const errorStyle = 'border-error bg-error/10 text-error border-2';
  const normalStyle = 'border-gray-300 text-text-primary';
  const style = errorMessage ? errorStyle : normalStyle;

  const handleOnSelectItem = (currency: any) => {
    onSelectItem(currency.titleField || '');
    setVisible(false);
  };

  return (
    <View className='flex w-full justify-between mb-4'>
      <TouchableOpacity
        className={`${baseStyle} ${style}`}
        onPress={() => setVisible(true)}
        disabled={disabled}
        {...props}
      >
        <Text className={`${style} text-xl font-bold`}>{label}</Text>
      </TouchableOpacity>
      {errorMessage && (
        <Text className='text-error text-xs'>{errorMessage}</Text>
      )}
      <BaseModal visible={visible} onClose={() => setVisible(false)}>
        <CurrencyComponent
          selectedCurrency={label}
          onSelectItem={handleOnSelectItem}
        />
      </BaseModal>
    </View>
  );
};

export default CurrencyChipComponent;
