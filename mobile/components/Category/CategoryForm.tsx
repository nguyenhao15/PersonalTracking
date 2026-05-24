import {
  categorySchema,
  createCategorySchema,
} from '@/validations/categorySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import CategoryFormElements from './CategoryFormElements';
import { useCreateNewCategoru } from '@/hooks/useCategory';
import Toast from 'react-native-toast-message';

interface CategoryFormProps {
  onSubmit: () => void;
}

const CategoryForm = ({ onSubmit }: CategoryFormProps) => {
  const { mutateAsync: handleCreateNewCategory, isPending } =
    useCreateNewCategoru();
  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      categoryType: false,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const handleShowToast = (
    message: string,
    type: 'success' | 'error' | 'info',
  ) => {
    Toast.show({
      type: type,
      text1: message,
      position: 'top',
      topOffset: 80,
    });
  };

  const handleSubmitForm = async (data: any) => {
    const { categoryType, ...rest } = data;

    try {
      await handleCreateNewCategory({
        ...rest,
        categoryType: categoryType ? 'income' : 'expense',
      });
      reset();
      handleShowToast('Category created successfully', 'success');
      onSubmit();
    } catch (error: any) {
      handleShowToast(error.message, 'error');
    }
  };

  return (
    <View className='p-2 gap-2'>
      <FormProvider {...methods}>
        <CategoryFormElements errors={errors} />
        <TouchableOpacity
          className='w-full p-3 rounded bg-primary'
          onPress={handleSubmit(handleSubmitForm)}
          disabled={isPending}
        >
          <Text className='text-background text-center font-bold text-md'>
            {isPending ? 'Creating...' : 'Create Category'}
          </Text>
        </TouchableOpacity>
      </FormProvider>
    </View>
  );
};

export default CategoryForm;
