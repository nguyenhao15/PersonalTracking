import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import LabelContainer from './UI/LabelContainer';

const tagEnum = [
  { value: 'nice-to-have', label: 'Nice to have' },
  { value: 'must-have', label: 'Must have' },
  { value: 'not-necessary', label: 'Not necessary' },
];

interface TagSelectComponentProps {
  onChangeTag: (tag: string) => void;
  initialTag: string;
}

const TagSelectComponent = ({
  onChangeTag,
  initialTag,
}: TagSelectComponentProps) => {
  const [selectedTag, setSelectedTag] = useState<string>('');

  const handleTagPress = (tag: string) => {
    setSelectedTag(tag);
    onChangeTag && onChangeTag(tag);
  };

  useEffect(() => {
    const selected = tagEnum.find((tag) => tag.value === initialTag);
    setSelectedTag(selected ? selected.value : '');
  }, [initialTag]);

  return (
    <LabelContainer
      onPress={() => {}}
      label='Tags'
      iconName='tag'
      iconColor='#f59e0b'
      isRequired
      isHasIcon={false}
    >
      <View className='flex-row flex-wrap gap-2 mt-2'>
        {tagEnum.map((tag) => (
          <View
            key={tag.value}
            className={`px-3 rounded bg-white-100 py-2 border flex items-center justify-center ${
              selectedTag === tag.value
                ? 'border-yellow-500'
                : 'border-gray-300'
            }`}
            onTouchEnd={() => handleTagPress(tag.value)}
          >
            <Text className='text-sm text-slate-900 font-bold'>
              {tag.label}
            </Text>
          </View>
        ))}
      </View>
    </LabelContainer>
  );
};

export default TagSelectComponent;
