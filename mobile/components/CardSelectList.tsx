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
            className='w-fit bg-text-primary text-background rounded-lg p-3 text-md font-bold mb-4'
            onPress={addBehavior}
          >
            {addLabel}
          </Text>
        )}
      </TouchableOpacity>
      <TextInput
        className='w-full p-4 mb-4 border-2 border-slate-300 rounded text-text-primary'
        placeholder={placeholder}
        placeholderTextColor='#888'
        style={{ fontSize: 18 }}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Text className='text-lg font-bold mb-4 text-text-primary'>
        {placeholder}
      </Text>
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
          className='w-full p-4 h-full rounded-xl'
          data={filteredCategories}
          renderItem={({ item: item }) => (
            <View key={item?.id} className='w-full mb-3'>
              <CategoryCard
                key={item?.id}
                item={item}
                title={item?.titleField || item?.name || ''}
                description={item?.descriptionField || ''}
                onPress={() => onSelect(item)}
                isSelected={
                  selectedItem === item?.id || selectedItem === item?.titleField
                }
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default CardSelectList;
