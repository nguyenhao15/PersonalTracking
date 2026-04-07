import { useGetWallets } from '@/hooks/useWallets';
import { formatPrice } from '@/utils/formatValue';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import BaseModal from '../BaseModal';
import CardSelectList from '../CardSelectList';
import LabelContainer from './LabelContainer';

interface WalletSelectComponentProps {
  onSelectWallet: (wallet: any) => void;
  onBlur?: () => void;
  initialWallet: any;
  resetAction?: () => void;
  errorMessage?: string;
}

const WalletSelectComponent = ({
  onSelectWallet,
  onBlur,
  initialWallet,
  resetAction,
  errorMessage,
}: WalletSelectComponentProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  const { data, isLoading, error } = useGetWallets();

  const formatWallets = () => {
    if (!data) return [];
    return data.map((wallet: any) => ({
      id: wallet.id,
      titleField: wallet.walletName,
      descriptionField: `Balance: ${formatPrice(wallet.balance)}`,
    }));
  };

  useEffect(() => {
    const formattedWallets = formatWallets();
    const foundWallet = formattedWallets.find(
      (wallet: any) => wallet.id === initialWallet,
    );
    if (foundWallet) {
      setSelectedWallet(foundWallet);
    } else {
      setSelectedWallet(null);
    }
  }, [initialWallet]);

  useEffect(() => {
    setSelectedWallet(null);
  }, [resetAction]);

  const handleSelectWallet = (wallet: any) => {
    setSelectedWallet(wallet);
    onSelectWallet && onSelectWallet(wallet.id);
    onBlur && onBlur();
    setOpenModal(false);
  };

  return (
    <View className='flex gap-2'>
      <LabelContainer
        isHasIcon
        iconColor='black'
        iconName='wallet'
        label='Wallet'
        isRequired={true}
        errorMessage={errorMessage}
        onPress={() => setOpenModal(true)}
      >
        <Text
          className={`${selectedWallet ? 'font-bold text-black ' : 'text-gray-500'} mt-2 self-start text-lg`}
        >
          {selectedWallet ? selectedWallet.titleField : 'Select a wallet...'}
        </Text>
      </LabelContainer>
      <BaseModal visible={openModal} onClose={() => setOpenModal(false)}>
        <CardSelectList
          data={formatWallets()}
          isLoading={isLoading}
          error={error}
          selectedItem={selectedWallet?.id}
          placeholder='Select a wallet...'
          onSelect={handleSelectWallet}
          canAddNewItem={true}
          addLabel='Add New Wallet'
          addBehavior={() => {
            // Handle add new wallet behavior here
            setOpenModal(false);
          }}
        />
      </BaseModal>
    </View>
  );
};

export default WalletSelectComponent;
