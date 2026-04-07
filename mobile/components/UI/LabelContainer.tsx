import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

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
}: LabelContainerProps) => {
  const isError = !!errorMessage;
  return (
    <Pressable className='gap-2' onPress={onPress}>
      <View
        className={`flex flex-row items-center gap-3 p-6 bg-background-lighter rounded-lg shadow-md ${isError ? 'border border-red-500' : ''}`}
      >
        {isHasIcon && (
          <Ionicons
            name={
              (iconName as keyof typeof Ionicons.glyphMap) || 'alert-circle'
            }
            size={15}
            color={isError ? 'red' : iconColor}
          />
        )}

        <View
          className={`flex-1 ${direction === 'row' ? 'flex-row items-center' : 'flex-col items-start'}  px-2`}
        >
          <Text className='text-xs font-bold text-text-primary'>
            {label}
            {isRequired && <Text className='text-red-500'>*</Text>}
          </Text>
          {children}
          {errorMessage && (
            <Text className='text-red-400 mt-2 text-xs font-bold '>
              {errorMessage}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default LabelContainer;
