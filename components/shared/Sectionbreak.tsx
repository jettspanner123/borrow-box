import React from "react";
import {Text} from "react-native";
import Animated, {LinearTransition} from "react-native-reanimated";

export default function SectionBreak({ text, additionalStyles, transitionDuration }: { text: string, additionalStyles?: string, transitionDuration?: number }): React.JSX.Element {
    return <Animated.Text layout={LinearTransition.duration(transitionDuration ? transitionDuration : 100)} className={`font-semibold text-gray-500 mt-[1.5rem] ${additionalStyles}`}>{text}</Animated.Text>;
}