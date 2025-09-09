import "./global.css";
import React from "react";
import {Text, View} from 'react-native';
import OnBoardingPage from "./pages/OnBoardingPage/OnBoardingPage";
import {useRegistrationScreenStore} from "./store/RegistrationScreenStore";
import MainRegistrationScreen from "./pages/RegistrationScreen/MainRegistrationScreen";

export default function App(): React.JSX.Element {

    const {isRegistrationScreenVisible} = useRegistrationScreenStore();
    return (
        <View className={"bg-white h-screen w-screen"}>
            {/*{*/}
            {/*    isRegistrationScreenVisible ?*/}
            {/*        <MainRegistrationScreen /> :*/}
            {/*        <OnBoardingPage/>*/}
            {/*}*/}

            <MainRegistrationScreen />
        </View>
    );
}