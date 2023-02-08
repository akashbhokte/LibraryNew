import React, { memo } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Images } from '../../../constants'

const BackIconButton = ({ ...rest }: any) => {
    return (
        <TouchableOpacity
            {...rest}
        >
            <Image
                source={Images.BackIcon}
                style={styles.icon}
            />
        </TouchableOpacity>
    )
}

export default memo(BackIconButton)

const styles = StyleSheet.create({
    icon: {
        resizeMode: 'contain',
        width: 10.43,
        height: 18.15,
    }
})