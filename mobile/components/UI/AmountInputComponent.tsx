import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

interface AmountInputComponentProps {
  onChange: (text: string) => void;
  onBlur: () => void;
}

const AmountInputComponent = ({
  onChange,
  onBlur,
}: AmountInputComponentProps) => {
  const [isCardModalOpen, setCardModalOpen] = useState(false);

  const handleOpenCardModal = (title: string) => {
    setCardModalOpen(true);
  };

  return (
    <View className='mb-10 gap-4 h-32 items-center justify-between'>
      <TouchableOpacity
        onPress={() => handleOpenCardModal('Choose currency')}
        className='self-start items-center justify-center mx-auto mb-1 px-3 py-2 bg-gray-200 rounded-md'
      >
        <Text className='font-bold'>VND</Text>
      </TouchableOpacity>

      <TextInput
        style={{
          width: '100%',
          fontSize: 30,
          textAlign: 'center',
          padding: 20,
          borderBottomWidth: 1,
          borderColor: '#ccc',
          marginBottom: 10,
        }}
        keyboardType='numeric'
        placeholder='0'
        onChangeText={onChange}
        onBlur={onBlur}
      />
    </View>
  );
};

export default AmountInputComponent;
