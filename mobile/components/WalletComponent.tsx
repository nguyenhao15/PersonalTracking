import { formatPrice, safeString, toArray } from '@/utils/formatValue';
import React from 'react';
import { Text, View } from 'react-native';

interface WalletComponentProps {
  wallets: unknown;
}

interface WalletItem {
  id?: string | number;
  walletName?: string;
  name?: string;
  balance?: number;
  amount?: number;
  totalBalance?: number;
}

const WalletComponent = ({ wallets }: WalletComponentProps) => {
  const walletList = toArray<WalletItem>(wallets);

  if (walletList.length === 0) {
    return (
      <View className='px-6 pb-4'>
        <View className='bg-surface rounded-2xl p-4'>
          <Text className='text-text-secondary text-sm'>No wallet found.</Text>
        </View>
      </View>
    );
  }

  return (
    <View className='px-6 pb-4'>
      <Text className='text-text-primary text-lg font-semibold mb-3'>
        Wallet list
      </Text>

      <View className='bg-surface rounded-2xl overflow-hidden'>
        {walletList.map((wallet, index) => {
          const walletName = safeString(wallet.walletName ?? wallet.name);
          const balanceValue =
            wallet.balance ?? wallet.totalBalance ?? wallet.amount ?? 0;
          return (
            <View
              key={String(wallet.id ?? `${walletName}-${index}`)}
              className='px-4 py-4 border-b border-background-light last:border-b-0 flex-row justify-between items-center'
            >
              <Text className='text-text-primary text-base font-medium'>
                {walletName}
              </Text>
              <Text className='text-text-secondary font-bold text-sm mt-1'>
                {formatPrice(Number(balanceValue))}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default WalletComponent;
