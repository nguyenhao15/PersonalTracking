import { useGetCategories } from '@/hooks/useCategory';
import React, { useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import LoadingPage from '../LoadingPage';
import ErrorPage from '../ErrorPage';
import CategoryCard from './CategoryCard';

const CategorySelect = ({
  selectedCategory,
  onSelect,
}: {
  selectedCategory?: any;
  onSelect: (category: string) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading, error } = useGetCategories();

  const filteredCategories = data
    ? data.filter((category: any) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  return (
    <View className='p-4  items-center justify-center'>
      <TextInput
        className='w-full p-2 mb-4 border rounded'
        placeholder='Search categories...'
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
          renderItem={({ item: category }) => (
            <View key={category.id} className='w-full mb-3'>
              <CategoryCard
                key={category.id}
                item={category}
                onPress={() => onSelect(category)}
                isSelected={selectedCategory === category.id}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default CategorySelect;
