import React from "react";
import BasicInformationScreen from "./BasicInformationScreen";
import {Pressable, Text, View} from "react-native";
import Animated, {
    FadeIn,
    FadeInLeft, FadeInRight,
    FadeOutLeft, FadeOutRight,
    LinearTransition,
    SlideInLeft,
    SlideOutLeft
} from "react-native-reanimated";
import {Entypo} from "@expo/vector-icons";
import AddressInformationScreen from "./AddressInformationScreen";

export default function MainCreateAccountScreen(): React.JSX.Element {

    const [currentPage, setCurrentPage] = React.useState<number>(0);


    function moveToNextPage(): void {
        setCurrentPage(currentPage + 1);
    }

    function moveToPreviousPage(): void {
        setCurrentPage(currentPage - 1);
    }

    return (
        <View className={"h-screen w-screen"}>

            {/*MARK: Bottom button container*/}
            <View
                pointerEvents={"box-none"}
                className={"h-screen w-screen absolute top-0 left-0 z-[12] gap-[1rem] p-[1.5rem] items-end justify-center flex-row"}>


                {/*MARK: Back button*/}
                {
                    currentPage > 0 && (
                        <Animated.View
                            entering={SlideInLeft}
                            exiting={SlideOutLeft}
                            layout={LinearTransition}
                        >
                            <Pressable
                                onPress={moveToPreviousPage}
                                className={""}>
                                <View
                                    className={"h-[3.5rem] aspect-square bg-gray-200 rounded-xl border-black/10 border-[0.5px] justify-center items-center"}>
                                    <Entypo name="chevron-left" size={18} color="black"/>
                                </View>
                            </Pressable>
                        </Animated.View>
                    )
                }


                {/*MARK: Forward button*/}
                <Animated.View
                    layout={LinearTransition.delay(100)}
                    className={"h-[3.5rem] flex-1"}>
                    <Pressable
                        onPress={moveToNextPage}
                        className={""}>
                        <View
                            className={"h-[3.5rem] w-full bg-black rounded-xl p-[1rem] justify-center items-center flex-row gap-[0.75rem]"}>
                            <Text className={"font-bold text-white"}>Proceed Further</Text>
                            <Entypo name="chevron-right" size={18} color="white"/>
                        </View>
                    </Pressable>
                </Animated.View>
            </View>

            {/*MARK: Conditionally Rendering the screens*/}
            {
                currentPage === 0 && (
                    <Animated.View
                        entering={FadeInLeft}
                        exiting={FadeOutLeft}
                        className={"h-screen w-screen"}>
                        <BasicInformationScreen/>
                    </Animated.View>
                )
            }
            {
                currentPage === 1 && (
                    <Animated.View
                        entering={FadeInRight}
                        exiting={FadeOutRight}
                    >
                        <AddressInformationScreen />
                    </Animated.View>
                )
            }
        </View>
    )
}