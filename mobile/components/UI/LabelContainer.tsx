import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

interface LabelContainerProps {
  label: string;
  children: React.ReactNode;
  isRequired?: boolean;
  errorMessage?: string;
  isHasIcon?: boolean;
  iconName?: string;
  iconColor?: string;
  direction?: 'row' | 'column';
  onPress?: () => void;
  onBlur?: () => void;
  isLoading?: boolean;
}

const LabelContainer = ({
  label,
  children,
  isRequired = false,
  errorMessage,
  isHasIcon = false,
  iconName = 'alert-circle',
  direction = 'column',
  iconColor = 'white',
  onPress,
  onBlur,
  isLoading,
  ...rest
}: LabelContainerProps) => {
  const isError = !!errorMessage;

  return (
    <Pressable
      disabled={isLoading}
      onBlur={onBlur}
      {...rest}
      className='gap-2'
      onPress={onPress}
    >
      <View
        className={`flex flex-row items-center gap-4 p-6 bg-background-light rounded-2xl ${isError ? 'border border-red-500' : ''}`}
      >
        <Ionicons
          name={(iconName as keyof typeof Ionicons.glyphMap) || 'alert-circle'}
          size={15}
          color={isError ? 'red' : iconColor}
        />

        <View
          className={`flex-1 ${direction === 'row' ? 'flex-row items-center' : 'flex-col items-start'}  px-2`}
        >
          <Text className='text-xs font-bold text-text-primary'>
            {label}
            {isRequired && <Text className='text-red-500'>*</Text>}
          </Text>
          <View className='w-full items-start'>{children}</View>

          {errorMessage && (
            <Text className='text-red-400 text-xs font-bold '>
              {errorMessage}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default LabelContainer;
