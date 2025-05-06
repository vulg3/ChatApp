import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../../../core/hooks/useRedux";
import { onFacebookButtonPress, onGoogleButtonPress } from "../../../core/services/authService";
import { useLoginMutation } from "../../../redux/reducers/Auth/authService";
import { authAction } from "../../../redux/reducers/Auth/authSlice";

export const useLoginHandlers = () => {
    const dispatch = useAppDispatch();
    const [loginMutation] = useLoginMutation();

    const loginWithProvider = async (provider: "google" | "facebook") => {
        const result =
          provider === "google"
            ? await onGoogleButtonPress()
            : await onFacebookButtonPress();
      
        if (!result) return false;
      
        const idToken = await result.user.getIdToken();
      
        try {
          const res = await loginMutation({ idToken, provider }).unwrap();
      
          const { access_token, refresh_token, user } = res;
      
          await AsyncStorage.setItem('access_token', access_token);
          await AsyncStorage.setItem('refresh_token', refresh_token);
      
          dispatch(authAction.updateState({ access_token, refresh_token, user }));
      
          return true;
        } catch (error) {
          console.log("Login error:", error);
          return false;
        }
      };

    const handleLoginGoogle = () => loginWithProvider("google");
    const handleLoginFacebook = () => loginWithProvider("facebook");

    return {
        handleLoginGoogle,
        handleLoginFacebook,
    };
};
