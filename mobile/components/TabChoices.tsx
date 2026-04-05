import { TAB_ITEMS } from '@/const/app.const';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const TabChoices = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (key: string) => void;
}) => {
  return (
    <View className='flex-row py-2 bg-gray-100 rounded-lg p-1'>
      {TAB_ITEMS.map((tab) => {
        const active = value === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            className={`flex-1 px-2 py-2 rounded-md ${active ? 'bg-blue-500' : 'bg-transparent'}`}
            onPress={() => onChange(tab.key)}
          >
            <Text
              className={`text-center text-xs font-semibold ${active ? 'text-white' : 'text-gray-700'}`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabChoices;
