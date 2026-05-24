import React, { useState } from 'react';
import { Switch, Text, View } from 'react-native';

interface SwitchControlProps {
  isLabelVisible?: boolean;
  label: string;
  onChangeAction?: (value: boolean) => void;
  defaultValue?: boolean;
  disabled: boolean;
}

const SwitchControl = ({
  onChangeAction,
  defaultValue = false,
  isLabelVisible = true,
  label,
  disabled,
  ...rest
}: SwitchControlProps) => {
  const [isEnabled, setIsEnabled] = useState(defaultValue);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);

    if (onChangeAction) {
      onChangeAction(!isEnabled);
    }
  };

  return (
    <View className='flex flex-row gap-2 my-3 items-center justify-center'>
      <Switch
        style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
        trackColor={{ false: 'grey', true: 'tomato' }}
        thumbColor={isEnabled ? 'tomato' : '#f4f3f4'}
        ios_backgroundColor={'grey'}
        onValueChange={toggleSwitch}
        value={defaultValue}
        {...rest}
        disabled={disabled}
      />
      {isLabelVisible && <Text className='ml-2 text-xl'>{label}</Text>}
    </View>
  );
};

export default SwitchControl;
