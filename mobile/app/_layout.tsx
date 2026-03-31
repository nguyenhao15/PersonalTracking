import { Stack } from 'expo-router';
import '../global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function RootLayout() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}
