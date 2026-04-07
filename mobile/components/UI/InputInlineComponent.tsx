import { formatThousands } from '@/utils/formatValue';
import React from 'react';
import { Controller } from 'react-hook-form';
import { TextInput } from 'react-native';
import LabelContainer from './LabelContainer';

interface InputInlineComponentProps {
  label: string;
  iconName?: string;
  iconColor?: string;
  isRequired?: boolean;
  placeholder?: string;
  value?: string | number;
  onChange?: (text?: string) => void;
  onBlur?: () => void;
  errorMessage?: string;
  control?: any;
  name?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  isMultiline?: boolean;
  isLoading: boolean;
  isDisabled: boolean;
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
  control,
  name,
  keyboardType = 'default',
  isLoading,
  isDisabled,
}: InputInlineComponentProps) => {
  const normalizeInputValue = (inputValue?: string | number) => {
    if (inputValue === null || inputValue === undefined) {
      return '';
    }
    return String(inputValue);
  };

  const renderInput = ({
    fieldChange,
    fieldValue,
    fieldBlur,
    ...rest
  }: {
    fieldChange: (text: string) => void;
    fieldValue: string | number;
    fieldBlur: () => void;
  }) => {
    const handleOnChangeText = (text: string) => {
      fieldChange(text);
    };

    return (
      <TextInput
        editable={!isDisabled && !isLoading}
        selectTextOnFocus={!isDisabled && !isLoading}
        multiline={isMultiline}
        className={`w-full py-3 self-center text-xl ${isMultiline ? 'h-32' : ''} text-text-primary font-bold border-b-2 ${isLoading || isDisabled ? 'opacity-50 border-b-transparent' : errorMessage ? 'border-red-500' : 'border-gray-300'}`}
        keyboardType={keyboardType}
        placeholder={placeholder}
        value={formatThousands(fieldValue)}
        placeholderTextColor={'#9ca3af'}
        onBlur={fieldBlur}
        onSubmitEditing={fieldBlur}
        onChangeText={handleOnChangeText}
        {...rest}
      />
    );
  };

  return (
    <LabelContainer
      isLoading={isLoading}
      isHasIcon={!!iconName}
      iconColor={iconColor}
      iconName={iconName}
      isRequired={isRequired}
      label={label}
      errorMessage={errorMessage}
    >
      {control && name ? (
        <Controller
          control={control}
          name={name}
          render={({
            field: {
              onChange: fieldChange,
              onBlur: fieldBlur,
              value: fieldValue,
              ...rest
            },
          }) => renderInput({ fieldChange, fieldValue, fieldBlur, ...rest })}
        />
      ) : (
        renderInput({
          fieldChange: onChange || (() => {}),
          fieldValue: normalizeInputValue(value),
          fieldBlur: onBlur || (() => {}),
        })
      )}
    </LabelContainer>
  );
};

export default InputInlineComponent;
