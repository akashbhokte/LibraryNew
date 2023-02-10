import React from 'react'
import { StyleSheet, View } from 'react-native'
import Button from '../components/Core/Form/Button'


const BuyerDashboard = ({ navigation }) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Button lable={'Books'}
                linearGradient
                style={styles.button}
                onPress={() => navigation.navigate('BuyerBookList')}
            />
            <Button lable={'Research Papers'}
                linearGradient
                style={styles.button}
                onPress={() => navigation.navigate('AdminBookList')}
            />
            <Button lable={'Orders'}
                linearGradient
                style={styles.button}
                onPress={() => navigation.navigate('Transactions')}
            />
        </View>
    )
}

export default BuyerDashboard

const styles = StyleSheet.create({
    button: {
        marginHorizontal: '5%',
        marginBottom: '5%'
    }
})