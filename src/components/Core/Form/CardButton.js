import React, { memo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { scale } from 'react-native-size-matters';
import { Colors, Fonts, Size } from '../../../constants';
import Text from '../Common/Text';

const CardButton = ({ lable, icon, linearGradient = false, ...rest }) => {

    return <TouchableOpacity style={styles.buttonWrapper} {...rest}>
        {linearGradient ?
            <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                locations={[0, 0.35, 0.74, 1]}
                colors={[Colors.color7, Colors.color8, Colors.color9, Colors.color10]}
                style={styles.linearGradient}
            >
                <Image
                    source={icon}
                    style={styles.icon}
                />
                <Text style={styles.linearText} lable={lable} />
            </LinearGradient>
            :
            <View
                style={styles.whiteView}>
                <Image
                    source={icon}
                    style={styles.icon}
                />
                <Text style={styles.text} lable={lable} />
            </View>
        }
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    buttonWrapper: {
        height: scale(48),
        width: '100%',
        justifyContent: 'center',
    },
    linearGradient: {
        height: scale(120),
        width: scale(120),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        elevation: 20,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    whiteView: {
        height: scale(120),
        width: scale(120),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        backgroundColor: Colors.white,
        elevation: 20,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    linearText: {
        color: Colors.white,
        fontFamily: Fonts.MontserratMedium,
        fontSize: Size.F12,
        lineHeight: 13,
        paddingHorizontal: 27,
        textAlign: 'center',
        marginTop: 6
    },
    text: {
        fontFamily: Fonts.MontserratMedium,
        fontSize: Size.F12,
        lineHeight: 13,
        color: Colors.color6,
        textAlign: 'center',
        paddingHorizontal: 27,
        marginTop: 6
    },
    icon: {
        resizeMode: 'contain',
        height: 28,
        width: 28,
    }
});


export default memo(CardButton);
