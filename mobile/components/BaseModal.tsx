import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

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
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        onPress={onClose}
      />
      <View
        style={{
          height: '90%',

          padding: 16,
          flexShrink: 1,
        }}
        className='bg-background-lighter rounded-t-lg absolute bottom-0 left-0 right-0'
      >
        {!!title && (
          <Text
            style={{ fontWeight: '700', fontSize: 16 }}
            className='text-white text-center mb-4'
          >
            {title}
          </Text>
        )}
        {children}
      </View>
      <Toast />
    </Modal>
  );
}
