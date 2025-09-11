import React from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform, Pressable,
} from "react-native";
import SecondaryPageHeaderWithBackButton from "../../../components/shared/SecondaryPageHeader";
import PageContainer from "../../../components/shared/PageContainer";
import ScreenHeader from "../../../components/shared/ScreenHeader";
import ScreenDescription from "../../../components/shared/ScreenDescription";
import {
    CustomTextFieldTextInputStyles,
    CustomTextFieldWrapperStyles,
} from "../../../components/shared/CustomTextField";
import SectionBreak from "../../../components/shared/Sectionbreak";
import {Entypo} from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import * as Haptics from "expo-haptics";
import Animated, {
    Easing,
    EntryExitAnimationFunction,
    FadeInLeft,
    FadeOutRight,
    LinearTransition, SharedValue,
    SlideInLeft,
    SlideInRight, useAnimatedStyle, useSharedValue, withTiming
} from "react-native-reanimated";
import CustomSlideInAnimation from "../../../constants/Animations/CustomSlideInAnimation";
import CustomSlideOutAnimation from "../../../constants/Animations/CustomSlideOutAnimation";

export default function BasicInformationScreen(): React.JSX.Element {
    const [dummyData, setDummyData] = React.useState<string>("");

    const [showAgePicker, setShowAgePicker] = React.useState<boolean>(true);
    const [sliderAge, setSliderAge] = React.useState<number>(21);

    React.useEffect(() => {
        (

            async () => {
                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
        )()
    }, [sliderAge]);

    const ageButtonChevronRotation: SharedValue<string> = useSharedValue("0deg");
    const ageButtonChevronTranslation: SharedValue<number> = useSharedValue(-1);

    const ageButtonChevronRotationAnimation = useAnimatedStyle(() => {
        return {
            transform: [
                {rotate: ageButtonChevronRotation.value}
            ]
        }
    });
    const ageButtonChevronTranslationAnimation = useAnimatedStyle(() => {
        return {
            transform: [
                {translateY: ageButtonChevronTranslation.value},
            ]
        }
    });
    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >

            <SecondaryPageHeaderWithBackButton name={""}/>
            <ScrollView
                style={{flex: 1}}
                contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps="never"
                className={"bg-gray-100"}
            >

                <PageContainer>
                    <ScreenHeader text={"Let's Get You Started ✨"}/>
                    <ScreenDescription text={"Join us by filling out your information and start exploring now."}/>

                    <SectionBreak text={"Personal Information"}/>


                    {/*MARK: This is for first and last name*/}
                    <View className={"flex-row mt-[-0.5rem] w-full gap-[0.5rem]"}>
                        <View className={`${CustomTextFieldWrapperStyles} flex-1 p-[1rem]`}>
                            <TextInput
                                className={CustomTextFieldTextInputStyles}
                                placeholder={"First Name"}
                                value={dummyData}
                                onChangeText={setDummyData}
                            />
                        </View>

                        <View className={`${CustomTextFieldWrapperStyles} flex-1 p-[1rem]`}>
                            <TextInput
                                className={CustomTextFieldTextInputStyles}
                                placeholder={"Last Name"}
                            />
                        </View>
                    </View>


                    {/*MARK: This is for gender and age*/}
                    <View className={"w-full flex-row gap-[0.5rem]"}>
                        <View className={`${CustomTextFieldWrapperStyles} flex-[2.5] p-[1rem]`}>
                            <Text>Hello</Text>
                        </View>

                        <Pressable
                            onPress={() => {
                                setShowAgePicker(!showAgePicker)
                                ageButtonChevronRotation.value = withTiming(showAgePicker ? "180deg" : "0deg", {
                                    duration: 500,
                                });
                                ageButtonChevronTranslation.value = withTiming(showAgePicker ? 3 : 0, {
                                    duration: 500
                                });
                            }
                            }>
                            <View
                                className={`${CustomTextFieldWrapperStyles} flex-1 p-[1rem] flex-row justify-between items-center`}>
                                <Text className={""}>{sliderAge} y/o</Text>
                                <Animated.View
                                    style={ageButtonChevronTranslationAnimation}
                                >
                                    <Animated.View
                                        style={ageButtonChevronRotationAnimation}
                                    >
                                        <Entypo
                                            style={ageButtonChevronRotationAnimation}
                                            name="chevron-small-down"
                                            size={24} color="black"
                                        />
                                    </Animated.View>
                                </Animated.View>

                            </View>
                        </Pressable>
                    </View>


                    {/*MARK: This is the age picker*/}
                    {
                        showAgePicker && (
                            <Animated.View
                                entering={CustomSlideInAnimation}
                                exiting={CustomSlideOutAnimation}
                                layout={LinearTransition}
                                className={"p-[1.5rem] rounded-xl bg-white border-[0.5px] border-black/30 mt-[1rem]"}

                            >

                                <Text className={"font-bold text-black text-[2.5rem] px-[0.25rem]"}>
                                    {sliderAge} <Text className={"text-[1.5rem] text-gray-500"}>years old</Text>
                                </Text>

                                <View
                                    className={`${sliderAge <= 15 ? "bg-blue-300/30" : sliderAge <= 25 ? "bg-pink-300/30" : sliderAge <= 35 ? "bg-orange-300/30" : sliderAge <= 50 ? "bg-yellow-300/30" : sliderAge <= 90 ? "bg-red-300/30" : "bg-violet-300/30"} border-[0.5px] 
                                    ${sliderAge <= 15 ? "border-blue-800" : sliderAge <= 25 ? "border-pink-800" : sliderAge <= 35 ? "border-orange-800" : sliderAge <= 50 ? "border-yellow-800" : sliderAge <= 90 ? "border-red-800" : "border-violet-800"} 
                                    p-[0.5rem] px-[1rem] rounded-xl mb-[1rem] mt-[0.5rem]`}>
                                    <Text
                                        className={`${sliderAge <= 15 ? "text-blue-800" : sliderAge <= 25 ? "text-pink-800" : sliderAge <= 35 ? "text-orange-800" : sliderAge <= 50 ? "text-yellow-800" : sliderAge <= 90 ? "text-red-800" : "text-violet-800"}`}>
                                        {
                                            sliderAge <= 15 ? "Go to your mom. KID! 🤫" : sliderAge <= 25 ? "So you are around that AGE huh! 🫦" : sliderAge <= 35 ? "Get a job, BITCH! 🥸" : sliderAge <= 50 ? "Got any DAD jokes yet? 🤠" : sliderAge <= 90 ? "Man you're old as fk!!!! ‼️" : "You are just lying, man!!!!"
                                        }
                                    </Text>
                                </View>
                                <View className={"w-full flex-row gap-[1rem] items-end"}>
                                    <Text className={"text-[2rem] mb-[0.5rem]"}>👶🏻</Text>
                                    <Slider
                                        step={1}
                                        minimumValue={10}
                                        maximumValue={100}
                                        value={sliderAge}
                                        onValueChange={setSliderAge}
                                        style={{
                                            marginTop: 16,
                                            flex: 1
                                        }}
                                    />
                                    <Text className={"text-[2rem] mb-[0.5rem]"}>
                                        👴🏻
                                    </Text>
                                </View>
                            </Animated.View>
                        )
                    }
                </PageContainer>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
