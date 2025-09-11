import React from "react";
import {Text} from "react-native";

export default function SectionBreak({ text }: { text: string }): React.JSX.Element {
    return <Text className={"font-semibold text-gray-500 mt-[1.5rem]"}>{text}</Text>;
}