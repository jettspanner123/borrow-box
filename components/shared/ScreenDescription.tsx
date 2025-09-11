import React from "react";
import {Text} from "react-native";

export default function ScreenDescription({text}: {text: string}): React.JSX.Element {
    return (
        <Text className={"mt-[1rem] text-gray-600"}>
            {text}
        </Text>
    )
}