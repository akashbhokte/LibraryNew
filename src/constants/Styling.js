import { Platform } from "react-native";

export const Styling = {
    topbarBottomMargin: 25,
    appPadding: 25,
    progressViewFlex: 9,
    progressViewPaddingHorizontal: 60,
    backIconFlex: 1,
    marginLeftRadioChildren: Platform.OS == 'ios' ? 31 : 25
}