import { View, Text } from 'react-native';
import React from 'react';
import BaseModal from './BaseModal';
import { useInitialForForm } from '@/hooks/useInitialForForm';
import CardSelectList from './CardSelectList';

interface SelectModalProps {
  modalTitle: string;
  isCardModalOpen: boolean;
  setCardModalOpen: (open: boolean) => void;
  type: 'category' | 'wallet' | 'date';
}

const SelectModal = ({
  modalTitle = 'Select',
  isCardModalOpen,
  setCardModalOpen,
  type,
}: SelectModalProps) => {
  const { categories, wallets, isLoading, error } = useInitialForForm({
    type: type === 'category' ? 'EXPENSE' : 'INCOME',
  });

  const returnArray = () => {
    if (type === 'category') {
      return categories;
    } else if (type === 'wallet') {
      return wallets;
    }
    return [];
  };

  return (
    <BaseModal
      visible={isCardModalOpen}
      onClose={() => setCardModalOpen(false)}
      title={modalTitle}
    >
      <CardSelectList
        type={type === 'category' ? 'EXPENSE' : 'INCOME'}
        data={returnArray()}
        placeholder={`Search ${type === 'category' ? 'categories' : 'wallets'}...`}
        onSelect={(item) => {
          console.log('Selected item:', item);
          setCardModalOpen(false);
        }}
        isLoading={isLoading}
        error={error}
      />
    </BaseModal>
  );
};

export default SelectModal;
