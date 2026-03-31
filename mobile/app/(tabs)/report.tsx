import SafeScreen from '@/components/SafeScreen';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

const ReportScreen = () => {
  return (
    <SafeScreen>
      <ScrollView
        className='flex-1'
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className='px-6 pb-4 pt-6'>
          <Text className='text-2xl font-bold mb-4 text-white'>
            ReportScreen
          </Text>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default ReportScreen;
