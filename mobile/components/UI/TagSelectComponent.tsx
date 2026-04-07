import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import LabelContainer from './LabelContainer';

interface TagSelectComponentProps {
  data: { value: string; label: string }[];
  onChangeTag: (tag: string) => void;
  initialTag: string | undefined;
  onResetAction?: () => void;
  errorMessage?: string;
  rest?: any;
}

const TagSelectComponent = ({
  data = [],
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
    const selected = data.find((tag) => tag.value === initialTag);

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
        {data.map((tag) => (
          <View
            key={tag.value}
            className={`px-3 rounded  py-4 border-2 flex items-center justify-center ${
              selectedTag === tag.value
                ? 'bg-primary border-primary'
                : 'bg-background-light border-gray-300'
            }`}
            onTouchEnd={() => handleTagPress(tag.value)}
            {...rest}
          >
            <Text className='text-md text-text-primary font-bold'>
              {tag.label}
            </Text>
          </View>
        ))}
      </View>
    </LabelContainer>
  );
};

export default TagSelectComponent;
