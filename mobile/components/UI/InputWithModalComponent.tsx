import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import BaseModal from '../BaseModal';
import LabelContainer from './LabelContainer';

interface TextInputComponentProps {
  label: string;
  iconName: string;
  iconColor: string;
  isRequired?: boolean;
  placeholder?: string;
  onChangeAction: (text: string) => void;
  initialValue?: string;
  onResetAction?: () => void;
  errorMessage?: string;
}

const InputWithModalComponent = ({
  label,
  iconName,
  iconColor,
  isRequired,
  placeholder,
  onChangeAction,
  initialValue,
  onResetAction,
  errorMessage,
}: TextInputComponentProps) => {
  const [content, setContent] = useState(initialValue || '');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (onResetAction) {
      onResetAction();
      setContent('');
    }
  }, [onResetAction]);

  return (
    <View className='flex gap-2'>
      <LabelContainer
        isHasIcon={!!iconName}
        iconColor={iconColor}
        iconName={iconName}
        label={label}
        isRequired={isRequired}
        onPress={() => setOpenModal(true)}
        errorMessage={errorMessage}
      >
        <Text
          className={`${content ? 'font-bold text-text-primary' : 'text-text-secondary'} mt-2 self-start text-lg`}
        >
          {content ? content : placeholder || 'Enter text...'}
        </Text>
      </LabelContainer>
      <BaseModal
        title={label}
        visible={openModal}
        onClose={() => setOpenModal(false)}
      >
        <TextInput
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            lineHeight: 25,
            color: '#588157',
          }}
          placeholder={placeholder || 'Enter text...'}
          placeholderClassName='text-black'
          value={content}
          onChangeText={setContent}
          returnKeyType='done'
          autoFocus
          returnKeyLabel='Done'
          onSubmitEditing={() => onChangeAction(content)}
        />
      </BaseModal>
    </View>
  );
};

export default InputWithModalComponent;
