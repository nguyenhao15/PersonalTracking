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
    <View>
      <BlurView
        intensity={30}
        tint='dark'
        className='flex-row p-1.5 w-full bg-background-light/30 border border-white/5'
      >
        {TAB_ITEMS.map((tab) => {
          const active = value === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              className={`flex-1 py-3 rounded-full items-center justify-center ${
                active ? 'bg-primary' : ''
              }`}
              onPress={() => onChange(tab.key)}
              activeOpacity={0.85}
            >
              <Text
                className={`text-center text-xs font-bold tracking-wider ${
                  active ? 'text-white' : 'text-text-secondary'
                }`}
              >
                {tab.label.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
};

export default TabChoices;
