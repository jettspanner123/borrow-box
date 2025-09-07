import {AnimationObject} from "lottie-react-native";

function UUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
        const random = (Math.random() * 16) | 0;
        const value = char === 'x' ? random : (random & 0x3) | 0x8;
        return value.toString(16);
    });
}

export interface OnBoardingInterface {
    id: string;
    heading: string;
    subHeading: string;
    animationURL: AnimationObject;
    backgroundColor: string;
    foregroundColor: string;
}

export const OnBoardingData: Array<OnBoardingInterface> = [
    {
        id: UUID(),
        heading: "Borrow Instead of Buying!",
        subHeading: "Save money and reduce clutter by borrowing items from people nearby.",
        animationURL: require("../../assets/OnBoardingPage/first.json"),
        backgroundColor: "#ffffff",
        foregroundColor: "#000000"
    },
    {
        id: UUID(),
        heading: "Lend What You Own, Share Smarter",
        subHeading: "Our applicaiton makes lending simple, helping your items reach the right people.",
        animationURL: require("../../assets/OnBoardingPage/first.json"),
        backgroundColor: "#000000",
        foregroundColor: "#ffffff"
    },
    {
        id: UUID(),
        heading: "AI Bot That Works And Finds For You",
        subHeading: "AI suggests items you may need and improves every lending experience.",
        animationURL: require("../../assets/OnBoardingPage/second.json"),
        backgroundColor: "#ffffff",
        foregroundColor: "#000000"
    },
    {
        id: UUID(),
        heading: "Safer Sharing, Stronger Connections",
        subHeading: "Stay secure with ratings, reminders, and trusted neighbors in your community.",
        animationURL: require("../../assets/OnBoardingPage/fourth.json"),
        backgroundColor: "#000000",
        foregroundColor: "#ffffff"
    },
];
