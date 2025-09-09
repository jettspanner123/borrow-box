import React from "react";
import {Pressable, TextInput, View} from "react-native";
import Feather from '@expo/vector-icons/Feather';

interface CustomTextFieldProps {
    onChange: (text: string) => void;
    value: string;
    inputFieldStyles?: string;
    wrapperFieldStyles?: string;
    isSecure: boolean;
    placeholder: string;
    icon?: React.ReactNode;
}

export default function CustomTextField(
    {onChange, value, inputFieldStyles, wrapperFieldStyles, isSecure, placeholder, icon}
    : CustomTextFieldProps): React.JSX.Element {

    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    return (
        <View
            className={`w-full flex-row items-center border-[0.5px] border-black/30 p-[1rem] rounded-xl mt-[1rem] gap-[0.75rem] ${wrapperFieldStyles && wrapperFieldStyles}`}>
            {
                icon && (
                    icon
                )
            }
            <TextInput
                className={`w-full text-[1rem] ${inputFieldStyles && inputFieldStyles}`}
                value={value}
                secureTextEntry={showPassword ? false : isSecure}
                onChangeText={(e: string): void => onChange(e)}
                placeholder={placeholder}
            />
            {
                isSecure && (
                    <Pressable
                        onPress={() => setShowPassword(!showPassword)}
                        className={"absolute right-[1rem] p-[0.5rem] "}
                    >
                        <View>
                            {
                                showPassword ? <Feather name="eye" size={20} color="rgba(0, 0, 0, 0.3)"/> :
                                    <Feather name="eye-off" size={20} color="rgba(0, 0, 0, 0.3)"/>
                            }
                        </View>
                    </Pressable>
                )
            }
        </View>
    )
}