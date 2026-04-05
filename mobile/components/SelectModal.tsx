import { useInitialForForm } from '@/hooks/useInitialForForm';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import BaseModal from './BaseModal';
import CardSelectList from './CardSelectList';

interface SelectModalProps {
  defaultValue?: any;
  modalTitle: string;
  isCardModalOpen: boolean;
  setCardModalOpen: (open: boolean) => void;
  onSelectItem: (item: any) => void;
  type: 'category' | 'wallet' | 'date' | 'description';
  transactionType: 'expense' | 'income';
}

const SelectModal = ({
  defaultValue,
  modalTitle = 'Select',
  isCardModalOpen,
  setCardModalOpen,
  onSelectItem,
  type,
  transactionType,
}: SelectModalProps) => {
  const [description, setDescription] = useState(
    defaultValue?.description || '',
  );

  const handleOnClose = () => {
    setCardModalOpen(false);
    setDescription(description || defaultValue?.description);
  };

  const { categories, wallets, isLoading, error } = useInitialForForm({
    type: transactionType,
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
      onClose={handleOnClose}
      title={modalTitle}
    >
      {type === 'description' ? (
        <View className='p-4 items-center '>
          <TextInput
            className='w-full p-2 mb-4 rounded text-top'
            placeholder='Enter description...'
            returnKeyType='done'
            value={description}
            onChangeText={setDescription}
            returnKeyLabel='Xác nhận'
            autoFocus
            onSubmitEditing={(e) => {
              e.preventDefault();
              onSelectItem(e);
              setCardModalOpen(false);
            }}
          />
        </View>
      ) : type === 'date' ? (
        <View className=' items-center mt-2 h-fit rounded-md bg-slate-200'>
          <DateTimePicker
            value={
              defaultValue?.date ? new Date(defaultValue.date) : new Date()
            }
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
          type={transactionType}
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
