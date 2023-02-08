import React, { memo, useState } from 'react';
import { Image, KeyboardTypeOptions, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts, Images, Size } from '../../../constants';

interface Props {
    leftIcon: string;
    rightIcon: string;
    inputType: KeyboardTypeOptions;
}

const Password = ({ leftIcon = '', rightIcon = '', inputType = 'name-phone-pad', ...rest }: any) => {
    const [hide, setHide] = useState<boolean>(true);
    return (
        <View style={styles.container}>
            <Image
                source={leftIcon ? leftIcon : Images.Lock}
                style={styles.leftIcon}

            />
            <TextInput
                style={styles.textInput}
                keyboardType={inputType}
                secureTextEntry={hide}
                {...rest}
            />
            <TouchableOpacity onPress={() => setHide(!hide)}>
                <Image
                    source={rightIcon ? rightIcon : hide ? Images.EyeClose : Images.EyeOpen}
                    style={styles.rightIcon}
                />
            </TouchableOpacity>
        </View>
    )
}

export default memo(Password)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderColor: Colors.silver,
    },
    textInput: {
        flex: 1,
        marginHorizontal: 20,
        color: Colors.black10,
        fontSize: Size.F14,
        lineHeight: 17,
        fontFamily: Fonts.MontserratMedium

    },
    leftIcon: {
        resizeMode: 'contain',
        width: 24,
    },
    rightIcon: {
        resizeMode: 'contain',
        width: 24,
    },
})

