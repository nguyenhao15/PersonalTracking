import { formatPrice, safeString, toArray } from '@/utils/formatValue';
import { WalletObject } from '@/validations/types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface WalletComponentProps {
  wallets: WalletObject[] | undefined;
}
const WalletComponent = ({ wallets }: WalletComponentProps) => {
  const walletList = toArray<WalletObject>(wallets);

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
    <View className='bg-surface rounded-2xl py-4 mx-6 px-6 pb-4'>
      <View className='flex flex-row justify-between p-2'>
        <Text className='text-text-primary text-lg font-semibold mb-3'>
          Wallet list
        </Text>
        <TouchableOpacity>
          <Text className='text-primary items-center justify-items-center my-auto text-sm font-medium'>
            See all
          </Text>
        </TouchableOpacity>
      </View>

      <View className='border border-slate-950 rounded-md overflow-hidden'>
        {walletList.map((wallet, index) => {
          const walletName = safeString(wallet.walletName);
          const balanceValue = wallet.balance;
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
