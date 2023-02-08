import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, SetStateAction, useEffect, useState } from 'react'
import { Colors, Fonts, Size } from '../../../constants'
import LinearGradient from 'react-native-linear-gradient'

interface Props {
    firstLabel: string;
    secondLabel: string;
    state: string,
    setState: SetStateAction<string>,
}

const Tabs = ({ children = [] }: any) => {
    const [state, setState] = useState(0)
    const locations = [0.026, 0.26, 0.84, 1]
    const selectedButton = [
        Colors.liteSkyblue,
        Colors.skyblue,
        Colors.dustyBlue,
        Colors.litePurple
    ];
    const unSelectedButton = [
        Colors.white,
        Colors.white,
        Colors.white,
        Colors.white
    ]

    const defaultOnPress = () => console.warn("Provide setState");

    return (
        <View>
            <View style={styles.container}>
                {
                    children?.map((i: any, index: number) => {
                        return (
                            <TouchableOpacity
                                key={index.toString()}
                                style={styles.tabContainer}
                                onPress={() => setState ? setState(index) : defaultOnPress}
                            >
                                <LinearGradient
                                    colors={state == index ? selectedButton : unSelectedButton}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    locations={locations}
                                    style={styles.tab}
                                >
                                    <Text style={[styles.label, state == index ? { color: Colors.white } : { color: Colors.black }]}>
                                        {i.label}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            {children[state].content}
        </View>
    )
}

export default memo(Tabs)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 1,
        padding: 2,
        height: 40,
        borderColor: Colors.gray10,
        backgroundColor: Colors.white
    },
    tabContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    tab: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        flex: 1
    },
    label: {
        fontSize: Size.F14,
        fontFamily: Fonts.MontserratSemiBold,
        textAlign: 'center',
        lineHeight: 18,
        color: Colors.white,
    }
})