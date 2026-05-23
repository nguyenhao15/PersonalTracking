import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
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

    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();
  const baseCurrency = useWatch({ control, name: 'baseCurrency' });
  const originalCurrency = useWatch({ control, name: 'originalCurrency' });

  const handleOnChangeCurrency = (currencyId: string) => {
    setValue('baseCurrency', currencyId.toUpperCase(), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <View className='p-2'>
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
            errorMessage={
              (errors.originalAmount?.message as string) ||
              (errors.baseAmount?.message as string)
            }
          />
        )}
      />
      {originalCurrency !== baseCurrency && (
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
        render={({ field: { onChange, value, ...rest } }) => (
          <CategorySelectComponent
            transactionType={type}
            initialCategory={value}
            resetActions={reset}
            onSelectCategory={onChange}
            errorMessage={errors.categoryId?.message as string}
          />
        )}
      />
      <Controller
        name='description'
        control={control}
        render={({ field: { onChange, value, ...rest } }) => (
          <InputWithModalComponent
            label='Description'
            iconName='pencil'
            iconColor='#588157'
            placeholder='Enter description...'
            errorMessage={errors.description?.message as string}
            initialValue={value}
            onChangeAction={onChange}
            onResetAction={reset}
          />
        )}
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
