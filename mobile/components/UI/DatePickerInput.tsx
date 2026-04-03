import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Text, View } from 'react-native';

interface DatePickerInputProps {
  control: any; // Thay 'any' bằng kiểu chính xác nếu có thể
  name: string;
  placeholder?: string;
  label: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const DatePickerInput = ({
  control,
  name,
  placeholder,
  label,
  keyboardType = 'default',
}: DatePickerInputProps) => {
  return (
    <View className='mb-1.5'>
      <Text>DatePickerInput</Text>
      <DateTimePicker value={new Date()} mode='date' display='default' />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: { marginBottom: 15 },
//   label: { marginBottom: 5, fontWeight: 'bold', color: '#333' },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 12,
//     borderRadius: 8,
//     backgroundColor: '#fff',
//   },
//   inputError: { borderColor: 'red' },
//   errorText: { color: 'red', fontSize: 12, marginTop: 4 },
// });

export default DatePickerInput;
