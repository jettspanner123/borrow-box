import React from "react";
import {View, Text, KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import SecondaryPageHeaderWithBackButton from "../../../components/shared/SecondaryPageHeader";
import ScreenHeader from "../../../components/shared/ScreenHeader";
import PageContainer from "../../../components/shared/PageContainer";
import ScreenDescription from "../../../components/shared/ScreenDescription";
import SectionBreak from "../../../components/shared/Sectionbreak";
import CustomTextField from "../../../components/shared/CustomTextField";

export default function AddressInformationScreen(): React.JSX.Element {

    const [buildingDetails, setBuildingDetails] = React.useState<string>("");
    const [areaDetails, setAreaDetails] = React.useState<string>("");
    const [landmark, setLandmark] = React.useState<string>("");
    const [pincode, setPincode] = React.useState<string>("");
    const [state, setState] = React.useState<string>("");

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
                    <ScreenHeader text={"State Your Habitation 📍"}/>
                    <ScreenDescription text={"Unveil your sanctuary to connect with local services."}/>


                    <SectionBreak text={"Building / Flat Details"}/>
                    <View className={"mt-[-0.5rem]"}>
                        <CustomTextField
                            onChange={(e: string): void => setBuildingDetails(e)}
                            value={buildingDetails}
                            isSecure={false}
                            placeholder={"Building Address"}
                            keyboardType={"default"}
                        />
                    </View>

                    <SectionBreak text={"Area / Street Address"}/>
                    <View className={"mt-[-0.5rem]"}>
                        <CustomTextField
                            onChange={(e: string): void => setBuildingDetails(e)}
                            value={buildingDetails}
                            isSecure={false}
                            placeholder={"Street Address"}
                            keyboardType={"default"}
                        />
                    </View>


                    <SectionBreak text={"State Addres"}/>
                    <View className={"flex-row gap-[0.75rem]"}>
                        <View className={"mt-[-0.5rem] flex-1"}>
                            <CustomTextField
                                onChange={(e: string): void => setBuildingDetails(e)}
                                value={buildingDetails}
                                isSecure={false}
                                placeholder={"Pin Code"}
                                keyboardType={"default"}
                            />
                        </View>

                        <View className={"mt-[-0.5rem] flex-1"}>
                            <CustomTextField
                                onChange={(e: string): void => setBuildingDetails(e)}
                                value={buildingDetails}
                                isSecure={false}
                                placeholder={"State"}
                                keyboardType={"default"}
                            />
                        </View>
                    </View>


                    <SectionBreak text={"Area Landmarks"}/>
                    <View className={"mt-[-0.5rem]"}>
                        <CustomTextField
                            onChange={(e: string): void => setBuildingDetails(e)}
                            value={buildingDetails}
                            isSecure={false}
                            placeholder={"Building Address"}
                            keyboardType={"default"}
                        />
                    </View>
                </PageContainer>
            </ScrollView>

        </KeyboardAvoidingView>
    )
}