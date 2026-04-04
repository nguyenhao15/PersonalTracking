import { View, Text, Pressable } from 'react-native';
import React from 'react';

const CategoryCard = ({
  isSelected,
  item,
  onPress,
}: {
  isSelected: boolean;
  item: any;
  onPress: (item: any) => void;
}) => {
  const handleOnPress = () => {
    onPress(item);
  };

  return (
    <Pressable onPress={handleOnPress}>
      <View
        className={`p-4 rounded-lg shadow-md ${isSelected ? 'bg-blue-500' : 'bg-white'}`}
      >
        <Text
          className={`text-lg font-bold mb-2 ${isSelected ? 'text-white' : 'text-black'}`}
        >
          {item.name}
        </Text>
        <Text
          className={`text-sm ${isSelected ? 'text-white' : 'text-gray-500'}`}
        >
          {item.description}
        </Text>
      </View>
    </Pressable>
  );
};

export default CategoryCard;
