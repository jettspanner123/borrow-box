import React from "react";
import {
    View,
    Text,
    Pressable,
    Keyboard,
    useWindowDimensions,
    ActivityIndicator,
    Dimensions
} from "react-native";
import Animated, {
    Easing,
    SharedValue,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    EntryExitAnimationFunction,
    withDelay,

} from "react-native-reanimated";
import LottieView from "lottie-react-native";
import {z} from "zod";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CustomTextField from "../../components/shared/CustomTextField";
import * as Haptics from "expo-haptics";
import {useNavigation} from "@react-navigation/native";
import {SCREENS} from "../../App";


const {width: SCREEN_WIDTH} = Dimensions.get("window");
export default function MainRegistrationScreen(): React.JSX.Element {

    const navigation = useNavigation();

    const {height} = useWindowDimensions();

    const pageTransitionBlobScaleValue: SharedValue<number> = useSharedValue(1);
    const pageTransitionBlobScale = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: pageTransitionBlobScaleValue.value
                }
            ]
        }
    });


    // MARK: SignIn form data schema
    const SignInFormSchema = z.object({
        emailId: z.email(),
        password: z.string().length(8, "The Length of the password should be atleast 8.")
    });


    // MARK: SignIn form data
    const [signInFormData, setSignInFormData] = React.useState<{ emailId: string, password: string }>({
        emailId: "",
        password: ""
    });
    const [isFormLoading, setFormLoading] = React.useState<boolean>(false);


    // MARK: SignIn form function
    async function signIn(): Promise<void> {
        setFormLoading(true);
        setTimeout(() => {
            setFormLoading(false);
        }, 3000);
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }

    const contentViewHeadingTopMargin: SharedValue<number> = useSharedValue(0);
    const contentViewTopPosition: SharedValue<number> = useSharedValue(height * 0.43);


    const contentViewHeadingTopMarginAnimation = useAnimatedStyle(() => {
        return {
            marginTop: contentViewHeadingTopMargin.value
        }
    });

    const contentViewTopPositionAnimation = useAnimatedStyle(() => {
        return {
            top: contentViewTopPosition.value
        }
    });


    React.useEffect((): () => void => {
        const showEvent = Keyboard.addListener("keyboardDidShow", () => {
            contentViewHeadingTopMargin.value = withTiming(40, {
                duration: 250,
                easing: Easing.linear
            })
            contentViewTopPosition.value = withTiming(0, {
                duration: 500,
            });
        })

        const hideEvent = Keyboard.addListener("keyboardWillHide", () => {
            contentViewHeadingTopMargin.value = withTiming(0, {
                duration: 250,
                easing: Easing.linear
            })
            contentViewTopPosition.value = withTiming(height * 0.43, {
                duration: 500,
                easing: Easing.bezier(0.85, 0, 0.15, 1)
            })
        })

        const androidHideEvent = Keyboard.addListener("keyboardDidHide", (): void => {
            contentViewHeadingTopMargin.value = withTiming(0, {
                duration: 250,
                easing: Easing.linear
            })
            contentViewTopPosition.value = withTiming(height * 0.43, {
                duration: 500,
                easing: Easing.bezier(0.85, 0, 0.15, 1)
            })
        })

        return (): void => {
            showEvent.remove();
            hideEvent.remove();
            androidHideEvent.remove();
        }
    }, []);


    return (
        <Animated.View
            entering={CustomBackgroundColorAnimation}
            className={"w-screen h-screen items-center justify-start"}>


            {/*MARK: This is the page change transition blob*/}
            <View className={"bg-red-300 w-screen justify-between items-center absolute -translate-y-[10rem] z-[11]"}>
                <Animated.View
                    style={pageTransitionBlobScale}
                    className={"h-[10rem] w-[10rem] absolute bg-white z-[11] rounded-full"}>

                </Animated.View>
            </View>


            {/*MARK: THis is the navbar for the page*/}
            <Animated.View
                entering={CustomNavbarSlideInAnimation}
                className={"w-screen flex-row items-center justify-between mt-[3rem] p-[1.5rem]"}>
                <Animated.Text
                    className={"uppercase font-bold text-[1.5rem] text-black"}>
                    Borrow-Box
                </Animated.Text>

            </Animated.View>


            {/*MARK: THis is the main animation view*/}
            <Animated.View
                entering={CustomScaleUpAnimation}
                className={"w-screen h-[32vh]"}>
                <LottieView
                    source={require("../../assets/RegistrationPage/registration.json")}
                    autoPlay
                    loop
                    style={{
                        height: "95%",
                        width: "100%",
                    }}
                />

            </Animated.View>


            {/*MARK: This is the main content view*/}
            <Animated.View
                style={contentViewTopPositionAnimation}
                entering={CustomContentViewSlideUpAnimation}
                className={`h-screen w-screen bg-white absolute border-black/50 border-[0.5px] left-0 rounded-t-[2rem] justify-start items-start p-[1.5rem] pt-[2.5rem]`}>

                <Animated.Text
                    style={contentViewHeadingTopMarginAnimation}
                    className={`font-bold text-[2rem]`}>
                    Sign In

                </Animated.Text>


                <CustomTextField
                    onChange={(e: string): void => setSignInFormData(({emailId: e, password: signInFormData.password}))}
                    value={signInFormData.emailId}
                    isSecure={false}
                    placeholder={"Email Id"}
                    icon={
                        <MaterialIcons name="email" size={20} color="rgba(0, 0, 0, 0.2)"/>
                    }
                    keyboardType={"email-address"}
                />

                <CustomTextField
                    onChange={(e: string): void => setSignInFormData(({emailId: signInFormData.emailId, password: e}))}
                    value={signInFormData.password}
                    isSecure={true}
                    placeholder={"Password"}
                    icon={
                        <FontAwesome5 name="key" size={20} color="rgba(0, 0, 0, 0.2)"/>
                    }
                    keyboardType={"default"}
                />

                <Pressable
                    onPress={signIn}
                    className={"w-full justify-center items-center"}>
                    <View
                        className={"w-full h-[3.15rem] bg-black justify-center items-center p-[1rem] rounded-xl mt-[1.5rem]"}>
                        {
                            isFormLoading ? (
                                <ActivityIndicator color={"white"}/>
                            ) : (
                                <Text className={"text-white text-[1rem] font-semibold"}>
                                    Submit
                                </Text>
                            )
                        }
                    </View>
                </Pressable>


                <Pressable
                    onPress={() => {
                        // @ts-ignore
                        navigation.navigate(SCREENS.ForgotPasswordScreen)
                    }}
                    className={"w-full h-[3rem]"}>
                    <View
                        className={"w-full h-[3.15rem] justify-center items-center bg-gray-100 border-[0.5px] border-black/10 p-[1rem] rounded-xl mt-[0.5rem]"}>
                        <Text className={""}>Forgot Password?</Text>
                    </View>
                </Pressable>

                <View className={"w-full flex-row gap-[0.25rem] justify-center items-center mt-[6.5rem]"}>
                    <Text className={"text-[1rem]"}>
                        Don't have an account
                    </Text>
                    <Pressable onPress={signIn}>
                        <Text className={"font-bold underline p-[0.5rem] text-[1rem]"}>
                            Sign Up
                        </Text>
                    </Pressable>
                </View>


            </Animated.View>

        </Animated.View>
    )

}

