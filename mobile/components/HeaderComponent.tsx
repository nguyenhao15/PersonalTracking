import React from 'react';
import { Text, View } from 'react-native';

const HeaderComponent = ({ title }: { title: string }) => {
  return (
    <View>
      <Text className='text-white font-bold'>{title}</Text>
    </View>
  );
};

export default HeaderComponent;
