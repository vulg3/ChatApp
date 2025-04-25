import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
    NativeStackNavigationProp,
} from "@react-navigation/native-stack"
import { useTheme } from "@rneui/themed"
import React from "react"
import RootTab from "../bottom/RootTab"
import { Message } from "../../core/entities/message"
import Login from "../../screens/Login/Login"
import Chat from "../../screens/Chat/Chat"
import HomeScreen from "../../screens/Home/Home"

export type ChatProps = NativeStackNavigationProp<RootStackParamList, RootStackParamEnum.Chat>

export interface ScreenProps {
    name: RootStackParamEnum
    component: React.ComponentType<any>
    option: NativeStackNavigationOptions
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export enum RootStackParamEnum {
    Auth = "Auth",
    Tab = "Tab",
    Chat = "Chat",
    Home = "Home",
}

export type RootStackParamList = {
    [RootStackParamEnum.Auth]: undefined
    [RootStackParamEnum.Tab]: undefined
    [RootStackParamEnum.Chat]: {
        type: "new" | "view";
        messages?: Message[];
    };
    [RootStackParamEnum.Home]: undefined
}
export const screens: ScreenProps[] = [
    {
        name: RootStackParamEnum.Auth,
        component: Login,
        option: {
            headerShown: false,
        },
    },
    {
        name: RootStackParamEnum.Tab,
        component: RootTab,
        option: {},
    },
    {
        name: RootStackParamEnum.Chat,
        component: Chat,
        option: {
            headerShown: true,
            headerTransparent: false,
            headerBackButtonDisplayMode: "generic",
        },
    },
    {
        name: RootStackParamEnum.Home,
        component: HomeScreen,
        option: {}
    },

]

export const RootStack = () => {
    const { theme: { colors } } = useTheme()
    return (
        <Stack.Navigator
            initialRouteName={RootStackParamEnum.Auth}
            screenOptions={{
                headerShown: false,
                headerBackTitle: "Back",
            }}
        >
            {screens.map((screen) => (
                <Stack.Screen
                    key={screen.name}
                    name={screen.name}
                    component={screen.component}
                    options={{
                        ...screen.option,
                        headerStyle: { backgroundColor: colors.background },
                        headerTitleStyle: { color: colors.black },
                    }}
                />
            ))}
        </Stack.Navigator>
    )
}
