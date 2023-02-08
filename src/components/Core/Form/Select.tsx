import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { memo, useState } from 'react'
import { Picker, PickerIOS } from "@react-native-picker/picker";
import { Colors, Fonts, Size } from '../../../constants';

interface Props {
    selectedValue: any;
    data: [];
}

const Select = ({ selectedValue, data = [], ...rest }: any) => {
    const [selected, setSelected] = useState<any>();
    let array = [
        {
            label: 'India',
            value: 'India'
        },
        {
            label: 'United States',
            value: 'United States'
        },
        {
            label: 'Japan',
            value: 'Japan'
        },
    ]

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selected}
                itemStyle={{ textAlign: 'center' }}
                onValueChange={(itemValue, itemIndex) =>
                    setSelected(itemValue)
                }
                {...rest}

            >
                {array.map((item, index) => {
                    return (
                        <Picker.Item key={index.toString()} style={styles.picker} label={item.label} value={item.value} />
                    );
                })}
            </Picker>
        </View>
    )
}

export default memo(Select)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderBottomWidth: 0.5,
        borderColor: Colors.silver,
    },
    picker: {
        fontSize: Size.F14,
        fontFamily: Fonts.MontserratMedium,
        lineHeight: 17,
    }
})