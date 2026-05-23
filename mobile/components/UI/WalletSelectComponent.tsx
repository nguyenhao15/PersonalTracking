import { useGetWallets } from '@/hooks/useWallets';
import { formatPrice } from '@/utils/formatValue';
import { WalletObject } from '@/validations/types';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import BaseModal from '../BaseModal';
import CardSelectList from '../CardSelectList';
import WalletForm from '../Wallet/WalletForm';
import LabelContainer from './LabelContainer';

interface WalletSelectComponentProps {
  label?: string;
  onSelectWallet: (wallet: any) => void;
  onBlur?: () => void;
  initialWallet: any;
  resetAction?: () => void;
  errorMessage?: string;
  throwCurrencyId?: (currencyId: string) => void;
}

const WalletSelectComponent = ({
  label = 'From Wallet',
  onSelectWallet,
  onBlur,
  initialWallet,
  resetAction,
  errorMessage,
  throwCurrencyId,
}: WalletSelectComponentProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [addingNewWallet, setAddingNewWallet] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  const { data, isLoading, error } = useGetWallets();

  const formatWallets = () => {
    if (!data) return [];
    return data.map((wallet: WalletObject) => ({
      titleField: wallet.walletName,
      descriptionField: `Balance: ${formatPrice(wallet.balance)}`,
      ...wallet,
    }));
  };

  useEffect(() => {
    const formattedWallets = formatWallets();
    const foundWallet = formattedWallets.find(
      (wallet: any) => wallet.id === initialWallet,
    );
    if (foundWallet) {
      setSelectedWallet(foundWallet);
      throwCurrencyId && throwCurrencyId(foundWallet.currency);
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
    throwCurrencyId && throwCurrencyId(wallet.currency);

    onBlur && onBlur();
    setOpenModal(false);
  };

  return (
    <View className='flex gap-2'>
      <LabelContainer
        isHasIcon
        iconColor='#588157'
        iconName='wallet'
        label={label}
        isRequired={true}
        errorMessage={errorMessage}
        onPress={() => setOpenModal(true)}
      >
        <Text
          className={`${selectedWallet ? 'font-bold text-text-primary' : 'text-text-secondary'} mt-2 self-start text-lg`}
        >
          {selectedWallet ? selectedWallet.titleField : 'Select a wallet...'}
        </Text>
      </LabelContainer>

      <BaseModal
        visible={openModal}
        onClose={() => {
          (setOpenModal(false), setAddingNewWallet(false));
        }}
      >
        {addingNewWallet && (
          <WalletForm backAction={() => setAddingNewWallet(false)} />
        )}
        {!addingNewWallet && (
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
              setAddingNewWallet(true);
            }}
          />
        )}
      </BaseModal>
    </View>
  );
};

export default WalletSelectComponent;
