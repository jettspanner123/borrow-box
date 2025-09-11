import {Easing, EntryExitAnimationFunction, withTiming} from "react-native-reanimated";
import {Dimensions} from "react-native";

const {width: SCREEN_WIDTH} = Dimensions.get("window");

const CustomButtonSlideInAnimation: EntryExitAnimationFunction = (values: any) => {
    "worklet";
    const animations = {
        originX: withTiming(values.targetOriginX, {
            duration: 500,
            easing: Easing.bezier(0.85, 0, 0.15, 1)
        })
    };
    const initialValues = {
        originX: values.targetOriginX - SCREEN_WIDTH,
    };
    return {
        initialValues,
        animations
    }
}

export default CustomButtonSlideInAnimation;