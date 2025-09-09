import React from "react";
import {View, Text, Pressable, Dimensions} from "react-native";
import {Easing, SharedValue, withTiming} from "react-native-reanimated";

const {width: SCREEN_WIDTH} = Dimensions.get("window");

export default function ForgetPasswordScreen({forgotPasswordViewLeftPosition}: {
    forgotPasswordViewLeftPosition: SharedValue<number>
}): React.JSX.Element {
    return (
        <View className={"h-screen w-screen justify-center items-center"}>
            <Pressable onPress={() => {
                forgotPasswordViewLeftPosition.value = withTiming(SCREEN_WIDTH, {
                    duration: 900,
                    easing: Easing.bezier(0.15, 1, 0.3, 1)
                })
            }}>
                <Text className={"text-black"}>This is the forget password screen</Text>
            </Pressable>
        </View>
    )
}