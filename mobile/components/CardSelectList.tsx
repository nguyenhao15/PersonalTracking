import React, { useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CategoryCard from './Category/ItemCard';
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';

interface CardSelectListProps {
  selectedItem?: any;
  onSelect: (category: string) => void;
  data: any[];
  placeholder: string;
  isLoading?: boolean;
  error?: any;
  canAddNewItem?: boolean;
  addBehavior?: () => void;
  addLabel?: string;
}

const CardSelectList = ({
  selectedItem,
  onSelect,
  data,
  placeholder,
  isLoading,
  error,
  canAddNewItem = false,
  addBehavior,
  addLabel = 'Add New',
}: CardSelectListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = data
    ? data.filter((items: any) =>
        items.titleField.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  return (
    <View className='p-4 h-full items-center justify-center'>
      <TouchableOpacity className='self-end'>
        {canAddNewItem && (
          <Text
            className='text-white w-fit bg-[#2a9d8f] rounded border-transparent shadow-black p-2 text-md font-bold mb-4'
            onPress={addBehavior}
          >
            {addLabel}
          </Text>
        )}
      </TouchableOpacity>
      <TextInput
        className='w-full p-2 mb-4 border rounded'
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Text className='text-lg font-bold mb-4'>{placeholder}</Text>
      {isLoading && (
        <LoadingPage message={`Loading ${placeholder.toLowerCase()}...`} />
      )}
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
                title={item?.titleField || item?.name || ''}
                description={item?.descriptionField || ''}
                onPress={() => onSelect(item)}
                isSelected={selectedItem === item?.id}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default CardSelectList;
