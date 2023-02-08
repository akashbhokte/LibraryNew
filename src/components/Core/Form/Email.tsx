import React, { memo } from 'react';
import { Image, KeyboardTypeOptions, StyleSheet, TextInput, View } from 'react-native';
import { Colors, Fonts, Images, Size } from '../../../constants';

interface Props {
    leftIcon: string;
    inputType: KeyboardTypeOptions;
}

const Email = ({ leftIcon = '', inputType = 'email-address', ...rest }: any) => {
    return (
        <View style={styles.container}>
            <Image
                source={leftIcon ? leftIcon : Images.Email}
                style={styles.leftIcon}
            />
            <TextInput
                style={styles.textInput}
                keyboardType={inputType}
                {...rest}
            />
        </View>
    )
}

export default memo(Email)

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
    leftIcon: {
        resizeMode: 'contain',
        width: 24,
    },
    textInput: {
        flex: 1,
        marginLeft: 20,
        color: Colors.black10,
        fontSize: Size.F14,
        lineHeight: 17,
        fontFamily: Fonts.MontserratMedium
    },
})

