import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors, Fonts, Size } from '../../../constants';

interface Props {
    label: string;
}

const Title = ({ label = '', style = {}, ...rest }: any) => {
    return (
        <Text style={{ ...styles.title, ...style }} {...rest}>
            {label}
        </Text>
    )
}
export default memo(Title)

const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.MontserratSemiBold,
        fontSize: Size.F16,
        lineHeight: 24,
        color: Colors.black10
    }
})