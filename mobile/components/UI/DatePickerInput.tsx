import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useMemo, useState } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface BaseDatePickerInputProps {
  placeholder?: string;
  isError?: boolean;
  minimumDate?: Date;
  style?: any;
  maximumDate?: Date;
  value?: string | Date;
  onChange?: (value: string) => void;
}

interface HookFormDatePickerInputProps<
  T extends FieldValues,
> extends BaseDatePickerInputProps {
  control: Control<T>;
  name: FieldPath<T>;
}

type DatePickerInputProps<T extends FieldValues = FieldValues> =
  | BaseDatePickerInputProps
  | HookFormDatePickerInputProps<T>;

const parseDate = (value?: string | Date): Date | null => {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return isNaN(value.getTime()) ? null : value;
  }

  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : parsed;
};

const formatDate = (value?: string | Date): string => {
  const parsed = parseDate(value);
  if (!parsed) {
    return '';
  }

  return parsed.toLocaleDateString();
};

const toIsoDateOnly = (value: Date): string => {
  return value.toISOString().split('T')[0];
};

const DatePickerField = ({
  placeholder = 'Select date',
  value,
  onChange,
  isError,
  minimumDate,
  maximumDate,
  style,
}: BaseDatePickerInputProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const selectedDate = useMemo(() => parseDate(value) ?? new Date(), [value]);
  const displayValue = formatDate(value);

  const handleChange = (_event: unknown, pickedDate?: Date) => {
    setShowPicker(false);

    if (!pickedDate || !onChange) {
      return;
    }

    onChange(toIsoDateOnly(pickedDate));
  };

  return (
    <View style={styles.container} className='flex gap-2'>
      {!showPicker && (
        <Pressable
          onPress={() => setShowPicker(true)}
          style={[styles.input, isError && styles.inputError]}
        >
          <Text
            style={displayValue ? styles.valueText : styles.placeholderText}
          >
            {displayValue || placeholder}
          </Text>
        </Pressable>
      )}

      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode='date'
          display='spinner'
          style={style}
          themeVariant='light'
          onValueChange={handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
};

const DatePickerInput = <T extends FieldValues = FieldValues>(
  props: DatePickerInputProps<T>,
) => {
  if ('control' in props && 'name' in props) {
    const { control, name, ...rest } = props;

    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DatePickerField
            {...rest}
            value={value as string | Date | undefined}
            onChange={onChange}
            isError={!!error}
          />
        )}
      />
    );
  }

  return <DatePickerField {...props} />;
};

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  label: { marginBottom: 5, fontWeight: 'bold', color: '#333' },
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
  valueText: { color: '#111827', fontSize: 16 },
  placeholderText: { color: '#9ca3af', fontSize: 16 },
  errorText: { color: 'red', fontSize: 12, marginTop: 4 },
});

export default DatePickerInput;
