import React from "react";
import {View} from "react-native";

export default function PageContainer({children}: { children: React.ReactNode }): React.JSX.Element {
    return (
        <View style={{flex: 1}} className={"bg-gray-100 pt-[13vh] px-[1.5rem] w-full"}>
            {children}
        </View>
    )
}