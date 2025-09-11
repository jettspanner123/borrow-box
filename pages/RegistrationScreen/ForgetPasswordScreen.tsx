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
    LinearTransition
} from "react-native-reanimated";
import SectionBreak from "../../components/shared/Sectionbreak";
import {Entypo} from "@expo/vector-icons";


export default function ForgetPasswordScreen({}: {}): React.JSX.Element {

    const PhoneNumberSchema: ZodString = z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits");

    enum PhoneVerificationScreens {
        PhoneNumberFormScreen,
        PhoneNumberVerificationScreen,
        ResetPasswordScreen
    }

    const otpFieldRefOne: React.RefObject<TextInput | null> = React.useRef(null);
    const otpFieldRefTwo: React.RefObject<TextInput | null> = React.useRef(null);
    const otpFieldRefThree: React.RefObject<TextInput | null> = React.useRef(null);
    const otpFieldRefFour: React.RefObject<TextInput | null> = React.useRef(null);


    const [currentScreen, setCurrentScreen] = React.useState<PhoneVerificationScreens>(PhoneVerificationScreens.PhoneNumberFormScreen);
    const [phoneNumber, setPhoneNumber] = React.useState<string>("");
    const [OTP, setOTP] = React.useState<Array<string>>(["", "", "", ""]);
    const [isOTPLoading, setOTPLoading] = React.useState<boolean>(false);
    const [showOTPError, setOTPError] = React.useState<boolean>(false);

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

    React.useEffect(() => {
        if (OTP.length == 1) {
            otpFieldRefTwo.current?.focus();
            console.log(OTP.length);
        } else if (OTP.length == 2) {
            otpFieldRefThree.current?.focus();
            console.log(OTP.length);
        } else if (OTP.length == 3) {
            otpFieldRefFour.current?.focus();
            console.log(OTP.length);
        }
    }, [OTP]);


    async function getOTP(): Promise<void> {
        setOTPLoading(true);
        setTimeout(() => {
            setOTPLoading(false);
            setCurrentScreen(PhoneVerificationScreens.PhoneNumberVerificationScreen);
        }, 3000);
        Keyboard.dismiss();
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }

    async function checkOTP(): Promise<void> {
        setOTPLoading(true);
        setTimeout(() => {
            setOTPLoading(false);
            setCurrentScreen(PhoneVerificationScreens.ResetPasswordScreen);
        }, 3000);
        Keyboard.dismiss();
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    const handleChange = (text: string, index: number) => {
        // Update the digit in the right spot
        const newOTP = [...OTP];
        newOTP[index] = text;
        setOTP(newOTP);

        // Auto move to next field
        if (text && index === 0) otpFieldRefTwo.current?.focus();
        if (text && index === 1) otpFieldRefThree.current?.focus();
        if (text && index === 2) otpFieldRefFour.current?.focus();
    };

    interface ResetPasswordVariables {
        passwordRules: Array<string>
    }

    const ResetPasswordVariables: ResetPasswordVariables = {
        passwordRules: [
            "The Password Should Be 8 Characters Long.",
            "Password Should Have At Least 1 Special Character. [@, #, !, $, %, ^, &, *]",
            "The Password Should Not Contain Any Slur Words!"
        ]
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
                            autoFocusDelay={600}
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
                ) : currentScreen === PhoneVerificationScreens.PhoneNumberVerificationScreen ? (
                    <Animated.View
                        className={"w-full px-[1.5rem] pt-[13vh]"}>
                        <Text className={"font-semibold text-[2.6rem]"}>Confirm Your Mobile Number ☎️</Text>
                        <Text className={"mt-[1rem] text-gray-600"}>Enter the code sent to you mobile number
                            +91 {phoneNumber}
                        </Text>

                        <View className={"w-full flex-row mt-[1.5rem] gap-[0.5rem]"}>

                            {
                                [0, 1, 2, 3].map((item: number, index: number): React.JSX.Element => {
                                    function getRef() {
                                        if (index == 0) return otpFieldRefOne;
                                        else if (index == 1) return otpFieldRefTwo;
                                        else if (index == 2) return otpFieldRefThree;
                                        else return otpFieldRefFour;
                                    }

                                    return (
                                        <TextInput
                                            key={index}
                                            ref={getRef()}
                                            autoFocus={index === 0}
                                            value={OTP[index]}
                                            maxLength={1}
                                            className={"border-black/30 border-[1px] text-center flex-1 p-[1rem] rounded-xl text-[2rem]"}
                                            keyboardType={"number-pad"}
                                            onChangeText={(e) => handleChange(e, index)}
                                        />
                                    )
                                })
                            }

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
                            <Pressable
                                onPress={checkOTP}
                                className={"w-full justify-center items-center bg-black rounded-xl h-[3.5rem]"}>
                                {
                                    isOTPLoading ? (
                                        <ActivityIndicator size={"small"} color={"white"}/>
                                    ) : (
                                        <Text className={"text-white font-bold"}>Confirm</Text>
                                    )
                                }
                            </Pressable>

                        </Animated.View>
                    </Animated.View>
                ) : (
                    <Animated.View
                        className={"w-full px-[1.5rem] pt-[13vh]"}>
                        <Text className={"font-semibold text-[2.6rem]"}>Set Up Your New Password 🔑</Text>
                        <Text className={"mt-[1rem] text-gray-600"}>
                            We’ll help you set a strong, safe, and secure password.
                        </Text>

                        <SectionBreak text={"New Password"} />

                        <CustomTextField
                            onChange={(e: string): void => {
                            }}
                            value={""}
                            isSecure={false}
                            placeholder={"New Password"}
                            keyboardType={"visible-password"}
                            icon={
                                <FontAwesome5 name="key" size={20} color="rgba(0, 0, 0, 0.3)"/>
                            }
                            wrapperFieldStyles={"mt-[0.45rem]"}
                        />


                        <SectionBreak text={"Comfirm Password"} />
                        <CustomTextField
                            onChange={(e: string): void => {
                            }}
                            value={""}
                            isSecure={false}
                            placeholder={"New Password"}
                            keyboardType={"visible-password"}
                            icon={
                                <FontAwesome5 name="key" size={20} color="rgba(0, 0, 0, 0.3)"/>
                            }
                            wrapperFieldStyles={"mt-[0.45rem]"}
                        />


                        <SectionBreak text={"Password Rules"} />
                        {
                            ResetPasswordVariables.passwordRules.map((item: string, index: number): React.JSX.Element => {
                                return (
                                    <View key={index} className={"mt-[0.45rem] flex-row items-center"}>
                                        <Entypo
                                            style={{
                                                transform: [
                                                    {
                                                        translateY: index > 0 ? -8 : 0
                                                    }
                                                ]
                                            }}
                                            name="dot-single" size={24} color="rgba(0, 0, 0, 0.5)" />
                                        <Text className={"font-light flex-1 text-black/50"}>{item}</Text>
                                    </View>
                                )
                            })
                        }
                    </Animated.View>
                )
            }
        </Animated.View>
    )
}


