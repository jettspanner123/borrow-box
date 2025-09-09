import React from "react";
import Animated, {
    Extrapolation,
    interpolate,
    interpolateColor,
    SharedValue,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    Easing, scrollTo, FadeInDown, FadeInUp
} from "react-native-reanimated";
import {
    FlatList,
    ListRenderItemInfo, Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";
import {OnBoardingData, OnBoardingInterface} from "./OnBoardingData";
import LottieView from "lottie-react-native";
import {ReanimatedScrollEvent} from "react-native-reanimated/lib/typescript/hook/commonTypes";
import {AntDesign} from "@expo/vector-icons";
import {useRegistrationScreenStore} from "../../store/RegistrationScreenStore";

export default function OnBoardingPage(): React.JSX.Element {

    const {width: SCREEN_WIDTH} = useWindowDimensions();
    const {setRegistrationScreenVisibility} = useRegistrationScreenStore();
    const flatListRef = useAnimatedRef<FlatList<OnBoardingInterface>>();
    const x: SharedValue<number> = useSharedValue(0);
    const currentSelectedScreen: SharedValue<number> = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (scrollEvent: ReanimatedScrollEvent): void => {
            x.value = scrollEvent.contentOffset.x
            const pageIndex: number = scrollEvent.contentOffset.x / SCREEN_WIDTH;

            currentSelectedScreen.value = pageIndex;
        }
    });

    const textColorAnimation = useAnimatedStyle(() => {
        let color = interpolateColor(
            currentSelectedScreen.value,
            [0, 1, 2, 3],
            ["black", "white", "black", "white"]
        )

        return {
            color
        }
    });

    return (
        <Animated.View
            entering={FadeInDown}
        >
            <View className={"absolute w-screen z-[10] justify-between flex-row  p-[1.5rem] mt-[3rem] items-center"}>
                <Animated.Text
                    style={textColorAnimation}
                    className={"uppercase font-bold text-[1.5rem]"}>
                    Borrow-Box
                </Animated.Text>

                <TouchableOpacity onPress={() => {
                    setRegistrationScreenVisibility(true);
                }}>
                    <Animated.Text
                        style={textColorAnimation}
                    >
                        Skip
                    </Animated.Text>
                </TouchableOpacity>
            </View>
            <Animated.FlatList
                ref={flatListRef}
                onScroll={onScroll}
                data={OnBoardingData}
                renderItem={({item, index}: ListRenderItemInfo<OnBoardingInterface>): React.JSX.Element => {
                    return (
                        <CustomRenderItem item={item} index={index} scroll={x}/>
                    )
                }}
                keyExtractor={(item: OnBoardingInterface): string => item.id}
                horizontal={true}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                pagingEnabled={true}
            />
        </Animated.View>
    )
}

function CustomRenderItem({item, index, scroll}: {
    item: OnBoardingInterface,
    index: number,
    scroll: SharedValue<number>
}): React.JSX.Element {
    const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();
    const {setRegistrationScreenVisibility} = useRegistrationScreenStore();

    const circleAnimation = useAnimatedStyle(() => {
        const scale = interpolate(
            scroll.value,
            [
                (index - 1) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH
            ],
            [1, 4.2, 4.2],
            Extrapolation.CLAMP
        );

        return {
            transform: [{scale}]
        }
    });

    const lottieScaleUpAnimation = useAnimatedStyle(() => {
        const scale = interpolate(
            scroll.value,
            [
                (index - 1) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH
            ],
            [0.5, 1, 0.5],
            Extrapolation.CLAMP
        );
        return {
            transform: [
                {scale}
            ]
        }
    });

    const textSlideLeftAnimation = useAnimatedStyle(() => {
        const translateX = interpolate(
            scroll.value,
            [
                (index - 1) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH
            ],
            [50, 0, -50],
            Extrapolation.CLAMP
        );
        return {
            transform: [
                {
                    translateX
                }
            ]
        }
    });

    function lottieAnimationScale(): number {
        if (index === 0) return SCREEN_WIDTH * 1.1;
        else if (index === 1) return SCREEN_WIDTH * 1.1;
        else if (index === 2) return SCREEN_WIDTH * 0.95;
        else if (index === 3) return SCREEN_WIDTH * 0.9;
        return 0;
    }

    const nextButtonClickedScale: SharedValue<number> = useSharedValue(1);
    const nextButtonClickedArrowTranslation: SharedValue<number> = useSharedValue(0);

    const animateNextButtonClickedScale = useAnimatedStyle(() => {
        return {
            transform: [{scale: nextButtonClickedScale.value}]
        }
    });
    const animateNextButtonArrowTranslation = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: nextButtonClickedArrowTranslation.value
            }]
        }
    });

    return (
        <View
            className={"justify-start items-center h-screen w-screen pt-[5rem]"}>

            {/*MARK: Overlay holder*/}
            <View style={{
                ...StyleSheet.absoluteFillObject,
                justifyContent: "flex-end",
                alignItems: "center"
            }}>

                {/*MARK: Overlay circle*/}
                <Animated.View
                    style={[circleAnimation, {
                        backgroundColor: item.backgroundColor
                    }]}
                    className={"w-screen h-[100vw] rounded-full"}/>
            </View>


            {/*MARK: Animation holder*/}
            <Animated.View
                style={[lottieScaleUpAnimation, {
                    height: SCREEN_HEIGHT * 0.5,
                    width: SCREEN_WIDTH,
                }]}
                className={"justify-end items-center flex-1"}
            >


                {/*MARK: Animation itself*/}
                <LottieView
                    source={item.animationURL}
                    autoPlay
                    loop
                    style={
                        {
                            width: lottieAnimationScale(),
                            height: SCREEN_HEIGHT * 0.5,
                        }
                    }
                />
            </Animated.View>


            {/*MARK: Text View*/}
            <Animated.View
                style={[textSlideLeftAnimation]}
                className={"w-screen mb-[10rem]"}
            >
                <Text
                    className={"text-[2rem] w-full text-left px-[1.5rem] mt-[3rem] font-bold"}
                    style={{color: item.foregroundColor}}>
                    {item.heading}
                </Text>
                <Text
                    className={"text-[1.15rem] w-full text-left px-[1.5rem] mt-[0.5rem]"}
                    style={{color: item.foregroundColor}}>
                    {item.subHeading}
                </Text>
            </Animated.View>


            {
                index === OnBoardingData.length - 1 && (
                    <View
                        className={"h-screen w-screen absolute top-0 left-0 justify-end items-end p-[2rem]"}>
                        <Pressable onPress={() => {
                            nextButtonClickedScale.value = withTiming(22, {
                                duration: 750,
                                easing: Easing.bezier(0.85, 0, 0.15, 1)
                            });

                            nextButtonClickedArrowTranslation.value = withTiming(200, {
                                duration: 250,
                            });

                            setTimeout(() => {
                                setRegistrationScreenVisibility(true);
                            }, 1000);
                        }}>
                            <Animated.View
                                className={"bg-white h-[6rem] aspect-square rounded-full justify-center items-center"}
                                style={[animateNextButtonClickedScale]}>
                                <Animated.View style={animateNextButtonArrowTranslation}>
                                    <AntDesign name="arrowright" size={24} color="black"/>
                                </Animated.View>
                            </Animated.View>
                        </Pressable>
                    </View>
                )
            }

        </View>
    )
}