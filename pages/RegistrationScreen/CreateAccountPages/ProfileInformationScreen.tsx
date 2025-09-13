import React from "react";
import {View, Text, KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import SecondaryPageHeaderWithBackButton from "../../../components/shared/SecondaryPageHeader";
import ScreenHeader from "../../../components/shared/ScreenHeader";
import PageContainer from "../../../components/shared/PageContainer";
import ScreenDescription from "../../../components/shared/ScreenDescription";
import SectionBreak from "../../../components/shared/Sectionbreak";
import CustomTextField from "../../../components/shared/CustomTextField";

export default function ProfileInformationScreen(): React.JSX.Element {


    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            className={"bg-gray-100"}
        >

            <SecondaryPageHeaderWithBackButton name={""}/>
            <ScrollView
                style={{flex: 1}}
                contentContainerStyle={{paddingBottom: 100}}
                keyboardShouldPersistTaps="never"
                className={""}>
                <PageContainer>
                    <ScreenHeader text={"Contact Profile Information ℹ️"}/>
                    <ScreenDescription text={"Enter your contact information, and other details here."}/>


                </PageContainer>
            </ScrollView>

        </KeyboardAvoidingView>
    )
}