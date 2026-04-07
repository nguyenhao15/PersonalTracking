import { TAB_ITEMS } from '@/const/app.const';
import { BlurView } from 'expo-blur';
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
    <View className='flex-row py-2  rounded-lg p-1'>
      <BlurView
        intensity={50}
        tint='dark'
        className='flex-row rounded-lg p-1 w-full'
      >
        {TAB_ITEMS.map((tab) => {
          const active = value === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              className={`flex-1 px-2 py-2 rounded-md ${active ? 'bg-surface-light' : 'bg-transparent'}`}
              onPress={() => onChange(tab.key)}
            >
              <Text
                className={`text-center text-xs font-semibold ${active ? 'text-white' : 'text-text-primary'}`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
};

export default TabChoices;
