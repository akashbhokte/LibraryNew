import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';

const TextElement = memo(({ lable = '', style = {}, ...rest }) => <Text style={[styles.text, style]} {...rest}>{lable}</Text>)

const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 18,
        lineHeight: 28
    }
});

export default TextElement;