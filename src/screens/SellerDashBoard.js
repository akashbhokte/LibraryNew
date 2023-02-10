import AsyncStorage from '@react-native-async-storage/async-storage'
import { onValue, ref, update } from 'firebase/database'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Button from '../components/Core/Form/Button'
import { db } from '../firestore/config'
import { AppFunctions } from '../utils/AppFunctions'

const SellerDashboard = ({ navigation }) => {
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
                    if (i?.Seller_Name == userVal?.Name) return i
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
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
            </View>
            <View style={{ flex: 8, justifyContent: 'center', padding: '10%', }}>
                <View style={{ marginVertical: '8%' }}>
                    <Button lable='Manage Books'
                        linearGradient
                        onPress={() => {
                            navigation.navigate('SellerBookList')
                        }} />
                </View>
                <View style={{ marginVertical: '8%' }}>
                    <Button lable='Reasearch Paper'
                        linearGradient
                        onPress={() => {
                            navigation.navigate('ResearchPaperList')
                        }} />
                </View>
                <View style={{ marginVertical: '8%' }}>
                    <Button lable='Orders'
                        linearGradient
                        onPress={() => {
                            navigation.navigate('SellerTransactionList');
                        }}
                    />

                </View>
            </View>
        </View>
    )
}

export default SellerDashboard

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        paddingHorizontal: "10%",
        paddingVertical: "5%",
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    buttonOption: {
        backgroundColor: 'skyblue',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});