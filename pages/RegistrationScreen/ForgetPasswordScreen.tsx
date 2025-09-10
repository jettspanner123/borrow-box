import React from "react";
import {
    View,
    Text,
    Pressable,
    ActivityIndicator,
    Keyboard,
    TextInput,
} from "react-native";
import SecondaryPageHeaderWithBackButton from "../../components/shared/SecondaryPageHeader";
import CustomTextField from "../../components/shared/CustomTextField";
import {z, ZodString} from "zod";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as Haptics from "expo-haptics";
import Animated, {
    SharedValue,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    SlideOutLeft,
    SlideOutRight,
    SlideInRight, SlideInLeft, LinearTransition
} from "react-native-reanimated";


export default function ForgetPasswordScreen({}: {}): React.JSX.Element {

    const PhoneNumberSchema: ZodString = z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits");

    enum PhoneVerificationScreens {
        PhoneNumberFormScreen,
        PhoneNumberVerificationScreen
    }

    const [currentScreen, setCurrentScreen] = React.useState<PhoneVerificationScreens>(PhoneVerificationScreens.PhoneNumberVerificationScreen);

    const [phoneNumber, setPhoneNumber] = React.useState<string>("");
    const [OTP, setOTP] = React.useState<string>("");
    const [isOTPLoading, setOTPLoading] = React.useState<boolean>(false);

    const bottomPaddingForKeyboard: SharedValue<number> = useSharedValue(64);

    const bottomPaddingForKeyboardAnimation = useAnimatedStyle(() => {
        return {
            paddingBottom: bottomPaddingForKeyboard.value
        }
    });

    React.useEffect(() => {
        const willShowEvent = Keyboard.addListener("keyboardWillShow", (e) => {
            bottomPaddingForKeyboard.value = withTiming(e.endCoordinates.height + 20);
        })

        const willHideEvent = Keyboard.addListener("keyboardWillHide", () => {
            bottomPaddingForKeyboard.value = withTiming(40);
        })
        return () => {
            willShowEvent.remove();
            willHideEvent.remove();
        }
    });


    async function getOTP(): Promise<void> {
        setOTPLoading(true);
        setTimeout(() => {
            setOTPLoading(false);
            setCurrentScreen(PhoneVerificationScreens.PhoneNumberVerificationScreen);
        }, 3000);
        Keyboard.dismiss();
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }

    return (
        <Animated.View
            layout={LinearTransition}
            className={"h-screen relative w-screen justify-start items-center bg-gray-100"}>
            <SecondaryPageHeaderWithBackButton
                name={""}
            />
            {
                currentScreen === PhoneVerificationScreens.PhoneNumberFormScreen ? (
                    <Animated.View
                        layout={LinearTransition}
                        entering={SlideInLeft}
                        exiting={SlideOutLeft}
                        className={'w-full px-[1.5rem] pt-[13vh]'}>

                        <Text className={"font-semibold text-[2.6rem]"}>Enter you phone number ☎️</Text>
                        <Text className={"mt-[1rem] text-gray-600"}>We will send you and OTP verification to you.</Text>

                        <CustomTextField
                            onChange={(e: string) => setPhoneNumber(e)}
                            value={phoneNumber}
                            isSecure={false}
                            placeholder={"Phone Number"}
                            wrapperFieldStyles={"mt-[2rem]"}
                            icon={
                                <FontAwesome5 name="phone-alt" size={20} color="rgba(0, 0, 0, 0.25)"/>
                            }
                            autoFocus={true}
                            autoFocusDelay={500}
                            keyboardType={"numeric"}
                        />

                        <Pressable onPress={getOTP}>
                            <View
                                className={"w-full h-[3.15rem] bg-black justify-center items-center p-[1rem] rounded-xl mt-[1.5rem]"}>

                                {
                                    isOTPLoading ? (
                                        <ActivityIndicator size={"small"} color={"white"}/>
                                    ) : (
                                        <Text className={"text-white text-[1rem] font-bold"}>
                                            Get OTP
                                        </Text>
                                    )
                                }
                            </View>
                        </Pressable>
                    </Animated.View>
                ) : (
                    <Animated.View
                        layout={LinearTransition}
                        entering={SlideInRight}
                        exiting={SlideOutRight}
                        className={"w-full px-[1.5rem] pt-[13vh]"}>
                        <Text className={"font-semibold text-[2.6rem]"}>Confirm Your Mobile Number ☎️</Text>
                        <Text className={"mt-[1rem] text-gray-600"}>Enter the code sent to you mobile number
                            +91 {phoneNumber}
                        </Text>

                        <View className={"w-full flex-row mt-[1.5rem] gap-[0.5rem]"}>
                            <TextInput
                                autoFocus
                                value={OTP.split("")[0]}
                                maxLength={1}
                                className={"border-black/30 border-[1px] text-center flex-1 p-[1rem] rounded-xl text-[2rem]"}
                                keyboardType={"number-pad"}
                            />

                            <TextInput
                                autoFocus
                                value={OTP.split("")[0]}
                                maxLength={1}
                                className={"border-black/30 border-[1px] text-center flex-1 p-[1rem] rounded-xl text-[2rem]"}
                                keyboardType={"number-pad"}
                            />

                            <TextInput
                                autoFocus
                                value={OTP.split("")[0]}
                                maxLength={1}
                                className={"border-black/30 border-[1px] text-center flex-1 p-[1rem] rounded-xl text-[2rem]"}
                                keyboardType={"number-pad"}
                            />

                            <TextInput
                                autoFocus
                                value={OTP.split("")[0]}
                                maxLength={1}
                                className={"border-black/30 border-[1px] text-center flex-1 p-[1rem] rounded-xl text-[2rem]"}
                                keyboardType={"number-pad"}
                            />
                        </View>


                        {/*MARK: Option buttons*/}

                        <View className={"w-full gap-[0.5rem] mt-[1rem] flex-row justify-between items-center"}>
                            <Pressable
                                onPress={() => {
                                    setCurrentScreen(PhoneVerificationScreens.PhoneNumberFormScreen)
                                }}
                                className={"flex-1 bg-gray-200 border-[0.5px] border-black/10 p-[1rem] rounded-xl"}>
                                <Text className={"text-[1.1rem] text-center"}>
                                    Change Number
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={() => {
                                    Keyboard.dismiss();
                                }}
                                className={"flex-1 bg-gray-200 border-[0.5px] border-black/10 p-[1rem] rounded-xl"}>
                                <Text className={"text-[1.1rem] text-center"}>
                                    Resend OTP
                                </Text>
                            </Pressable>
                        </View>


                        {/*MARK: Submit button*/}
                        <Animated.View
                            style={bottomPaddingForKeyboardAnimation}
                            pointerEvents={"box-none"}
                            className={"absolute  h-screen w-screen justify-end items-center px-[1.5rem]"}>
                            <Pressable className={"w-full justify-center items-center bg-black rounded-xl h-[3.5rem]"}>
                                <Text className={"text-white font-bold"}>Confirm</Text>
                            </Pressable>

                        </Animated.View>
                    </Animated.View>
                )
            }
        </Animated.View>
    )
}


