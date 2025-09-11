import "./global.css";
import React from "react";
import {View} from 'react-native';
import OnBoardingPage from "./pages/OnBoardingPage/OnBoardingPage";
import {useRegistrationScreenStore} from "./store/RegistrationScreenStore";
import MainRegistrationScreen from "./pages/RegistrationScreen/MainRegistrationScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TestScreen from "./pages/TestScreen";
import ForgetPasswordScreen from "./pages/RegistrationScreen/ForgetPasswordScreen";
import MainSignUpScreen from "./pages/RegistrationScreen/CreateAccountPages/MainSignUpScreen";
import BasicInformationScreen from "./pages/RegistrationScreen/CreateAccountPages/BasicInformationScreen";


function HomeScreen( ): React.JSX.Element {

    const {isRegistrationScreenVisible} = useRegistrationScreenStore();
    return (
        <View className={"bg-white h-screen w-screen"}>
            {/*{*/}
            {/*    isRegistrationScreenVisible ?*/}
            {/*        <MainRegistrationScreen /> :*/}
            {/*        <OnBoardingPage/>*/}
            {/*}*/}

            <MainRegistrationScreen/>
            {/*<MainSignUpScreen />*/}
            {/*<BasicInformationScreen />*/}
        </View>
    )
}

export const SCREENS = {
    HomeScreen: "HomeScreen",
    TestScreen: "TestScreen",
    ForgotPasswordScreen: "ForgotPasswordScreen",
    SignUpScreen: "SignUpScreen",
    BasicInformationScreen: "BasicInformationScreen",
}


const NavigationStack = createNativeStackNavigator();
export default function App(): React.JSX.Element {

    return (
        <NavigationContainer>
            <NavigationStack.Navigator screenOptions={{ headerShown: false}} initialRouteName={"HomeScreen"}>
                <NavigationStack.Screen name={SCREENS.HomeScreen} component={HomeScreen}/>
                <NavigationStack.Screen name={SCREENS.TestScreen} component={TestScreen}/>
                <NavigationStack.Screen name={SCREENS.ForgotPasswordScreen} component={ForgetPasswordScreen}/>
                <NavigationStack.Screen name={SCREENS.SignUpScreen} component={MainSignUpScreen}/>
                <NavigationStack.Screen name={SCREENS.BasicInformationScreen} component={BasicInformationScreen}/>
            </NavigationStack.Navigator>
        </NavigationContainer>
    );
}