import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

type BaseModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function BaseModal({
  visible,
  onClose,
  title,
  children,
}: BaseModalProps) {
  if (!visible) {
    return null; // Không render gì nếu modal không mở
  }
  return (
    <Modal
      visible={visible}
      transparent
      className='item-start'
      animationType='slide'
      onRequestClose={onClose}
    >
      <Pressable
        className='justify-start'
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
        onPress={onClose}
      />
      <View
        style={{
          height: '90%',
          backgroundColor: 'white',
          padding: 16,
          flexShrink: 1,
        }}
      >
        {!!title && (
          <Text style={{ fontWeight: '700', fontSize: 16 }}>{title}</Text>
        )}
        {children}
      </View>
    </Modal>
  );
}
