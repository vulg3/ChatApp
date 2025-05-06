import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './src/navigation/stack/RootStack';
import { ThemeProvider } from "@rneui/themed";
import { ErrorBoundary } from './src/core/component/ErrorBoundary';
import { persistor, store } from './src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppLoading from './src/core/component/AppLoading';
import { useAppSelector } from './src/core/hooks/useRedux';
import { Appearance } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { envApp } from './src/config/envConfigs';
import { initFacebookSDK } from './src/config/facebookConfig';

GoogleSignin.configure({
  webClientId: envApp.WEB_CLIENT,
  offlineAccess: true,
});

function App(): React.JSX.Element {
  // useEffect(() => {
  //   initFacebookSDK();
  // }, []);

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
  const isLoading = useAppSelector((state) => state.root.app.isLoading);
  const systemMode = Appearance.getColorScheme();

  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootStack />
        <AppLoading isLoading={isLoading} />
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default App;