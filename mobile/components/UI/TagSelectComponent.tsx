import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import LabelContainer from './LabelContainer';

const tagEnum = [
  { value: 'nice-to-have', label: 'Nice to have' },
  { value: 'must-have', label: 'Must have' },
  { value: 'not-necessary', label: 'Not necessary' },
];

interface TagSelectComponentProps {
  onChangeTag: (tag: string) => void;
  initialTag: 'nice-to-have' | 'must-have' | 'not-necessary' | '';
  onResetAction?: () => void;
  errorMessage?: string;
  rest?: any;
}

const TagSelectComponent = ({
  onChangeTag,
  initialTag,
  onResetAction,
  errorMessage,
  ...rest
}: TagSelectComponentProps) => {
  const [selectedTag, setSelectedTag] = useState('');

  const handleTagPress = (tag: any) => {
    setSelectedTag(tag);
    onChangeTag && onChangeTag(tag);
  };

  console.log('Initial Tag: ', initialTag);

  useEffect(() => {
    if (onResetAction) {
      onResetAction();
      setSelectedTag('');
    }
  }, [onResetAction]);

  useEffect(() => {
    const selected = tagEnum.find((tag) => tag.value === initialTag);

    if (selected) {
      setSelectedTag(selected.value);
    } else {
      setSelectedTag('');
    }
  }, [initialTag]);

  return (
    <LabelContainer
      onPress={() => {}}
      label='Tags'
      iconName='tag'
      iconColor='#f59e0b'
      isRequired
      errorMessage={errorMessage}
      isHasIcon={false}
    >
      <View className='flex-row flex-wrap gap-2 mt-2'>
        {tagEnum.map((tag) => (
          <View
            key={tag.value}
            className={`px-3 rounded bg-white-100 py-4 border-2 flex items-center justify-center ${
              selectedTag === tag.value
                ? 'border-yellow-500'
                : 'border-gray-300'
            }`}
            onTouchEnd={() => handleTagPress(tag.value)}
            {...rest}
          >
            <Text className='text-md text-slate-900 font-bold'>
              {tag.label}
            </Text>
          </View>
        ))}
      </View>
    </LabelContainer>
  );
};

export default TagSelectComponent;
