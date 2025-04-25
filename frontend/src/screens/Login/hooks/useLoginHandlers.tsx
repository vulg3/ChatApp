import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { TabNavigationProp } from "../../../navigation/bottom/RootTab";
import { onFacebookButtonPress, onGoogleButtonPress } from "../../../core/services/authService";
import { RootStackParamEnum } from "../../../navigation/stack/RootStack";

export const useLoginHandlers = () => {
    const navigation = useNavigation<TabNavigationProp>();

    const handleLoginGoogle = useCallback(async () => {
        const result = await onGoogleButtonPress();
        if (result) {
            navigation.reset({
                index: 0,
                routes: [{ name: RootStackParamEnum.Tab }],
            });
        }
    }, [navigation]);

    const handleLoginFacebook = useCallback(async () => {
        const result = await onFacebookButtonPress();
        if (result) {
            navigation.reset({
                index: 0,
                routes: [{ name: RootStackParamEnum.Tab }],
            });
        }
    }, [navigation]);

    return {
        handleLoginGoogle,
        handleLoginFacebook,
    };
};
