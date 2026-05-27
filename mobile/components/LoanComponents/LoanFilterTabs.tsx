import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export type FilterType = 'all' | 'borrow' | 'lend' | 'paid';

interface LoanFilterTabsProps {
  activeFilter: FilterType;
  onChangeFilter: (filter: FilterType) => void;
}

export const LoanFilterTabs = ({
  activeFilter,
  onChangeFilter,
}: LoanFilterTabsProps) => {
  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'borrow', label: 'Payable' },
    { key: 'lend', label: 'Receivable' },
    { key: 'paid', label: 'Paid' },
  ] as const;

  return (
    <View className='flex-row bg-background-light/30 border border-white/5 rounded-full p-1 mb-5'>
      {tabs.map((tab) => {
        const isActive = activeFilter === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onChangeFilter(tab.key)}
            className={`flex-1 py-2.5 rounded-full items-center justify-center ${
              isActive ? 'bg-primary' : ''
            }`}
            activeOpacity={0.8}
          >
            <Text
              className={`text-xs font-bold tracking-wider ${
                isActive ? 'text-white' : 'text-text-secondary'
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default LoanFilterTabs;
