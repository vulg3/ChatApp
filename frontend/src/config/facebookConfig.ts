import { Settings } from 'react-native-fbsdk-next';
import { envApp } from './envConfigs';

export const initFacebookSDK = () => {
    Settings.setAppID(envApp.FACEBOOK_APP_ID);
    Settings.setClientToken(envApp.FACEBOOK_CLIENT_TOKEN);
    Settings.initializeSDK();
};