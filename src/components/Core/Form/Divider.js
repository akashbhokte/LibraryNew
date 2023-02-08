import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { Colors } from '../../../constants'

const Divider = ({ thin = false }) => {
    return (
        <View style={{
            ...styles.border,
            borderBottomWidth: thin ? 1 : 2,
        }} />
    )
}

export default memo(Divider)

const styles = StyleSheet.create({
    border: {
        borderColor: Colors.gray10
    }
})