import React from "react";
import {Text, View} from "react-native";

export default function TestScreen(): React.JSX.Element {
    return (
        <View className={"h-screen w-screen bg-white justify-center items-center"}>
            <Text>Hello, world</Text>
        </View>
    )
}