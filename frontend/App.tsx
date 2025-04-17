import React, { } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './src/navigation/stack/RootStack';
import { ThemeProvider } from "@rneui/themed";
import { ErrorBoundary } from './src/core/component/ErrorBoundary';
import { persistor, store } from './src/redux/store';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppLoading from './src/core/component/AppLoading';
import { useAppSelector } from './src/core/hooks/useRedux';


function App(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RootNavigation />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  )
}

const RootNavigation = () => {
  const isLoading = useAppSelector((state) => state.root.app.isLoading)
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootStack />
        <AppLoading isLoading={isLoading} />
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default App

