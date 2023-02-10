import React from 'react'
import { StyleSheet, View } from 'react-native'
import Button from '../components/Core/Form/Button'

const UserType = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
            </View>
            <View style={{ flex: 8, justifyContent: 'center', padding: '10%', }}>
                <View style={{ marginVertical: '8%' }}>
                    <Button lable='Buyer'
                        linearGradient
                        onPress={() => {
                            navigation.navigate('Login', { userType: "buyer" });
                        }} />

                </View>
                <View style={{ marginVertical: '8%' }}>
                    <Button lable='Seller'
                        linearGradient
                        onPress={() => {
                            navigation.navigate('Login', { userType: "seller" });
                        }}
                    />

                </View>
            </View>
        </View>
    )
}

export default UserType

const styles = StyleSheet.create({})