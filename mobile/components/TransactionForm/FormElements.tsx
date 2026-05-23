import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CurrencyChipComponent from '../UI/CurrencyChipComponent';
import AmountInputComponent from '../UI/AmountInputComponent';
import DatePickerComponent from '../UI/DatePickerComponent';
import WalletSelectComponent from '../UI/WalletSelectComponent';
import CategorySelectComponent from '../UI/CategorySelectComponent';
import InputWithModalComponent from '../UI/InputWithModalComponent';
import TagSelectComponent from '../UI/TagSelectComponent';
import LabelContainer from '../UI/LabelContainer';
import SwitchControl from '../UI/SwitchControl';
import BaseModal from '../BaseModal';
import ExchangeRateInputComponent from '../UI/ExchangeRateInputComponent';

interface FormElementsProps {
  type: 'expense' | 'income';
}

const tagEnum = [
  { value: 'nice-to-have', label: 'Nice to have' },
  { value: 'must-have', label: 'Must have' },
  { value: 'not-necessary', label: 'Not necessary' },
];

const FormElements = ({ type }: FormElementsProps) => {
  const {
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [baseCurrency, originalCurrency] = watch([
    'baseCurrency',
    'originalCurrency',
  ]);

  const handleOnChangeCurrency = (currencyId: string) => {
    setValue('baseCurrency', currencyId.toUpperCase());
  };

  return (
    <View>
      <Controller
        name='originalCurrency'
        control={control}
        render={({ field: { onChange, value, ...props } }) => (
          <CurrencyChipComponent
            label={value}
            onSelectItem={onChange}
            {...props}
          />
        )}
      />
      <Controller
        name='baseAmount'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <AmountInputComponent
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            currencyCode={watch('originalCurrency')}
            errorMessage={
              (errors.originalAmount?.message as string) ||
              (errors.baseAmount?.message as string)
            }
          />
        )}
      />
      {baseCurrency !== originalCurrency && (
        <Controller
          name='exchangeRate'
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <ExchangeRateInputComponent
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              errorMessage={errors.exchangeRate?.message as string}
            />
          )}
        />
      )}
      <Controller
        control={control}
        name='date'
        render={({ field: { onChange, value, ...rest } }) => (
          <DatePickerComponent
            label='Date'
            iconName='calendar'
            iconColor='#588157'
            placeholder='Select a date...'
            onChangeAction={onChange}
            initialValue={value}
            {...rest}
          />
        )}
      />
      <Controller
        control={control}
        name='walletId'
        render={({ field: { onChange, onBlur, value } }) => (
          <WalletSelectComponent
            initialWallet={value}
            onSelectWallet={onChange}
            onBlur={onBlur}
            resetAction={reset}
            throwCurrencyId={handleOnChangeCurrency}
            errorMessage={errors.walletId?.message as string}
          />
        )}
      />
      <Controller
        control={control}
        name='categoryId'
        render={({ field: { onChange, onBlur, value } }) => (
          <CategorySelectComponent
            transactionType={type}
            initialCategory={value}
            resetActions={reset}
            onSelectCategory={onChange}
            errorMessage={errors.categoryId?.message as string}
          />
        )}
      />
      <InputWithModalComponent
        label='Description'
        name='description'
        control={control}
        iconName='pencil'
        iconColor='#588157'
        placeholder='Enter description...'
        onChangeAction={(text) => {
          setValue('description', text);
        }}
        initialValue={watch('description') || ''}
        onResetAction={reset}
      />
      {type === 'expense' && (
        <Controller
          control={control}
          name='tag'
          render={({ field: { onChange, value, ...field } }) => (
            <TagSelectComponent
              data={tagEnum}
              onChangeTag={onChange}
              initialTag={value}
              onResetAction={reset}
              {...field}
              errorMessage={errors.tag?.message as string}
            />
          )}
        />
      )}
      <Controller
        name='excludedFromReports'
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <LabelContainer
            isHasIcon={true}
            iconName='eye-off'
            iconColor='#588157'
            direction='column'
            label='Excluded Report'
            isRequired={true}
            errorMessage={errors.excludedFromReports?.message as string}
          >
            <SwitchControl
              isLabelVisible={false}
              label={value ? 'Yes' : 'No'}
              onChangeAction={onChange}
              defaultValue={value}
              {...field}
            />
          </LabelContainer>
        )}
      />
    </View>
  );
};

export default FormElements;
