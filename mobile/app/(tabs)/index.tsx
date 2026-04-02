import BalanceCard from '@/components/BalanceCard';
import ErrorPage from '@/components/ErrorPage';
import LoadingPage from '@/components/LoadingPage';
import SafeScreen from '@/components/SafeScreen';
import TransactionComponent from '@/components/TransactionComponent';
import WalletComponent from '@/components/WalletComponent';
import { useLogOut } from '@/hooks/useAuthentication';
import { useInitialData } from '@/hooks/useInitialData';
import { useAuthStore } from '@/stores/AuthStores';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Home = () => {
  const { userInfo, accessToken, isHydrated } = useAuthStore();

  const { transactions, wallet, walletBalance, isLoading, error } =
    useInitialData();
  const { mutate: logout } = useLogOut();
  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return <LoadingPage message='Loading expenses...' />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <SafeScreen>
      <ScrollView
        className='flex-1'
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className='px-6 pb-2 pt-6'>
          <View className={`flex-row items-center justify-between mb-6`}>
            <View className=''>
              <Text className='text-text-primary text-3xl font-bold tracking-tight'>
                {userInfo?.fullName || 'Hello, User!'}
              </Text>
              <Text className='text-text-secondary text-sm mt-1'>
                Your expenses overview
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleLogout}
              className='bg-surface/50 p-3 rounded-full'
              activeOpacity={0.4}
            >
              <Ionicons name='log-out-outline' size={22} color='#fff' />
            </TouchableOpacity>
          </View>
        </View>

        <BalanceCard data={walletBalance} />
        <WalletComponent wallets={wallet.slice(0, 2)} />
        <TransactionComponent transactions={transactions} />
      </ScrollView>
    </SafeScreen>
  );
};

export default Home;
