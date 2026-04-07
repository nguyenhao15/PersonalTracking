import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

const Button = ({
  title,
  onPress,
  disabled,
  isLoading,
  className,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      className={`${isLoading ? 'opacity-50' : ''} rounded py-3 self-center px-6 ${className || 'bg-primary'}`}
    >
      <View className='flex flex-row gap-2 items-center justify-center'>
        {isLoading && <ActivityIndicator className='text-text-tertiary' />}
        <Text className='font-bold text-white'>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
