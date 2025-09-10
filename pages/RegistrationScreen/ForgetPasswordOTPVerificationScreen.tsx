import React from "react";
import {Text, View} from "react-native";
import SecondaryPageHeaderWithBackButton from "../../components/shared/SecondaryPageHeader";

export default function ForgetPasswordOTPVerificationScreen(): React.JSX.Element {
    return (
        <View className={"h-screen w-screen justify-center items-center"}>
            <SecondaryPageHeaderWithBackButton
                name={""}
            />

            <View style={{flex: 1}} className={"w-full px-[1.5rem] pt-[13vh]"}>
                <Text className={"font-semibold text-[2.6rem]"}>Confirm Your Phone Number ☎️</Text>
                <Text className={"mt-[1rem] text-gray-600"}></Text>
            </View>
        </View>
    )
}