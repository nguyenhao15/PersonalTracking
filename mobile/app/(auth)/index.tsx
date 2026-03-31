import { useLogin } from '@/hooks/useAuthentication';
import { useAuthStore } from '@/stores/AuthStores';
import { Redirect } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen() {
  const { username: storedUsername, accessToken, isHydrated } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync: login, isPending: isLoading, error } = useLogin();

  const handleLogin = async () => {
    try {
      await login({ username, password });
    } catch (err: any) {
      console.log('Error: ', err);
    }
  };

  if (!isHydrated) {
    return (
      <View className='flex-1 items-center justify-center bg-white'>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  if (storedUsername && accessToken) {
    return <Redirect href='/(tabs)' />;
  }

  return (
    <KeyboardAvoidingView
      className='flex-1 bg-white'
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className='flex-1 justify-center px-6'>
        {/* Header */}
        <View className='mb-10'>
          <Text className='text-3xl font-bold text-gray-900'>Đăng nhập</Text>
          <Text className='mt-2 text-gray-500'>Chào mừng bạn trở lại!</Text>
        </View>

        {/* Error message */}
        {error ? (
          <View className='mb-4 rounded-lg bg-red-50 px-4 py-3'>
            <Text className='text-sm text-red-600'>{error.message}</Text>
          </View>
        ) : null}

        {/* Username */}
        <View className='mb-4'>
          <Text className='mb-1.5 text-sm font-medium text-gray-700'>
            Tên đăng nhập
          </Text>
          <TextInput
            className='h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900'
            placeholder='Nhập tên đăng nhập'
            placeholderTextColor='#9ca3af'
            autoCapitalize='none'
            autoCorrect={false}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Password */}
        <View className='mb-6'>
          <Text className='mb-1.5 text-sm font-medium text-gray-700'>
            Mật khẩu
          </Text>
          <View className='flex-row h-12 items-center rounded-xl border border-gray-200 bg-gray-50 px-4'>
            <TextInput
              className='flex-1 text-gray-900'
              placeholder='Nhập mật khẩu'
              placeholderTextColor='#9ca3af'
              secureTextEntry={!showPassword}
              autoCapitalize='none'
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
              <Text className='text-sm text-blue-500'>
                {showPassword ? 'Ẩn' : 'Hiện'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit */}
        <TouchableOpacity
          className='h-12 items-center justify-center rounded-xl bg-blue-600 active:bg-blue-700'
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color='#fff' />
          ) : (
            <Text className='text-base font-semibold text-white'>
              Đăng nhập
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
