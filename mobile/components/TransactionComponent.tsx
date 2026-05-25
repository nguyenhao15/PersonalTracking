import {
  formatDate,
  formatPrice,
  safeString,
  toArray,
} from '@/utils/formatValue';
import { TransactionObject } from '@/validations/types';
import { FlatList, Text, View } from 'react-native';
interface TransactionComponentProps {
  transactions?: TransactionObject[] | null;
}

const TransactionComponent = ({ transactions }: TransactionComponentProps) => {
  const transactionList = toArray<TransactionObject>(transactions);

  if (transactionList.length === 0) {
    return (
      <View className='px-6 pb-4'>
        <View className='bg-surface rounded-2xl p-4'>
          <Text className='text-text-secondary text-sm'>
            No transactions found.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className='px-6 pb-4'>
      <Text className='text-text-primary text-lg font-semibold mb-3'>
        Recent transactions
      </Text>

      <View className='bg-surface rounded-2xl overflow-hidden'>
        <FlatList
          data={transactionList}
          scrollEnabled={false}
          keyExtractor={(item, index) => String(item.id ?? `tx-${index}`)}
          ItemSeparatorComponent={() => (
            <View className='h-px bg-background-light mx-4' />
          )}
          renderItem={({ item }) => {
            const transactionType = item.transactionType;

            return (
              <View className='px-4 py-4'>
                <View className='flex-row items-start justify-between'>
                  <Text className='text-text-primary  text-base font-medium flex-1 pr-3'>
                    {safeString(item.category?.name, 'No description')}
                  </Text>
                  <Text
                    style={{
                      color:
                        transactionType === 'expense' ? '#ef4444' : '#22c55e',
                    }}
                    className='font-bold text-sm mt-1'
                  >
                    {formatPrice(Number(item.originalAmount ?? 0))}
                  </Text>
                </View>

                <Text className='text-text-secondary text-xs mt-1'>
                  {formatDate(item.date ?? '')}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default TransactionComponent;
