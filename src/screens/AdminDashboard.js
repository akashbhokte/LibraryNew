import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Button from '../components/Core/Form/Button'
import axios from 'axios'

const AdminDashboard = ({ navigation }) => {

    useEffect(() => {
        getData();
    }, [])


    const getData = async () => {
        console.log("Called")
        try {
            console.log("try")
            var payload = {
                "eno": 6,
                "name": "OKOK",
                "designation": "React js",
                "salary": "1000"
            }
            var res = await axios.get('http://192.168.100.24:8002/');
            console.log('res', res)
            console.log('exit')
        } catch (error) {
            console.log("ERR", error)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Text>AdminDashboard</Text>
            <Button lable={'User Information'} onPress={() => navigation.navigate('UserInfo')} />
            <Button lable={'Book Information'} onPress={() => navigation.navigate('AdminBookList')} />
            <Button lable={'Transactions'} onPress={() => navigation.navigate('AdminTransactions')} />
        </View>
    )
}

export default AdminDashboard

const styles = StyleSheet.create({})