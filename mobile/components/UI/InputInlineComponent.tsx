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
  control,
  name,
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
  }) => (
    <TextInput
      className='w-full my-2 p-2 font-bold text-black'
      keyboardType='numeric'
      placeholder={placeholder}
      value={normalizeInputValue(fieldValue)}
      onBlur={fieldBlur}
      onChangeText={fieldChange}
      {...rest}
    />
  );

  return (
    <LabelContainer
      isHasIcon
      iconColor={iconColor}
      iconName={iconName}
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
