import AsyncStorage from '@react-native-async-storage/async-storage';
import { onValue, ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Button from '../components/Core/Form/Button'
import { db } from '../firestore/config';
import { AppFunctions } from '../utils/AppFunctions';


const BuyerDashboard = ({ navigation }) => {

    const getData = () => {
        try {
            const starCountRef = ref(db, 'Orders/');
            onValue(starCountRef, async (snapshot) => {
                const data = snapshot.val();
                if (data) var myData = Object.keys(data).map(key => {
                    return data[key];
                })
                const value = await AsyncStorage.getItem('userDetails')
                const userVal = JSON.parse(value)
                let list = myData.filter((i) => {
                    if (i?.Buyer_Name == userVal?.Name) return i
                })
                list.filter((i) => {
                    if (i.End_dt < AppFunctions.Datetoday() && i.Status == 0) {
                        updateHandler(i.order_Id)
                    }
                })
            });
        } catch (error) {

        }
    }

    const updateHandler = async (id) => {
        const value = await AsyncStorage.getItem('userDetails')
        const userVal = JSON.parse(value)
        try {
            update(ref(db, 'Orders/' + id), {
                order_Id: id,
                // Book_Id: book?.Id,
                // Book_Name: book?.Name,
                // Book_Quantity: item.Book_Quantity,
                // Buyer_Name: item?.Buyer_Name,
                // Book_Price: item.Book_Price,
                // Seller_Name: userVal?.Name,
                // Date: AppFunctions.Datetoday(),
                // End_dt: item.End_dt,
                Status: 2,
            }).then(() => {
                console.log('success')
            }).catch((e) => console.log(e))

        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getData();
    }, [])

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
                onPress={() => navigation.navigate('ResearchPaperList')}
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