import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface FormInputProps {
  control: any; // Thay 'any' bằng kiểu chính xác nếu có thể
  name: string;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const FormInput = ({
  control,
  name,
  placeholder,
  keyboardType = 'default',
}: FormInputProps) => {
  return (
    <View style={styles.container} className='flex gap-2'>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value, ...rest },
          fieldState: { error },
        }) => (
          <View>
            <TextInput
              {...rest}
              style={[styles.input, error && styles.inputError]}
              onChangeText={onChange}
              value={value}
              keyboardType={keyboardType}
              placeholder={placeholder}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  label: { marginBottom: 5, fontWeight: 'bold', color: '#333', fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  inputError: { borderColor: 'red' },
  errorText: { color: 'red', fontSize: 12, marginTop: 4 },
});

export default FormInput;
