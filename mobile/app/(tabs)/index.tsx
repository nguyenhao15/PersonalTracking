import ErrorPage from '@/components/ErrorPage';
import LoadingPage from '@/components/LoadingPage';
import SafeScreen from '@/components/SafeScreen';
import WalletComponent from '@/components/WalletComponent';
import { useLogOut } from '@/hooks/useAuthentication';
import { useInitialData } from '@/hooks/useInitialData';
import { formatPrice } from '@/utils/formatValue';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Home = () => {
  const { expenses, wallet, walletBalance, isLoading, error } =
    useInitialData();
  const { mutate: logout } = useLogOut();
  const handleLogout = () => {
    logout();
  };

  const [searchQuery, setSearchQuery] = useState('');

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
        <View className='px-6 pb-4 pt-6'>
          <View className={`flex-row items-center justify-between mb-6`}>
            <View>
              <Text className='text-text-primary text-3xl font-bold tracking-tight'>
                {`${formatPrice(walletBalance)}`}
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

          <View className='bg-surface flex-row items-center px-5 py-4 rounded-2xl'>
            <Ionicons name='wallet-outline' size={24} color='#fff' />
            <TextInput
              className='flex-1 ml-3 text-base text-text-primary'
              placeholder='Enter amount'
              placeholderTextColor='#666'
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <WalletComponent wallets={wallet} />
      </ScrollView>
    </SafeScreen>
  );
};

export default Home;
