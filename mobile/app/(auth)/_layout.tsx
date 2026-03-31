import { Stack } from 'expo-router';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default function AuthRouteLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
