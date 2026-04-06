import React from 'react';
import { TextInput } from 'react-native';
import LabelContainer from './LabelContainer';

interface InputInlineComponentProps {
  label: string;
  iconName: string;
  iconColor: string;
  isRequired?: boolean;
  placeholder?: string;
  value: string | number;
  onChange: (text: string) => void;
  onBlur: () => void;
  errorMessage?: string;
}

const InputInlineComponent = ({
  label,
  iconName,
  iconColor,
  isRequired,
  placeholder,
  value,
  onChange,
  onBlur,
  errorMessage,
}: InputInlineComponentProps) => {
  return (
    <LabelContainer
      isHasIcon
      iconColor={iconColor}
      iconName={iconName}
      label={label}
      errorMessage={errorMessage}
      onPress={() => null}
    >
      <TextInput
        className='w-full mt-2 text-lg font-bold text-black'
        keyboardType='numeric'
        placeholder={placeholder}
        value={value ? String(value) : ''}
        onBlur={onBlur}
        onChangeText={onChange}
      />
    </LabelContainer>
  );
};

export default InputInlineComponent;
