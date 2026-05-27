import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGetDebts } from '@/hooks/useDebt';
import { toArray } from '@/utils/formatValue';
import { LoanSummary } from './LoanSummary';
import { LoanFilterTabs, FilterType } from './LoanFilterTabs';
import { LoanItemCard } from './LoanItemCard';

// ====================================================
// 5. Main Parent Component: LoanList
// Gathers summaries, slide filters, and maps cards
// ====================================================
export const LoanList = () => {
  const { data: debts, isLoading, error } = useGetDebts();
  const [filter, setFilter] = useState<FilterType>('all');

  const debtList = useMemo(() => toArray<any>(debts), [debts]);

  const filteredDebts = useMemo(() => {
    return debtList.filter((debt) => {
      if (filter === 'all') return true;
      if (filter === 'borrow')
        return (
          debt.type === 'borrow' &&
          debt.status !== 'paid' &&
          debt.status !== 'cancelled'
        );
      if (filter === 'lend')
        return (
          debt.type === 'lend' &&
          debt.status !== 'paid' &&
          debt.status !== 'cancelled'
        );
      if (filter === 'paid') return debt.status === 'paid';
      return true;
    });
  }, [debtList, filter]);

  if (isLoading) {
    return (
      <View className='flex-1 py-10 justify-center items-center'>
        <ActivityIndicator size='large' color='#588157' />
        <Text className='text-text-secondary text-sm mt-3 font-semibold'>
          Fetching your debts...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className='p-6 items-center justify-center my-auto'>
        <Ionicons name='alert-circle' size={48} color='#ef4444' />
        <Text className='text-text-primary text-base font-bold mt-3 mb-1'>
          Failed to load debts
        </Text>
        <Text className='text-text-secondary text-xs text-center leading-relaxed'>
          {error?.message || 'An unknown network error occurred.'}
        </Text>
      </View>
    );
  }

  return (
    <View className='flex-1 px-4'>
      <LoanSummary debts={debtList} />
      <LoanFilterTabs activeFilter={filter} onChangeFilter={setFilter} />

      <FlatList
        data={filteredDebts}
        keyExtractor={(item, index) => String(item.id || `debt-${index}`)}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View className='h-1' />}
        ListEmptyComponent={() => (
          <View className='bg-surface rounded-2xl border border-white/5 p-8 items-center justify-center mt-2'>
            <Ionicons name='receipt-outline' size={40} color='#888' />
            <Text className='text-text-secondary text-sm mt-3 font-semibold text-center'>
              No debts logged for this filter.
            </Text>
          </View>
        )}
        renderItem={({ item }) => <LoanItemCard debt={item} />}
      />
    </View>
  );
};

export default LoanList;
