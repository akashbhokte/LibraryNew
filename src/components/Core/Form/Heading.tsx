import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors, Fonts, Size } from '../../../constants';

interface Props {
    label: string;
}

const Heading = ({ label = '', style = {}, ...rest }: any) => {
    return (
        <Text style={{ ...styles.heading, ...style }} {...rest}>
            {label}
        </Text>
    )
}
export default memo(Heading)

const styles = StyleSheet.create({
    heading: {
        fontFamily: Fonts.MontserratSemiBold,
        fontSize: Size.F24,
        lineHeight: 29,
        textAlign: 'center',
        color: Colors.black
    }
})