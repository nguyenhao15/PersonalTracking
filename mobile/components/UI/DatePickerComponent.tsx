import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Text, useColorScheme, View } from 'react-native';
import BaseModal from '../BaseModal';
import LabelContainer from './LabelContainer';

interface DatePickerComponentProps {
  label: string;
  iconName: string;
  iconColor: string;
  isRequired?: boolean;
  placeholder?: string;
  onChangeAction: (date: Date) => void;
  initialValue?: Date | string;
}

const DatePickerComponent = ({
  label,
  iconName,
  iconColor,
  isRequired,
  placeholder,
  onChangeAction,
  initialValue,
}: DatePickerComponentProps) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date(initialValue || Date.now()),
  );
  const [openModal, setOpenModal] = useState(false);

  const themeUser = useColorScheme();
  console.log('Theme User: ', themeUser);

  const handleOnChangeAction = (date: Date) => {
    setSelectedDate(date);
    onChangeAction && onChangeAction(date);
    setOpenModal(false);
  };

  useEffect(() => {
    if (initialValue) {
      setSelectedDate(new Date(initialValue));
    } else {
      setSelectedDate(new Date());
    }
  }, [initialValue]);

  return (
    <View className='flex gap-2'>
      <LabelContainer
        isHasIcon
        iconColor={iconColor}
        iconName={iconName}
        label={label}
        isRequired={isRequired}
        onPress={() => setOpenModal(true)}
      >
        <Text
          className={`${selectedDate ? 'font-bold text-text-primary' : 'text-text-secondary'} mt-2 self-start text-lg`}
        >
          {selectedDate
            ? selectedDate.toDateString()
            : placeholder || 'Select a date...'}
        </Text>
      </LabelContainer>
      <BaseModal visible={openModal} onClose={() => setOpenModal(false)}>
        <View className='bg-background-lighter rounded-lg p-4 items-center justify-center '>
          <DateTimePicker
            display='inline'
            mode='date'
            value={selectedDate}
            textColor='#000'
            accentColor='#3b82f6'
            themeVariant='dark'
            onValueChange={(event, date) =>
              handleOnChangeAction(date || selectedDate)
            }
          />
        </View>
      </BaseModal>
    </View>
  );
};

export default DatePickerComponent;
