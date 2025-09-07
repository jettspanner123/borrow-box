import {create} from "zustand";

export interface RegistrationScreenStoreInterface {
    isRegistrationScreenVisible: boolean;
    toggleRegistrationScreenVisibility: () => void;
    setRegistrationScreenVisibility: (visible: boolean) => void;
}

export const useRegistrationScreenStore = create<RegistrationScreenStoreInterface>((set, get) => ({
    isRegistrationScreenVisible: false,
    toggleRegistrationScreenVisibility: () => set((state) => ({
        isRegistrationScreenVisible: !state.isRegistrationScreenVisible
    })),
    setRegistrationScreenVisibility: (visible: boolean): void => set({isRegistrationScreenVisible: visible}),
}));