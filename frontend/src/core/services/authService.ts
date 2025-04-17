import { GoogleAuthProvider, signInWithCredential, signOut, FacebookAuthProvider } from "firebase/auth"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { auth } from "../../config/firebaseConfig";
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';


export async function onGoogleButtonPress() {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const signInResult = (await GoogleSignin.signIn()) as any;
    console.log('User Info:', signInResult);
    let idToken = signInResult.data?.idToken
    if (!idToken) {
      idToken = signInResult.idToken
    }
    if (!idToken) {
      console.log("Error ID token", idToken);
      throw new Error("No ID token found")
    }
    const googleCredential = GoogleAuthProvider.credential(idToken)
    const signInWithPopupResult = await signInWithCredential(auth, googleCredential)
    return signInWithPopupResult
  } catch (error: any) {
    console.log("Lỗi khi đăng nhập Google:", error.message);
    throw error
  }
}

export async function onFacebookButtonPress() {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = FacebookAuthProvider.credential(data.accessToken);
    const signInResult = await signInWithCredential(auth, facebookCredential)
    return signInResult
  } catch (error) {
    console.log("Lỗi khi đăng nhập facebook : ", error);
  }
}

async function onFacebookIOSButtonPress() {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw new Error('User cancelled the login process');
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw new Error('Something went wrong obtaining access token');
    }
    const facebookCredential = FacebookAuthProvider.credential(data.accessToken);
    const signInResult = await signInWithCredential(auth, facebookCredential)
    return signInResult
  } catch (error) {
    console.error('Facebook Login Error:', error);
    throw error;
  }
}

export async function logOut() {
  try {
    await signOut(auth);
    const googleUser = await GoogleSignin.getCurrentUser();
    if (googleUser) {
      await GoogleSignin.signOut();
    }
    LoginManager.logOut();
    return true;
  } catch (error) {
    console.error("Error logging out:", error);
    return false;
  }
}




