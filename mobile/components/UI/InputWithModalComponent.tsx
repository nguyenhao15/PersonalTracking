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
  control?: any;
  name?: string;
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
  control,
  name,
  errorMessage,
}: TextInputComponentProps) => {
  const [content, setContent] = useState(initialValue || '');
  const [openModal, setOpenModal] = useState(false);

  const handleOnChangeAction = (text: string) => {
    setContent(text);
    setOpenModal(false);
  };

  useEffect(() => {
    if (onResetAction) {
      onResetAction();
      setContent('');
    }
  }, [onResetAction]);

  const renderInput = ({
    fieldChange,
    fieldValue,
    fieldBlur,
    ...rest
  }: {
    fieldChange: (text: string) => void;
    fieldValue: string;
    fieldBlur: () => void;
  }) => {
    const handleOnChangeText = (text: string) => {
      fieldChange(text);
      setOpenModal(false);
    };
    return (
      <TextInput
        className='w-full p-2 my-4 rounded text-text-primary'
        placeholder={placeholder || 'Enter text...'}
        value={content}
        onChangeText={setContent}
        returnKeyType='done'
        autoFocus
        returnKeyLabel='Done'
        onSubmitEditing={() => handleOnChangeText(content)}
        onBlur={fieldBlur}
        {...rest}
      />
    );
  };

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
          className={`${content ? 'font-bold text-text-secondary ' : 'text-text-primary'} mt-2 self-start text-lg`}
        >
          {content ? content : placeholder || 'Enter text...'}
        </Text>
      </LabelContainer>
      <BaseModal
        title={label}
        visible={openModal}
        onClose={() => setOpenModal(false)}
      >
        {control && name ? (
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value, ...field } }) =>
              renderInput({
                fieldChange: onChange,
                fieldValue: value,
                fieldBlur: onBlur,
                ...field,
              })
            }
          />
        ) : (
          renderInput({
            fieldChange: handleOnChangeAction,
            fieldValue: content,
            fieldBlur: () => {},
          })
        )}
      </BaseModal>
    </View>
  );
};

export default InputWithModalComponent;
