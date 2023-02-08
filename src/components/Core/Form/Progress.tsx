import React, { memo, useEffect, useState } from 'react';
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts, Images, Size } from '../../../constants';

interface Props {
    step: number;
    style: StyleProp<ViewStyle>;
}

const Progress = ({ step = 1, maxNum = 1 }: any) => {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        arrayCreation();
    }, [maxNum])

    const arrayCreation = () => {
        let newArr = [];
        for (let i = 1; i < maxNum; i++) {
            newArr.push(i)
        }
        setData(newArr)
    }

    const renderCheckmark = () => {
        return (
            <View style={{ ...styles.circle, backgroundColor: Colors.green }}>
                <Image
                    source={Images.Checkmark}
                    style={styles.checkmark}
                />
            </View>
        )
    }

    const renderLinearGradient = (value: number) => {
        return (
            <LinearGradient
                colors={[
                    Colors.liteSkyblue,
                    Colors.skyblue,
                    Colors.dustyBlue,
                    Colors.litePurple
                ]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                locations={[0.026, 0.26, 0.84, 1]}
                style={styles.circle}
            >
                <Text style={{ ...styles.number, color: Colors.white }}>{value}</Text>
            </LinearGradient>
        )
    }

    const renderNumberView = (value: number) => {
        return (
            <View style={{ ...styles.circle, backgroundColor: Colors.white }}>
                <Text style={{ ...styles.number, color: Colors.black10 }}>{value}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {data?.map((i: any, index: number) => {
                return (
                    <>
                        {
                            i == step ? renderLinearGradient(i) :
                                i < step ? renderCheckmark() :
                                    renderNumberView(i)
                        }
                        <View key={index.toString()} style={styles.line} />
                    </>
                )
            })}
            {step >= maxNum ? renderLinearGradient(maxNum) :
                renderNumberView(maxNum)
            }
        </View>
    )
}

export default memo(Progress)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    circle: {
        borderRadius: 10,
        borderWidth: 1,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    number: {
        fontSize: Size.F14,
        fontFamily: Fonts.MontserratBold,
    },
    line: {
        flex: 1,
        height: 1,
        borderBottomWidth: 1,
        borderBottomColor: Colors.black10
    },
    checkmark: {
        resizeMode: 'contain',
        width: 10,
        height: 10
    }
})