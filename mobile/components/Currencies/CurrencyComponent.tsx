import { useGetCurrency } from '@/hooks/useCurrency';
import React from 'react';
import { View } from 'react-native';
import CardSelectList from '../CardSelectList';

const CurrencyComponent = () => {
  const { data: currencies, isLoading, error } = useGetCurrency();

  const raw = currencies?.data || {};

  const normalized = Object.entries(raw)
    .filter(([_, name]) => name && name.trim() !== '') // remove empty
    .map(([symbol, name]) => ({
      id: symbol,
      titleField: symbol.toUpperCase(),
      descriptionField: name.trim(),
    }))
    .sort((a, b) => a.titleField.localeCompare(b.titleField)); // optional sort

  return (
    <View className='flex gap-2'>
      <CardSelectList
        data={normalized}
        onSelect={(item) => {
          console.log('Selected currency:', item);
        }}
        selectedItem={'vnd'}
        isLoading={isLoading}
        error={error}
        placeholder='Select currency'
      />
    </View>
  );
};

export default CurrencyComponent;
