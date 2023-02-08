import React, { memo } from 'react';
import { Image, KeyboardTypeOptions, StyleSheet, TextInput, View } from 'react-native';
import { Colors, Fonts, Images, Size } from '../../../constants';

interface Props {
    inputType: KeyboardTypeOptions;
}

const Input = ({ inputType = 'default', ...rest }: any) => {


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                keyboardType={inputType}
                {...rest}
            />
        </View>
    )
}

export default memo(Input)

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
        color: Colors.black10,
        fontSize: Size.F14,
        lineHeight: 17,
        fontFamily: Fonts.MontserratMedium
    },
})

