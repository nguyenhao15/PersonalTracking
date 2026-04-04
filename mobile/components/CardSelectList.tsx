import { useGetCategories } from '@/hooks/useCategory';
import React, { useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';
import CategoryCard from './Category/ItemCard';
import { useInitialForForm } from '@/hooks/useInitialForForm';

interface CardSelectListProps {
  selectedCategory?: any;
  onSelect: (category: string) => void;
  data: any[];
  placeholder: string;
  type: 'EXPENSE' | 'INCOME';
  isLoading?: boolean;
  error?: any;
}

const CardSelectList = ({
  selectedCategory,
  onSelect,
  data,
  placeholder,
  type,
  isLoading,
  error,
}: CardSelectListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = data
    ? data.filter((category: any) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  console.log(error?.response?.data?.message);

  return (
    <View className='p-4 h-full items-center justify-center'>
      <TextInput
        className='w-full p-2 mb-4 border rounded'
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Text className='text-lg font-bold mb-4'>Select Category</Text>
      {isLoading && <LoadingPage message='Loading categories...' />}
      {error && (
        <ErrorPage
          error={error.response?.data?.message || 'An error occurred'}
        />
      )}
      {data && (
        <FlatList
          className='w-full p-2 h-full'
          data={filteredCategories}
          renderItem={({ item: item }) => (
            <View key={item?.id} className='w-full mb-3'>
              <CategoryCard
                key={item?.id}
                item={item}
                title={item?.name}
                description={item?.description || ''}
                onPress={() => onSelect(item)}
                isSelected={selectedCategory === item?.id}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default CardSelectList;
