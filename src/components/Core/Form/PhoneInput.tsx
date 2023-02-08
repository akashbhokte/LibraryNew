import React, { memo, useEffect, useState } from 'react';
import { Image, KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors, Fonts, Images, Size } from '../../../constants';
import { Picker } from '@react-native-picker/picker'

interface Props {
    leftIcon: string;
}

const PhoneInput = ({ leftIcon = '', ...rest }: any) => {
    let data = [
        {
            label: 'India',
            value: '91'
        },
        {
            label: 'United States',
            value: '1'
        },
        {
            label: 'Japan',
            value: '12'
        },
    ]
    const [code, setCode] = useState<string>(data[0].value);


    return (
        <View style={styles.container}>
            <Picker
                style={styles.picker}
                selectedValue={code}
                itemStyle={{ textAlign: 'center' }}
                onValueChange={(itemValue: string) =>
                    setCode(itemValue)
                }
                {...rest}
                mode='dropdown'
            >
                {data.map((item, index) => {
                    return (
                        <Picker.Item key={index.toString()} style={styles.pickerItem} label={item.label} value={item.value} />
                    );
                })}
            </Picker>
            <Text style={styles.code}>
                +{code}
            </Text>
            <TextInput
                style={styles.textInput}
                keyboardType={'number-pad'}
                {...rest}
            />
        </View>
    )
}

export default memo(PhoneInput)

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
    code: {
        color: Colors.black10,
        fontSize: Size.F18,
        lineHeight: 22,
        fontFamily: Fonts.MontserratMedium
    },
    textInput: {
        flex: 1,
        marginLeft: 20,
        color: Colors.black10,
        fontSize: Size.F14,
        lineHeight: 17,
        fontFamily: Fonts.MontserratMedium
    },
    pickerItem: {
        fontSize: Size.F14,
        fontFamily: Fonts.MontserratMedium,
        lineHeight: 17,
    },
    picker: {
        width: '10%'
    }
})

