import React from "react";
import {useNavigation} from "@react-navigation/native";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {AntDesign, Entypo} from "@expo/vector-icons";

export default function SecondaryPageHeaderWithBackButton({name}: {
    name: string,
}): React.JSX.Element {

    const navigation = useNavigation();
    return (
        <View className={"h-[16vh] absolute top-0 z-[12] pb-[2rem] w-full justify-end items-start px-[1.5rem]"}>

            <View className="h-full w-screen absolute top-0">
                <LinearGradient
                    colors={["#ffffff", "#ffffff00"]}
                    start={{
                        x: 0.5, y: 0.65
                    }}
                    end={{
                        x: 0.5, y: 1
                    }}
                    style={StyleSheet.absoluteFill}/>
            </View>

            <Pressable
                onPress={() => {
                    navigation.goBack();
                }}
                className={"flex-row items-center justify-between w-full gap-[1rem]"}
            >
                <View
                    className={"h-[3rem] border-[1px] border-black/10 aspect-square bg-white rounded-full justify-center items-center"}>
                    <Entypo
                        style={{
                            transform: [
                                { translateX: -1}
                            ]
                        }}
                        name="chevron-left" size={20} color="rgba(0, 0, 0, 0.75)" />
                </View>
                <Text className={"font-semibold text-[1.2rem]"}>
                    {name}
                </Text>

                <View
                    className={"h-[3.5rem] mb-[1rem] invisible aspect-square bg-white justify-center items-center"}>
                    {/*<AntDesign name="arrowleft" size={24} color="rgba(0, 0, 0, 0.75)"/>*/}
                </View>
            </Pressable>
        </View>
    )
}