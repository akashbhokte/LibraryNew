import React from 'react'
import { StyleSheet, View } from 'react-native'
import Button from '../components/Core/Form/Button'


const AdminDashboard = ({ navigation }) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Button lable={'User Information'}
                linearGradient
                style={styles.button}
                onPress={() => navigation.navigate('UserInfo')}
            />
            <Button lable={'Book Information'}
                linearGradient
                style={styles.button}
                onPress={() => navigation.navigate('AdminBookList')}
            />
            <Button lable={'Transactions'}
                linearGradient
                style={styles.button}
                onPress={() => navigation.navigate('AdminTransactions')}
            />
        </View>
    )
}

export default AdminDashboard

const styles = StyleSheet.create({
    button: {
        marginHorizontal: '5%',
        marginBottom: '5%'
    }
})