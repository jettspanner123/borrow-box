import React from "react";
import {View, Text, Pressable, Dimensions} from "react-native";
import {Easing, SharedValue, withTiming} from "react-native-reanimated";
import {AntDesign} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";

const {width: SCREEN_WIDTH} = Dimensions.get("window");

export default function ForgetPasswordScreen({forgotPasswordViewLeftPosition}: {
    forgotPasswordViewLeftPosition: SharedValue<number>
}): React.JSX.Element {
    return (
        <View className={"h-screen w-screen justify-start items-center bg-gray-100"}>
            <SecondaryPageHeaderWithBackButton name={"Forgot Password"}
                                               previousScreenSharedValue={forgotPasswordViewLeftPosition}/>
        </View>
    )
}

function SecondaryPageHeaderWithBackButton({name, previousScreenSharedValue}: {
    name: string,
    previousScreenSharedValue: SharedValue<number>
}): React.JSX.Element {

    const goBackFunction = (): void => {
        previousScreenSharedValue.value = withTiming(SCREEN_WIDTH, {
            duration: 350,
            easing: Easing.bezier(0.55, 0, 0.15, 1)
        })
    }
    return (
        <View className={"h-[12.5vh] fixed pb-[0.5rem] w-full justify-end items-start px-[1.5rem]"}>

            <View className={"h-full w-screen absolute top-0"}>
                <LinearGradient
                    style={{
                        flex: 1
                    }}
                    start={{
                        x: 0, y: 0
                    }}
                    end={{
                        x: 0, y: 1
                    }}
                    colors={["white", "#ffffff00"]}/>
            </View>
            <Pressable
                onPress={goBackFunction}
                className={"flex-row items-center justify-between w-full gap-[1rem]"}
            >
                <View
                    className={"h-[3rem] border-[1px] border-black/10 aspect-square bg-white rounded-full justify-center items-center"}>
                    <AntDesign name="arrowleft" size={24} color="rgba(0, 0, 0, 0.75)"/>
                </View>
                <Text className={"font-semibold text-[1.2rem]"}>
                    {name}
                </Text>

                <View
                    className={"h-[3.5rem] invisible aspect-square bg-white justify-center items-center"}>
                    <AntDesign name="arrowleft" size={24} color="rgba(0, 0, 0, 0.75)"/>
                </View>
            </Pressable>
        </View>
    )
}