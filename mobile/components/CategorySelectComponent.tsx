import { useGetCategories } from '@/hooks/useCategory';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import BaseModal from './BaseModal';
import CardSelectList from './CardSelectList';
import LabelContainer from './UI/LabelContainer';

interface CategorySelectComponentProps {
  transactionType: 'expense' | 'income';
  onSelectCategory: (category: any) => void;
  initialCategory: any;
}

const CategorySelectComponent = ({
  transactionType,
  onSelectCategory,
  initialCategory,
}: CategorySelectComponentProps) => {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading, error } = useGetCategories(transactionType);

  const formatCategories = () => {
    if (!data) return [];
    return data.map((category: any) => ({
      id: category.id,
      titleField: category.name,
      descriptionField: `Description: ${category.description}`,
    }));
  };

  useEffect(() => {
    if (initialCategory) {
      const formattedCategories = formatCategories();
      const foundCategory = formattedCategories.find(
        (category: any) => category.id === initialCategory.id,
      );
      if (foundCategory) {
        setSelectedCategory(foundCategory);
      }
    }
  }, [initialCategory, data]);

  const handleSelectCategory = (category: any) => {
    setSelectedCategory(category);
    onSelectCategory && onSelectCategory(category);
    setOpenModal(false);
  };

  return (
    <View className='flex gap-2'>
      <LabelContainer
        isHasIcon
        iconColor='black'
        iconName='pricetag'
        label='Category'
        isRequired={true}
        onPress={() => setOpenModal(true)}
      >
        <Text
          className={`${selectedCategory ? 'font-bold text-black ' : 'text-gray-500'} mt-2 self-start text-lg`}
        >
          {selectedCategory
            ? selectedCategory.titleField
            : 'Select a category...'}
        </Text>
      </LabelContainer>
      <BaseModal visible={openModal} onClose={() => setOpenModal(false)}>
        <CardSelectList
          data={formatCategories()}
          isLoading={isLoading}
          error={error}
          selectedCategory={selectedCategory}
          placeholder='Select a category...'
          onSelect={handleSelectCategory}
        />
      </BaseModal>
    </View>
  );
};

export default CategorySelectComponent;
