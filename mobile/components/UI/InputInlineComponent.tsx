import { formatThousands } from '@/utils/formatValue';
import React from 'react';
import { TextInput } from 'react-native';
import LabelContainer from './LabelContainer';

interface InputInlineComponentProps {
  label: string;
  iconName?: string;
  iconColor?: string;
  isRequired?: boolean;
  placeholder?: string;
  value: any;
  onChange?: (text?: string) => void;
  onBlur?: () => void;
  errorMessage?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  isMultiline?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const InputInlineComponent = ({
  label,
  iconName,
  iconColor,
  isMultiline = false,
  isRequired,
  placeholder,
  value,
  onChange,
  onBlur,
  errorMessage,
  keyboardType = 'default',
  isLoading,
  isDisabled,
}: InputInlineComponentProps) => {
  return (
    <LabelContainer
      isLoading={isLoading}
      isHasIcon={!!iconName}
      iconColor={iconColor}
      iconName={iconName}
      isRequired={isRequired}
      label={label}
      errorMessage={errorMessage}
      onBlur={onBlur}
    >
      <TextInput
        editable={!isDisabled && !isLoading}
        selectTextOnFocus={!isDisabled && !isLoading}
        multiline={isMultiline}
        className='text-text-primary font-bold'
        style={{
          width: '100%',
          paddingVertical: 12,
          alignSelf: 'center',
          fontSize: 20,
          lineHeight: 23,
          fontWeight: 'bold',
          borderBottomWidth: 2,
          borderBottomColor:
            isLoading || isDisabled
              ? 'rgba(156, 163, 175, 0.5)'
              : errorMessage
                ? '#ef4444'
                : '#d1d5db',
          height: isMultiline ? 128 : undefined,
          opacity: isLoading || isDisabled ? 0.5 : 1,
        }}
        keyboardType={keyboardType}
        placeholder={placeholder}
        value={value}
        placeholderTextColor={'#9ca3af'}
        onBlur={onBlur}
        onChangeText={onChange}
      />
    </LabelContainer>
  );
};

export default InputInlineComponent;
