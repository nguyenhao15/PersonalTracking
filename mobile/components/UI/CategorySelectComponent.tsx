import { useGetCategories } from '@/hooks/useCategory';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import BaseModal from '../BaseModal';
import CardSelectList from '../CardSelectList';
import LabelContainer from './LabelContainer';

interface CategorySelectComponentProps {
  transactionType: 'expense' | 'income';
  onSelectCategory: (category: any) => void;
  initialCategory: any;
  resetActions?: () => void;
  errorMessage?: string;
}

const CategorySelectComponent = ({
  transactionType,
  onSelectCategory,
  initialCategory,
  resetActions,
  errorMessage,
}: CategorySelectComponentProps) => {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading, error } = useGetCategories(transactionType);

  const formatCategories = () => {
    if (!data) return [];
    return data.map((category: any) => ({
      titleField: category.name,
      descriptionField: `Description: ${category.description}`,
      ...category,
    }));
  };

  useEffect(() => {
    if (initialCategory) {
      const formattedCategories = formatCategories();
      const foundCategory = formattedCategories.find(
        (category: any) => category.id === initialCategory,
      );
      if (foundCategory) {
        setSelectedCategory(foundCategory);
      } else {
        setSelectedCategory(null);
      }
    }
  }, [initialCategory, data]);

  useEffect(() => {
    setSelectedCategory(null);
  }, [resetActions]);

  const handleSelectCategory = (category: any) => {
    setSelectedCategory(category);
    onSelectCategory && onSelectCategory(category.id);
    setOpenModal(false);
  };

  return (
    <View className='flex gap-2'>
      <LabelContainer
        isHasIcon
        iconColor='white'
        iconName='pricetag'
        label='Category'
        isRequired={true}
        errorMessage={errorMessage}
        onPress={() => setOpenModal(true)}
      >
        <Text
          className={`${selectedCategory ? 'font-bold text-white ' : 'text-gray-500'} mt-2 self-start text-lg`}
        >
          {selectedCategory
            ? selectedCategory.titleField
            : 'Select a category...'}
        </Text>
      </LabelContainer>
      <BaseModal visible={openModal} onClose={() => setOpenModal(false)}>
        <CardSelectList
          addLabel={'Add Category'}
          canAddNewItem
          data={formatCategories()}
          isLoading={isLoading}
          error={error}
          selectedItem={selectedCategory?.id}
          placeholder='Select a category...'
          onSelect={handleSelectCategory}
        />
      </BaseModal>
    </View>
  );
};

export default CategorySelectComponent;
