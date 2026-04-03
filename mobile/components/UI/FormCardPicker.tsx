import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FormCardPickerProps {
  control: any; // Replace with appropriate type from react-hook-form
  name: string;
  label: string;
  placeholder?: string;
  onPress: () => void;
}

const FormCardPicker = ({
  control,
  name,
  label,
  placeholder,
  onPress,
}: FormCardPickerProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { value }, fieldState: { error } }) => (
          <View>
            {/* Bấm vào Card này sẽ gọi hàm onPress truyền từ cha (để navigate) */}
            <TouchableOpacity
              style={[styles.card, error && styles.errorCard]}
              onPress={onPress}
              activeOpacity={0.7}
            >
              <Text
                style={value ? styles.textSelected : styles.textPlaceholder}
              >
                {value ? value.name : placeholder}
              </Text>
              <Text style={styles.iconArrow}>›</Text>
            </TouchableOpacity>

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
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  errorCard: { borderColor: 'red' },
  textSelected: { color: '#000', fontSize: 16 },
  textPlaceholder: { color: '#999', fontSize: 16 },
  iconArrow: { fontSize: 24, color: '#666', marginTop: -5 },
  errorText: { color: 'red', fontSize: 12, marginTop: 4 },
});

export default FormCardPicker;
