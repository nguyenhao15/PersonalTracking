import {
  categorySchema,
  createCategorySchema,
} from '@/validations/categorySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import CategoryFormElements from './CategoryFormElements';

const CategoryForm = () => {
  const methods = useForm({
    mode: 'onBlur',
    resolver: zodResolver(createCategorySchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: any) => {
    console.log('DATA: ', data);
  };

  return (
    <View className='p-2 gap-2'>
      <FormProvider {...methods}>
        <CategoryFormElements errors={errors} />
        <TouchableOpacity
          className='w-full p-3 rounded bg-primary'
          onPress={handleSubmit(onSubmit)}
        >
          <Text className='text-background text-center font-bold text-md'>
            Create Category
          </Text>
        </TouchableOpacity>
      </FormProvider>
    </View>
  );
};

export default CategoryForm;
