import { formatPrice } from '@/utils/formatValue';
import React from 'react';
import { Text, View } from 'react-native';

interface BalanceCardProps {
  data: number;
  title?: string;
  subtitle?: string;
  currency?: string;
}

const BalanceCard = ({
  data,
  title = 'Total balance',
  subtitle = 'Available to spend',
  currency = 'VND',
}: BalanceCardProps) => {
  const amount = Number(data ?? 0);

  return (
    <View className='px-6 pb-4'>
      <View className='bg-primary rounded-3xl p-5 overflow-hidden'>
        <View className='absolute -right-12 -top-10 h-40 w-40 rounded-full bg-primary-light/30' />
        <View className='absolute -left-16 -bottom-20 h-44 w-44 rounded-full bg-background/20' />

        <Text className='text-text-primary/90 text-sm font-medium'>
          {title}
        </Text>
        <Text className='text-text-primary text-3xl font-bold mt-2'>
          {formatPrice(amount, currency)}
        </Text>
        <Text className='text-text-primary/80 text-xs mt-2'>{subtitle}</Text>
      </View>
    </View>
  );
};

export default BalanceCard;
