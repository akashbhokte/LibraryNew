import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts } from '../../../constants';
import Text from '../Common/Text';



const ButtonElement = ({ lable, linearGradient = false, textColor = '', ...rest }) => {
    return <TouchableOpacity style={styles.buttonWrapper} {...rest}>
        {linearGradient ?
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                locations={[0, 0.0026, 0.2675, 0.8408, 1]}
                colors={[Colors.color1, Colors.color2, Colors.color3, Colors.color4, Colors.color5]}
                style={styles.linearGradient}>
                <Text style={styles.linearText} lable={lable} />
            </LinearGradient>
            :
            <View style={{
                backgroundColor: 'white',
                borderColor: 'black',
                borderWidth: 0.5,
                height: 48,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50
            }}>
                <Text style={{ ...styles.text, color: textColor ? textColor : 'black' }} lable={lable} />
            </View>
        }
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    buttonWrapper: {
        height: 48,
        width: '100%',
        justifyContent: 'center',
    },
    linearGradient: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    linearText: {
        color: Colors.white,
        fontFamily: Fonts.MontserratBold,
        fontSize: 16,
        lineHeight: 19
    },
    text: {
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'center'
    }
});


export default memo(ButtonElement);
