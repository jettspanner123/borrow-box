import React from "react";
import { View, Text } from "react-native";

export default function BasicInformationScreen(): React.JSX.Element {
    return (
        <View className={"h-screen w-screen bg-blue-300 justify-center items-center"}>
            <Text>HEllo, world</Text>
        </View>
    )
}