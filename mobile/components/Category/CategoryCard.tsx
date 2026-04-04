import { View, Text, Pressable } from 'react-native';
import React from 'react';

const CategoryCard = ({
  item,
  onPress,
}: {
  item: any;
  onPress: (item: any) => void;
}) => {
  const handleOnPress = () => {
    onPress(item);
  };

  return (
    <Pressable onPress={handleOnPress}>
      <View className='p-4 bg-white rounded-lg shadow-md'>
        <Text className='text-lg font-bold mb-2'>{item.name}</Text>
        <Text className='text-gray-500 text-sm'>{item.description}</Text>
      </View>
    </Pressable>
  );
};

export default CategoryCard;
