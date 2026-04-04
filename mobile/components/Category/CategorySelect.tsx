import { useGetCategories } from '@/hooks/useCategory';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import LoadingPage from '../LoadingPage';
import ErrorPage from '../ErrorPage';
import CategoryCard from './CategoryCard';

const CategorySelect = ({
  onSelect,
}: {
  onSelect: (category: string) => void;
}) => {
  const { data, isLoading, error } = useGetCategories();

  return (
    <View className='p-4  items-center justify-center'>
      <Text className='text-lg font-bold mb-4'>Select Category</Text>
      {isLoading && <LoadingPage message='Loading categories...' />}
      {error && <ErrorPage error={error} />}
      {data && (
        <FlatList
          className='w-full p-2 h-full'
          data={data}
          renderItem={({ item: category }) => (
            <View key={category.id} className='w-full mb-3'>
              <CategoryCard
                key={category.id}
                item={category}
                onPress={() => onSelect(category)}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default CategorySelect;
