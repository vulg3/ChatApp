import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeNavigationProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React from "react"
import { RootStackParamList } from "../stack/RootStack"
import { BottomTab } from "../../core/component/BottomTab"
import Home from "../../screens/Home/Home"
import Chat from "../../screens/Chat/Chat"

const Tab = createBottomTabNavigator<RootTabParamsList>()

enum RootTabParamsEnum {
    Home = "Home",
    Chat = "Chat",
}
type RootTabParamsList = {
    [RootTabParamsEnum.Home]: undefined
    [RootTabParamsEnum.Chat]: undefined
}
const screens = [
    {
        name: RootTabParamsEnum.Home,
        component: Home,
        option: {},
    },
    {
        name: RootTabParamsEnum.Chat,
        component: Chat,
        option: {},
    },
]

export type TabNavigationProp = NativeStackNavigationProp<RootStackParamList>
export type HomesScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamsList, RootTabParamsEnum.Home>,
    NativeStackNavigationProp<RootStackParamList>
>
export type ChatScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamsList, RootTabParamsEnum.Chat>,
    NativeStackNavigationProp<RootStackParamList>
>

const RootTab = () => {
    return (
        <Tab.Navigator
            initialRouteName={RootTabParamsEnum.Home}
            backBehavior="none"
            tabBar={(props) => <BottomTab {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            {screens.map((screen) => (
                <Tab.Screen key={screen.name} name={screen.name} component={screen.component} options={screen.option} />
            ))}
        </Tab.Navigator>
    )
}

export default RootTab
