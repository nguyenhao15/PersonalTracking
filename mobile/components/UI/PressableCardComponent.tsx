import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const PressableCardComponent = ({
  title,
  isRequired = false,
  onPress,
  value,
  error,
  iconName = 'information',
}: {
  title: string;
  isRequired?: boolean;
  onPress: () => void;
  value?: string | undefined;
  error?: string;
  iconName?: string;
}) => {
  return (
    <Pressable
      style={{
        borderWidth: 1,
        borderColor: error ? '#f87171' : '#e5e7eb',
        borderRadius: 8,
        backgroundColor: '#fff',
        elevation: 3,
      }}
      onPress={onPress}
      className='p-4 bg-white rounded-lg shadow'
    >
      <View className='flex flex-row gap-2 py-2 items-center my-auto pl-2'>
        <Ionicons
          className='mr-2'
          name={iconName as any}
          size={20}
          color='#000'
        />
        <View className='flex flex-col gap-2'>
          <Text className='font-bold text-gray-700'>
            {title}
            {isRequired && <Text className='text-red-500 mr-2'>*</Text>}
          </Text>
          <Text
            style={{ color: value ? '#000' : '#748cab' }}
            className='text-gray-500 mt-1 font-bold'
          >
            {value ? value : `Select ${title.toLowerCase()}`}
          </Text>
          {error && <Text className='text-red-400 font-bold '>{error}</Text>}
        </View>
      </View>
    </Pressable>
  );
};

export default PressableCardComponent;
