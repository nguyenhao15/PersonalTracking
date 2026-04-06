import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import BaseModal from './BaseModal';
import LabelContainer from './UI/LabelContainer';

const DescriptionInputComponent = () => {
  const [description, setDescription] = useState('');
  const [openModal, setOpenModal] = useState(false);
  return (
    <View className='flex gap-2'>
      <LabelContainer
        isHasIcon
        iconColor='black'
        iconName='document-text'
        label='Description'
        isRequired={true}
        onPress={() => setOpenModal(true)}
      >
        <Text
          className={`${description ? 'font-bold text-black ' : 'text-gray-500'} mt-2 self-start text-lg`}
        >
          {description ? description : 'Enter a description...'}
        </Text>
      </LabelContainer>
      <BaseModal visible={openModal} onClose={() => setOpenModal(false)}>
        <TextInput
          className='w-full p-2 mb-4 border rounded'
          placeholder='Enter description...'
          value={description}
          onChangeText={setDescription}
        />
      </BaseModal>
    </View>
  );
};

export default DescriptionInputComponent;
