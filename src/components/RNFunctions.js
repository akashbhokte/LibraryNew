import Toast from 'react-native-toast-message'
export const successToast = (text1, text2, visibilityTime = 3000, autoHide = true) => {
    Toast.show({
        type: 'success',
        position: 'top',
        text1: text1.toString(),
        text2: text2.toString(),
        visibilityTime: visibilityTime,
        autoHide: autoHide,
        topOffset: 30,
        bottomOffset: 40,
    });
};
export const errorToast = (text1, text2, visibilityTime = 4000, autoHide = false) => {
    Toast.show({
        type: 'error',
        position: 'top',
        text1: text1.toString(),
        text2: text2.toString(),
        visibilityTime: visibilityTime,
        autoHide: autoHide,
        topOffset: 30,
        bottomOffset: 40,
    });
};
export const infoToast = (text1, text2, visibilityTime = 4000, autoHide = true) => {
    Toast.show({
        type: 'info',
        position: 'top',
        text1: text1.toString(),
        text2: text2.toString(),
        visibilityTime: visibilityTime,
        autoHide: autoHide,
        topOffset: 30,
        bottomOffset: 40,
    });
};
