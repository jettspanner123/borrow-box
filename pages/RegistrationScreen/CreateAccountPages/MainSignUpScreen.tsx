import React from "react";
import {View, Text, Image, Pressable, Keyboard, Dimensions, ActivityIndicator} from "react-native";
import SecondaryPageHeaderWithBackButton from "../../../components/shared/SecondaryPageHeader";
import ScreenHeader from "../../../components/shared/ScreenHeader";
import ScreenDescription from "../../../components/shared/ScreenDescription";
import CustomTextField from "../../../components/shared/CustomTextField";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import Animated, {
    Easing,
    EntryExitAnimationFunction, FadeIn, FadeOut,
    LinearTransition, SharedValue, useAnimatedStyle, useSharedValue, withRepeat, withSequence,
    withTiming,
} from "react-native-reanimated";
import {z} from "zod";
import {useNavigation} from "@react-navigation/native";
import {SCREENS} from "../../../App";
import {useNewUserSignUpStore} from "../../../store/NewUserSignUpStore";

const {width: SCREEN_WIDTH} = Dimensions.get("window");

export default function MainSignUpScreen(): React.JSX.Element {


    const navigation = useNavigation();

    const [email, setEmail] = React.useState<string>("");
    const [formError, setFormError] = React.useState<string>("");
    const [isKeyboardOpen, setKeyboardOpen] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    const emailFormShakeOffset: SharedValue<number> = useSharedValue(0);
    const emailFormShakeOffsetAnimation = useAnimatedStyle(() => {
        return {
            transform: [{translateX: emailFormShakeOffset.value}]
        }
    });

    React.useEffect(() => {
        const willKeyboardShow = Keyboard.addListener("keyboardWillShow", () => {
            setKeyboardOpen(true);
        })
        const willKeyboardHide = Keyboard.addListener("keyboardWillHide", () => {
            setKeyboardOpen(false);
        })
        return () => {
            willKeyboardHide.remove();
            willKeyboardShow.remove();
        }
    }, []);


    async function submitForm(): Promise<void> {
        const emailSchema: z.ZodEmail = z.email();
        const res: z.ZodSafeParseResult<string> = emailSchema.safeParse(email);


        if (res.success) {

            setLoading(true);
            Keyboard.dismiss();

            setTimeout(() => {
                // @ts-ignore
                navigation.navigate(SCREENS.BasicInformationScreen)
            }, 1000);
        } else {
            setFormError("Please enter a valid email.")
            setTimeout(() => setFormError(""), 3000);

            emailFormShakeOffset.value = withSequence(
                withTiming(-10, {duration: 50}),
                withRepeat(
                    withTiming(10, {duration: 50}),
                    4,
                    true
                ),
                withTiming(0, {duration: 50}),
            );

            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

            // Slight delay before next feedback
            await new Promise((resolve) => setTimeout(resolve, 100));

            // Step 2: error notification
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

            // Another short delay
            await new Promise((resolve) => setTimeout(resolve, 50));

            // Step 3: subtle selection feedback, to finish
            await Haptics.selectionAsync();

        }

        setLoading(false);
    }

    return (
        <View className={"h-screen w-screen bg-white"}>
            <SecondaryPageHeaderWithBackButton name={""}/>
            <View style={{flex: 1}} className={"bg-gray-100 pt-[13vh] px-[1.5rem]"}>


                <ScreenHeader text={"Create a brand new account 😎"}/>
                <ScreenDescription text={"Please choose one of the following options to create your new account."}/>


                {/*MARK: This is the email form*/}
                <Animated.View
                    style={emailFormShakeOffsetAnimation}
                    className={"relative mt-[1rem]"}>
                    <CustomTextField
                        onChange={(e: string): void => setEmail(e)}
                        value={email}
                        isSecure={false}
                        placeholder={"Email"}
                        keyboardType={"email-address"}
                        icon={
                            <MaterialIcons name="email" size={24}
                                           color={formError.length > 0 ? "#EF4444" : "rgba(0, 0, 0, 0.3)"}/>
                        }
                        wrapperFieldStyles={formError.length > 0 ? "border-red-500" : ""}
                        inputFieldStyles={formError.length > 0 ? "placeholder:text-red-500 text-red-500" : ""}
                    />

                    {formError.length > 0 && (
                        <Animated.Text
                            key={formError}
                            entering={FadeIn}
                            exiting={FadeOut}
                            layout={LinearTransition}
                            className={"text-red-500 text-center text-[1.15rem] py-[1rem]"}>{formError}</Animated.Text>
                    )}

                    <View
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        }}
                        pointerEvents={"box-none"}
                        className={"justify-center translate-y-[0.5rem] items-end"}
                    >
                        {
                            isKeyboardOpen && (
                                <Pressable
                                    onPress={async () => {
                                        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                        Keyboard.dismiss();
                                    }}
                                    className={"p-[1.5rem]"}>
                                    <MaterialIcons name="keyboard-hide" size={24} color="rgba(0, 0, 0, 0.3)"/>
                                </Pressable>
                            )
                        }
                    </View>
                </Animated.View>


                {/*MARK: Proceed furterh button*/}
                {
                    email.length > 0 && (
                        <Pressable onPress={submitForm}>
                            <Animated.View
                                entering={CustomButtonSlideInAnimation}
                                exiting={CustomButtonSlideOutAnimation}
                                layout={LinearTransition}
                                className={"bg-black origin-top p-[1rem] rounded-xl h-[3.5rem] w-full justify-center items-center mt-[1rem]"}>
                                {
                                    loading ? (
                                        <ActivityIndicator size={"small"} color={"white"}/>
                                    ) : (
                                        <Text className={"font-bold text-white"}>
                                            Proceed Further
                                        </Text>
                                    )
                                }
                            </Animated.View>
                        </Pressable>
                    )
                }


                {/*MARK: THis is the divider*/}
                <Animated.View
                    layout={LinearTransition}
                    className={"w-full flex-row gap-[0.5rem] items-center mt-[2rem]"}>
                    <View className={"h-[1px] flex-1 bg-black/30"}/>
                    <Text className={"font-bold text-black/30"}>OR</Text>
                    <View className={"h-[1px] flex-1 bg-black/30"}/>
                </Animated.View>


                {/*MARK: Sign UP with Google button*/}
                <Animated.View
                    layout={LinearTransition}
                    className={"bg-white border-[0.5px] border-black/30 rounded-xl p-[1rem] justify-center items-center flex-row gap-[1rem] mt-[2rem]"}>

                    <Image
                        source={require("../../../assets/icons/google.png")}
                        style={{
                            height: 20,
                            width: 20
                        }}
                    />
                    <Text className={"font-semibold text-black/70"}>Sign Up With Google</Text>
                </Animated.View>

            </View>
        </View>
    )
}

const CustomButtonSlideOutAnimation: EntryExitAnimationFunction = (values: any) => {
    "worklet";
    const animations = {
        originX: withTiming(values.currentOriginX + SCREEN_WIDTH, {
            duration: 500,
            easing: Easing.bezier(0.85, 0, 0.15, 1)
        })
    };
    const initialValues = {
        originX: values.currentOriginX,
    };
    return {
        initialValues,
        animations
    }
}

const CustomButtonSlideInAnimation: EntryExitAnimationFunction = (values: any) => {
    "worklet";
    const animations = {
        originX: withTiming(values.targetOriginX, {
            duration: 500,
            easing: Easing.bezier(0.85, 0, 0.15, 1)
        })
    };
    const initialValues = {
        originX: values.targetOriginX + SCREEN_WIDTH,
    };
    return {
        initialValues,
        animations
    }
}