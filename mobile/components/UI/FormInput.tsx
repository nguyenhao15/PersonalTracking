import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface FormInputProps {
  control: any; // Thay 'any' bằng kiểu chính xác nếu có thể
  name: string;
  placeholder?: string;
  label: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const FormInput = ({
  control,
  name,
  placeholder,
  label,
  keyboardType = 'default',
}: FormInputProps) => {
  return (
    <View style={styles.container} className='flex gap-2'>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View>
            <TextInput
              style={[styles.input, error && styles.inputError]}
              onBlur={onBlur}
              onChangeText={onChange} // React Native dùng onChangeText thay vì onChange
              value={value}
              keyboardType={keyboardType}
              placeholder={placeholder}
            />
            {/* Xử lý hiển thị lỗi Validation tự động */}
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  label: { marginBottom: 5, fontWeight: 'bold', color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  inputError: { borderColor: 'red' },
  errorText: { color: 'red', fontSize: 12, marginTop: 4 },
});

export default FormInput;
