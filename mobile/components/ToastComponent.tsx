import Toast from 'react-native-toast-message';

export const handleShowToast = (
  message: string,
  type: 'success' | 'error' | 'info',
) => {
  Toast.show({
    type: type,
    text1: message,
    position: 'top',
    topOffset: 80,
    visibilityTime: 1000,
  });
};

const ToastComponent = ({
  message,
  type,
}: {
  message: string;
  type: 'success' | 'error' | 'info';
}) => {
  return handleShowToast(message, type);
};

export default ToastComponent;
