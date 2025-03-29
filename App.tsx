import React, { } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './src/navigation/stack/RootStack';
import { ThemeProvider } from "@rneui/themed";
import { theme } from './src/core/theme/theme';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App

