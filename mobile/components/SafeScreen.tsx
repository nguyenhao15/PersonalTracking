import React from 'react';
import { useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeScreen = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets();
  const themeUser = useColorScheme();
  console.log('Theme: ', themeUser);

  return (
    <View
      className={`flex-1 bg-background-${themeUser} p-2`}
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {children}
    </View>
  );
};

export default SafeScreen;
