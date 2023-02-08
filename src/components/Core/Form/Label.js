import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors, Fonts, Size } from '../../../constants';


const Label = ({ label = '', style = {}, ...rest }) => {
    return (
        <Text style={{ ...styles.title, ...style }} {...rest}>
            {label}
        </Text>
    )
}

export default memo(Label)

const styles = StyleSheet.create({

    title: {
        marginTop: 37,
        fontFamily: Fonts.MontserratMedium,
        fontSize: Size.F14,
        lineHeight: 17,
        color: Colors.black,
        marginBottom: 9,
    },
})