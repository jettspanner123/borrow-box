import {create} from "zustand";
import {User, UserSchema} from "../models/UseModel";


interface UserSignUpStoreType {
    user: User;
    setUser: (user: Partial<User>) => void;
    resetUser: () => void;
}

export const useNewUserSignUpStore = create<UserSignUpStoreType>((set, get) => ({
    user: UserSchema.parse({}),
    setUser: (user) => set((state) => ({
        user: {...state.user, ...user, address: {...state.user.address, ...user.address}}
    })),
    resetUser: () => set({user: UserSchema.parse({})})
}));