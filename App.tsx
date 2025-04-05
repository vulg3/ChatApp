import React, { } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './src/navigation/stack/RootStack';
import { ThemeProvider } from "@rneui/themed";
import { ErrorBoundary } from './src/core/component/ErrorBoundary';

function App(): React.JSX.Element {
  return (
    <ErrorBoundary>
      {/* <Provider store={store}>
        <PersistGate
      </Provider> */}
    </ErrorBoundary>
  )
}

const RootNavigation= () =>{

  return(
    <ThemeProvider> 
      <NavigationContainer>
        <RootStack/>
        {/* <AppLoading isLoading={}/> */}
      </NavigationContainer>

    </ThemeProvider>
  )
}

export default App

