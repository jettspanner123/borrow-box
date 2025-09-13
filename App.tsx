import "./global.css";
import React from "react";
import {View} from 'react-native';
import MainRegistrationScreen from "./pages/RegistrationScreen/MainRegistrationScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TestScreen from "./pages/TestScreen";
import ForgetPasswordScreen from "./pages/RegistrationScreen/ForgetPasswordScreen";
import MainSignUpScreen from "./pages/RegistrationScreen/CreateAccountPages/MainSignUpScreen";
import BasicInformationScreen from "./pages/RegistrationScreen/CreateAccountPages/BasicInformationScreen";
import MainCreateAccountScreen from "./pages/RegistrationScreen/CreateAccountPages/MainCreateAccountScreen";


function HomeScreen(): React.JSX.Element {

    return (
        <View className={"bg-white flex-1"}>
            <MainCreateAccountScreen />
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
            <NavigationStack.Navigator screenOptions={{headerShown: false}} initialRouteName={"HomeScreen"}>
                <NavigationStack.Screen name={SCREENS.HomeScreen} component={HomeScreen}/>
                <NavigationStack.Screen name={SCREENS.TestScreen} component={TestScreen}/>
                <NavigationStack.Screen name={SCREENS.ForgotPasswordScreen} component={ForgetPasswordScreen}/>
                <NavigationStack.Screen name={SCREENS.SignUpScreen} component={MainSignUpScreen}/>
                <NavigationStack.Screen name={SCREENS.BasicInformationScreen} component={MainCreateAccountScreen}/>
            </NavigationStack.Navigator>
        </NavigationContainer>
    );
}