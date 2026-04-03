import { useGetCategories } from '@/hooks/useCategory';
import React from 'react';
import { Text, View } from 'react-native';

const CategorySelect = ({
  onSelect,
}: {
  onSelect: (category: string) => void;
}) => {
  const { data, isLoading, error } = useGetCategories();

  return (
    <View className='p-4'>
      <Text>CategorySelect</Text>
    </View>
  );
};

export default CategorySelect;
