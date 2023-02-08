import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { memo, SetStateAction, useState } from 'react'
// import CheckBox from 'react-native-check-box'
import CheckBox from '@react-native-community/checkbox';
import { Colors, Fonts, Size } from '../../../constants';

interface Props {
    label: string;
    state: boolean;
    setState: SetStateAction<boolean>;
}
const Checkbox = ({ label = '', state = false, setState, ...rest }: any) => {

    const defaultOnChange = () => console.warn("Provide setState");
    const onChange = (value: boolean) => {
        setState(value);
    }

    return (
        <View style={styles.container}>
            <CheckBox
                value={state}
                onValueChange={setState ? onChange : defaultOnChange}
                onTintColor={Colors.faintBlue}
                tintColor={Colors.faintBlue}
                boxType='square'
                tintColors={{ true: Colors.faintBlue, false: Colors.faintBlue }}
                {...rest}
            />
            <Text style={styles.label}>{label}</Text>
        </View>
    )
}

export default memo(Checkbox)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Platform.OS === 'ios' ? 16 : 0,

    },
    label: {
        fontSize: Size.F14,
        color: Colors.black10,
        fontWeight: '500',
        lineHeight: 17,
        marginHorizontal: Platform.OS === 'ios' ? 8 : 0,
        fontFamily: Fonts.MontserratMedium
    },

})