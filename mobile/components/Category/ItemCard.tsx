import React from 'react';
import { Pressable, Text, View } from 'react-native';

const CategoryCard = ({
  isSelected,
  title,
  description,
  item,
  onPress,
}: {
  isSelected: boolean;
  item: any;
  title: string;
  description: string;
  onPress: (item: any) => void;
}) => {
  const handleOnPress = () => {
    onPress(item);
  };

  return (
    <Pressable onPress={handleOnPress}>
      <View
        className={`p-4 rounded-lg ${isSelected ? 'bg-primary' : 'bg-background-lighter'}`}
      >
        <Text
          className={`text-lg font-bold mb-2 ${isSelected ? 'text-white' : 'text-text-primary'}`}
        >
          {title}
        </Text>
        <Text
          className={`text-sm ${isSelected ? 'text-white' : 'text-text-secondary'}`}
        >
          {description}
        </Text>
      </View>
    </Pressable>
  );
};

export default CategoryCard;
