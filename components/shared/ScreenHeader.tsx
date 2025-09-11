import React from "react";
import {Text} from "react-native";


export default function ScreenHeader({text}: { text: string }): React.JSX.Element {
    return (
        <Text className={"font-semibold text-[2.6rem]"}>
            {text}
        </Text>
    )
}