import { View, Text } from 'react-native';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CategoryInput } from '@/validations/categorySchema';
import InputInlineComponent from '../UI/InputInlineComponent';
import SwitchControl from '../UI/SwitchControl';
import LabelContainer from '../UI/LabelContainer';

interface CategoryFormElementsProps {
  errors: any;
}

const CategoryFormElements = ({ errors }: CategoryFormElementsProps) => {
  const { control } = useFormContext<CategoryInput>();

  return (
    <View className='flex gap-4 p-2'>
      <Controller
        control={control}
        name='name'
        render={({ field: { onChange, onBlur, value } }) => (
          <InputInlineComponent
            label='Category Name'
            placeholder='Enter category name'
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            errorMessage={errors.name?.message}
          />
        )}
      />

      <Controller
        name='description'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputInlineComponent
            label='Category Description'
            placeholder='Enter category description'
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            errorMessage={errors.description?.message}
          />
        )}
      />
      <Controller
        name='categoryType'
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <LabelContainer
            isHasIcon={false}
            iconName='list'
            iconColor='#588157'
            direction='column'
            label='Is Income'
            isRequired={true}
            errorMessage={errors.categoryType?.message}
          >
            <SwitchControl
              isLabelVisible={false}
              label={value ? 'Yes' : 'No'}
              onChangeAction={onChange}
              defaultValue={value}
              disabled={field.disabled || false}
            />
          </LabelContainer>
        )}
      />
    </View>
  );
};

export default CategoryFormElements;
