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
import {Entypo, FontAwesome} from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import * as Haptics from "expo-haptics";
import Animated, {
    Easing, EntryExitAnimationFunction, FadeInDown, FadeInUp, FadeOutDown,
    LinearTransition,
    SharedValue, SlideInDown, SlideInUp,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import CustomSlideInAnimation from "../../../constants/Animations/CustomSlideInAnimation";
import CustomSlideOutAnimation from "../../../constants/Animations/CustomSlideOutAnimation";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function BasicInformationScreen(): React.JSX.Element {
    const [dummyData, setDummyData] = React.useState<string>("");

    const [showAgePicker, setShowAgePicker] = React.useState<boolean>(false);
    const [sliderAge, setSliderAge] = React.useState<number>(21);
    const [showGenderPicker, setShowGenderPicker] = React.useState<boolean>(false);
    const [showMaritalStatusPicker, setShowMaritalStatusPicker] = React.useState<boolean>(false);
    const [showDOBPicker, setShowDOBPicker] = React.useState<boolean>(false);

    React.useEffect(() => {
        (

            async () => {
                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
        )()
    }, [sliderAge]);


    const GENDER_BUTTON_EXTENDED_HEIGHT: number = 200;
    const GENDER_BUTTON_COMPRESSED_HEIGHT: number = 50;
    const MARITAL_BUTTON_EXTENDED_HEIGHT: number = 200;
    const MARITAL_BUTTON_COMPRESSED_HEIGHT: number = 50;
    const DOB_BUTTON_COMPRESSED_HEIGHT: number = 50;
    const DOB_BUTTON_EXTENDED_HEIGHT: number = 270;

    enum GENDER_OPTIONS {
        MALE = "Male 🗿",
        FEMALE = "Female 👧🏻",
        IN_BETWEEN = "In Between 🏳️‍🌈"
    }

    enum MARITAL_STATUS {
        BACHELOR = "Bachelor 🗿",
        MARRIED = "Married 🥸",
        ASEXUAL_HOMO = "Asexual Homo 🏳️‍🌈",
    }

    const [currentSelectedGender, setCurrentSelectedGender] = React.useState<GENDER_OPTIONS>(GENDER_OPTIONS.MALE);
    const [currentSelectedMaritalStatus, setCurrentSelectedMaritalStatus] = React.useState<MARITAL_STATUS>(MARITAL_STATUS.BACHELOR);
    const [currentSelectedDOB, setCurrentSelectedDOB] = React.useState(new Date());

    const genderButtonHeight: SharedValue<number> = useSharedValue(GENDER_BUTTON_COMPRESSED_HEIGHT);
    const maritalStatusButtonHeight: SharedValue<number> = useSharedValue(MARITAL_BUTTON_COMPRESSED_HEIGHT);
    const dobButtonHeight: SharedValue<number> = useSharedValue(DOB_BUTTON_COMPRESSED_HEIGHT);

    const genderButtonHeightAnimation = useAnimatedStyle(() => {
        return {
            height: genderButtonHeight.value
        }
    });
    const maritalStatusButtonHeightAnimation = useAnimatedStyle(() => {
        return {
            height: maritalStatusButtonHeight.value
        }
    });
    const dobButtonHeightAnimation = useAnimatedStyle(() => {
        return {
            height: dobButtonHeight.value
        }
    });

    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >

            <SecondaryPageHeaderWithBackButton name={""}/>




            {/*MARK: THe scroll view*/}
            <ScrollView
                style={{flex: 1}}
                contentContainerStyle={{flexGrow: 1, paddingBottom: 200}}
                keyboardShouldPersistTaps="never"
                className={"bg-gray-100"}
            >


                {/*// MARK: This is the person information thing....*/}
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


                        {/*MARK: Gender*/}
                        <Pressable
                            onPress={async () => {
                                if (showAgePicker) setShowAgePicker(false);
                                genderButtonHeight.value = withTiming(showGenderPicker ? GENDER_BUTTON_COMPRESSED_HEIGHT : GENDER_BUTTON_EXTENDED_HEIGHT, {
                                    duration: 500,
                                    easing: Easing.bezier(0.85, 0, 0.15, 1)
                                });
                                setShowGenderPicker(!showGenderPicker);
                                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            }}
                            style={{flex: 1}}>
                            <Animated.View
                                style={genderButtonHeightAnimation}
                                layout={LinearTransition.duration(100)}
                                className={`${CustomTextFieldWrapperStyles} flex-[2.5] p-[1rem] h-[0] flex-col overflow-hidden`}>


                                {/*MARK: This is the placeholder*/}
                                <Animated.View
                                    layout={LinearTransition.duration(100)}
                                    className={"flex-row gap-[0.75rem] w-full items-center"}>
                                    <FontAwesome name="female" size={20} color="rgba(0, 0, 0, 0.3)"/>
                                    <Text>{currentSelectedGender}</Text>
                                    <Entypo
                                        style={{marginLeft: "auto"}}
                                        name="dots-three-horizontal"
                                        size={20}
                                        color="rgba(0, 0, 0, 0.3)"/>
                                </Animated.View>


                                {/*MARK: GEnder picker*/}
                                {
                                    showGenderPicker && (
                                        <Animated.View
                                            entering={FadeInDown}
                                            exiting={FadeOutDown}
                                            layout={LinearTransition.duration(100)}
                                            className={"w-full"}>
                                            {
                                                Object.values(GENDER_OPTIONS).map((gender, index: number): React.JSX.Element => {
                                                    return (
                                                        <Pressable
                                                            key={index}
                                                            onPress={async () => {
                                                                setCurrentSelectedGender(gender);
                                                                setShowGenderPicker(false);

                                                                genderButtonHeight.value = withTiming(GENDER_BUTTON_COMPRESSED_HEIGHT, {
                                                                    duration: 500,
                                                                    easing: Easing.bezier(0.85, 0, 0.15, 1)
                                                                })

                                                                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                                            }}
                                                        >
                                                            <View
                                                                className={`${currentSelectedGender === gender ? "bg-black" : "bg-gray-200"} py-[0.7rem] px-[0.5rem] rounded-xl border-black/30 border-[0.5px] mt-[0.5rem]`}>
                                                                <Text
                                                                    className={`${currentSelectedGender === gender ? "text-white" : "text-black"}`}>
                                                                    {gender}
                                                                </Text>
                                                            </View>
                                                        </Pressable>
                                                    )
                                                })
                                            }
                                        </Animated.View>
                                    )
                                }
                            </Animated.View>
                        </Pressable>


                        {/*MARK: Age*/}
                        <Pressable
                            onPress={async () => {
                                if (showAgePicker) setShowAgePicker(false);
                                setShowAgePicker(!showAgePicker)
                                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            }
                            }>
                            <Animated.View
                                layout={LinearTransition}
                                className={`${CustomTextFieldWrapperStyles} max-h-[3.5rem] flex-1 gap-[1rem] p-[1rem] flex-row justify-between items-center`}>
                                <Text className={""}>{sliderAge} y/o</Text>
                                <Entypo
                                    style={{marginLeft: "auto"}}
                                    name="dots-three-horizontal"
                                    size={20}
                                    color="rgba(0, 0, 0, 0.3)"/>
                            </Animated.View>
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


                    {/*MARK: Other informations*/}
                    <SectionBreak text={"Other Information"} additionalStyles={"mt-[3rem]"}
                                  transitionDuration={showGenderPicker ? 100 : 300}/>
                    <Animated.View
                        layout={LinearTransition.duration(showGenderPicker ? 100 : 300)}
                    >
                        <Pressable
                            className={"mt-[-0.5rem]"}
                            onPress={async () => {
                                maritalStatusButtonHeight.value = withTiming(showMaritalStatusPicker ? MARITAL_BUTTON_COMPRESSED_HEIGHT : MARITAL_BUTTON_EXTENDED_HEIGHT, {
                                    duration: 500,
                                    easing: Easing.bezier(0.85, 0, 0.15, 1)
                                });
                                setShowMaritalStatusPicker(!showMaritalStatusPicker);
                                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            }}>
                            <Animated.View
                                style={maritalStatusButtonHeightAnimation}
                                layout={LinearTransition.duration(100)}
                                className={`${CustomTextFieldWrapperStyles} flex-[2.5] p-[1rem] h-[0] flex-col overflow-hidden`}>


                                {/*MARK: This is the placeholder*/}
                                <Animated.View
                                    layout={LinearTransition.duration(100)}
                                    className={"flex-row gap-[0.75rem] w-full items-center"}>
                                    <FontAwesome name="female" size={20} color="rgba(0, 0, 0, 0.3)"/>
                                    <Text>{currentSelectedMaritalStatus}</Text>
                                    <Entypo
                                        style={{marginLeft: "auto"}}
                                        name="dots-three-horizontal"
                                        size={20}
                                        color="rgba(0, 0, 0, 0.3)"/>
                                </Animated.View>


                                {/*MARK: GEnder picker*/}
                                {
                                    showMaritalStatusPicker && (
                                        <Animated.View
                                            entering={FadeInDown}
                                            exiting={FadeOutDown}
                                            layout={LinearTransition.duration(100)}
                                            className={"w-full"}>
                                            {
                                                Object.values(MARITAL_STATUS).map((status, index: number): React.JSX.Element => {
                                                    return (
                                                        <Pressable
                                                            key={index}
                                                            onPress={async () => {
                                                                setCurrentSelectedMaritalStatus(status);
                                                                setShowMaritalStatusPicker(false);

                                                                maritalStatusButtonHeight.value = withTiming(MARITAL_BUTTON_COMPRESSED_HEIGHT, {
                                                                    duration: 500,
                                                                    easing: Easing.bezier(0.85, 0, 0.15, 1)
                                                                })

                                                                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                                            }}
                                                        >
                                                            <View
                                                                className={`${currentSelectedMaritalStatus === status ? "bg-black" : "bg-gray-200"} py-[0.7rem] px-[0.5rem] rounded-xl border-black/30 border-[0.5px] mt-[0.5rem] justify-center items-center`}>
                                                                <Text
                                                                    className={`${currentSelectedMaritalStatus === status ? "text-white" : "text-black"}`}>
                                                                    {status}
                                                                </Text>
                                                            </View>
                                                        </Pressable>
                                                    )
                                                })
                                            }
                                        </Animated.View>
                                    )
                                }
                            </Animated.View>
                        </Pressable>
                    </Animated.View>


                    {/*MARK: THis is the DOB Picker*/}
                    <Pressable
                        onPress={() => {
                            setShowDOBPicker(!showDOBPicker);
                            dobButtonHeight.value = withTiming(!showDOBPicker ? DOB_BUTTON_EXTENDED_HEIGHT : DOB_BUTTON_COMPRESSED_HEIGHT, {
                                duration: 500,
                                easing: Easing.bezier(0.85, 0, 0.15, 1)
                            });
                        }}>
                        <Animated.View
                            style={dobButtonHeightAnimation}
                            layout={LinearTransition.duration(100)}
                            className={`${CustomTextFieldWrapperStyles} p-[1rem] h-0 flex-col overflow-hidden`}>

                            {/*MARK: THIs is the dob placeholder*/}
                            <Animated.View
                                layout={LinearTransition.duration(100)}
                                className={"flex-row gap-[0.75rem] items-center w-full"}>
                                <MaterialIcons name="date-range" size={20} color="rgba(0, 0, 0, 0.3)"/>
                                <Text>{currentSelectedDOB.toLocaleDateString()}</Text>

                                <Entypo style={{marginLeft: "auto"}} name={"dots-three-horizontal"} size={20}
                                        color="rgba(0, 0, 0, 0.3)"/>
                            </Animated.View>


                            {/*MARK: THis is the actual date picker*/}
                            {
                                showDOBPicker && (
                                    <Animated.View
                                        exiting={FadeOutDown}
                                    >
                                        <RNDateTimePicker
                                            value={currentSelectedDOB}
                                            onChange={(value, date) => setCurrentSelectedDOB(date!)}
                                            display={"spinner"}
                                        />
                                    </Animated.View>
                                )
                            }
                        </Animated.View>
                    </Pressable>
                </PageContainer>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}