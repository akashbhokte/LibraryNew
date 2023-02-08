import React, { memo, SetStateAction } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts, Size } from '../../../constants';
import { Styling } from '../../../constants/Styling';



const RadioButton = ({ label = '', data = [1], state, setState, style = {}, labelStyle = {}, ...rest }) => {

    const defaultOnChange = () => console.warn("Provide setState");
    const onPressFunction = (value) => {
        setState(value);
    }

    return (
        <View>
            {data.map((i, index) => {
                return (
                    <>
                        <TouchableOpacity
                            key={index.toString()}
                            style={{ ...styles.container, ...style }}
                            onPress={() => { setState ? onPressFunction(index) : defaultOnChange }}
                            {...rest}
                        >
                            <View style={styles.circle}>
                                {
                                    state == index ?
                                        <View style={styles.dot} />
                                        : null
                                }
                            </View>
                            <Text style={{ ...styles.label, ...labelStyle }}>{i.label}</Text>
                        </TouchableOpacity>
                        <View style={styles.childrenContainer}>
                            {i.children ? i.children : null}
                        </View>
                    </>
                )
            })}
        </View>
    )
}

export default memo(RadioButton)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        fontSize: 18,
        lineHeight: 22,
        color: 'black',
        marginHorizontal: 8,
    },
    dot: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: Colors.faintBlue,
    },
    circle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.faintBlue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    childrenContainer: {
        marginLeft: Styling.marginLeftRadioChildren
    }
})
