import { View, Text } from 'react-native';
import React from 'react';
import BaseModal from './BaseModal';
import { useInitialForForm } from '@/hooks/useInitialForForm';
import CardSelectList from './CardSelectList';
import DateTimePicker from '@react-native-community/datetimepicker';

interface SelectModalProps {
  modalTitle: string;
  isCardModalOpen: boolean;
  setCardModalOpen: (open: boolean) => void;
  onSelectItem: (item: any) => void;
  type: 'category' | 'wallet' | 'date';
}

const SelectModal = ({
  modalTitle = 'Select',
  isCardModalOpen,
  setCardModalOpen,
  onSelectItem,
  type,
}: SelectModalProps) => {
  const { categories, wallets, isLoading, error } = useInitialForForm({
    type: type === 'category' ? 'expense' : 'income',
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
      {type === 'date' ? (
        <View className=' items-center mt-2 h-fit rounded-md bg-slate-200'>
          <DateTimePicker
            value={new Date()}
            onValueChange={(event, selectedDate) => {
              if (selectedDate) {
                onSelectItem(selectedDate);
              }
            }}
            mode='date'
            className='text-white'
            display='inline'
          />
        </View>
      ) : (
        <CardSelectList
          type={type === 'category' ? 'expense' : 'income'}
          data={returnArray()}
          placeholder={`Search ${type === 'category' ? 'categories' : 'wallets'}...`}
          onSelect={(item) => {
            onSelectItem(item);
            setCardModalOpen(false);
          }}
          isLoading={isLoading}
          error={error}
        />
      )}
    </BaseModal>
  );
};

export default SelectModal;
