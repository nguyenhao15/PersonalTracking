import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import BaseModal from './BaseModal';
import LabelContainer from './UI/LabelContainer';

interface TextInputComponentProps {
  label: string;
  iconName: string;
  iconColor: string;
  isRequired?: boolean;
  placeholder?: string;
  onChangeAction: (text: string) => void;
  initialValue?: string;
  onResetAction?: () => void;
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
}: TextInputComponentProps) => {
  const [content, setContent] = useState(initialValue || '');
  const [openModal, setOpenModal] = useState(false);

  const handleOnChangeAction = (text: string) => {
    setContent(text);
    onChangeAction && onChangeAction(text);
    setOpenModal(false);
  };

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
      >
        <Text
          className={`${content ? 'font-bold text-black ' : 'text-gray-500'} mt-2 self-start text-lg`}
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
          className='w-full p-2 my-4 rounded'
          placeholder={placeholder || 'Enter text...'}
          value={content}
          onChangeText={setContent}
          returnKeyType='done'
          autoFocus
          returnKeyLabel='Done'
          onSubmitEditing={() => handleOnChangeAction(content)}
        />
      </BaseModal>
    </View>
  );
};

export default InputWithModalComponent;
