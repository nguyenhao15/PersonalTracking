import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DatePickerInput from './DatePickerInput';
import FormInput from './FormInput';

interface CardInputComponentProps {
  label: string;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  value?: string | Date;
  control?: any; // Add control prop for react-hook-form
  onChange?: (value: string) => void;
  inputType: 'text' | 'date' | 'number';
}

const CardInputComponent = ({
  label,
  placeholder,
  errorMessage,
  name,
  minimumDate,
  maximumDate,
  value,
  onChange,
  control,
  inputType,
}: CardInputComponentProps) => {
  return (
    <View style={styles.container} className='flex gap-2'>
      <Text style={styles.label}>{label}</Text>
      {inputType === 'date' ? (
        <DatePickerInput
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          control={control}
          name={name}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          style={[styles.input, errorMessage && styles.inputError]}
        />
      ) : (
        <FormInput
          placeholder={placeholder}
          control={control}
          name={name}
          keyboardType={inputType === 'number' ? 'numeric' : 'default'}
        />
      )}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 15, flexDirection: 'row', alignItems: 'center' },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#111827',
    fontSize: 20,
    paddingLeft: 4,
  },
  input: {
    borderWidth: 1,
    width: '100%',
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  inputError: { borderColor: 'red' },
  valueText: { color: '#111827', fontSize: 16 },
  placeholderText: { color: '#9ca3af', fontSize: 16 },
  errorText: { color: 'red', fontSize: 12, marginTop: 4 },
});

export default CardInputComponent;