const CustomForgotPasswordScreenSlideAnimation: EntryExitAnimationFunction = (values: any) => {
    "worklet";
    const animations = {
        originX: withTiming(values.targetOriginX, {
            duration: 500,
            easing: Easing.bezier(0.15, 1, 0.3, 1)
        })
    };
    const initialValues = {
        originX: values.targetOriginX + SCREEN_WIDTH,
    };
    return {
        initialValues,
        animations
    }
};

const CustomForgotPasswordScreenSlideOutAnimation: EntryExitAnimationFunction = (values: any) => {
    "worklet";
    const animations = {
        originX: withTiming(values.targetOriginX + SCREEN_WIDTH, {
            duration: 500,
            easing: Easing.bezier(0.15, 1, 0.3, 1)
        })
    };
    const initialValues = {
        originX: values.targetOriginX,
    };

    return {
        initialValues,
        animations
    }
}


const CustomNavbarSlideInAnimation: EntryExitAnimationFunction = (values: any) => {
    "worklet";
    const animations = {
        originY: withDelay(250, withTiming(values.targetOriginY, {
            duration: 750,
            easing: Easing.bezier(0.85, 0, 0.15, 1)
        }))
    };
    const initialValues = {
        originY: values.targetOriginY - 200
    };

    return {
        initialValues, animations
    }
}

const CustomBackgroundColorAnimation: EntryExitAnimationFunction = (values: any) => {
    "worklet";
    const animations = {
        backgroundColor: withDelay(500, withTiming("#F7F552", {duration: 750, easing: Easing.linear})),
    }
    const initialValues = {
        backgroundColor: "#ffffff"
    }
    return {
        initialValues,
        animations,
    }
}

const CustomScaleUpAnimation: EntryExitAnimationFunction = (value: any) => {
    "worklet";
    const animations = {
        originY: withDelay(700, withTiming(value.targetOriginY, {
            duration: 950,
            easing: Easing.bezier(0.85, 0, 0.15, 1)
        })),
    }

    const initialValues = {
        originY: value.targetOriginY + 1000,
    }

    return {
        initialValues,
        animations,
    }
}

const CustomContentViewSlideUpAnimation: EntryExitAnimationFunction = (values: any) => {
    "worklet";
    const animations = {
        originY: withDelay(500, withTiming(values.targetOriginY, {
            duration: 750,
            easing: Easing.bezier(0.85, 0, 0.15, 1)
        })),
    };
    const initialValues = {
        originY: values.targetOriginY + 1000,
    };

    return {
        initialValues,
        animations,
    }
}