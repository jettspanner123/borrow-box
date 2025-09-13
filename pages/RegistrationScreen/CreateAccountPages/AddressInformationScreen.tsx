import React from "react";
import {View, Text, KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import SecondaryPageHeaderWithBackButton from "../../../components/shared/SecondaryPageHeader";

export default function AddressInformationScreen(): React.JSX.Element {
    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >

            <SecondaryPageHeaderWithBackButton name={""} />
            <ScrollView style={{ flex: 1 }} className={"bg-gray-100"}>

            </ScrollView>

        </KeyboardAvoidingView>
    )
}