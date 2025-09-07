import React from "react";
import {View, Text, Pressable} from "react-native";
import {useRegistrationScreenStore} from "../../store/RegistrationScreenStore";
import Animated, {FadeInDown, FadeInUp} from "react-native-reanimated";

export default function MainRegistrationScreen(): React.JSX.Element {

    const {setRegistrationScreenVisibility} = useRegistrationScreenStore();
    return (
        <Animated.View
            entering={FadeInDown}
            exiting={FadeInUp}
            className={"w-screen h-screen justify-center items-center bg-white"}>
            <Pressable onPress={() => {
                setRegistrationScreenVisibility(false);
            }}>
                <Text className={"text-black"}>
                    Registration Screen!
                </Text>
            </Pressable>
        </Animated.View>
    )

}
