
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { onValue, ref, update } from 'firebase/database';
import Button from '../components/Core/Form/Button';
import { Colors } from '../constants';
import { db } from '../firestore/config';
import { AppFunctions } from '../utils/AppFunctions';
import { CategoryReader } from '../utils/CategoryReader';
import { StatusReader } from '../utils/StatusReader';

const SellerTransactionDetails = ({ navigation, route }) => {
    const item = route.params.item
    const [book, setBook] = useState();
    const [modalVisible, setModalVisible] = useState(false)
    const [completedmodalVisible, setCompletedModalVisible] = useState(false)

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        try {
            const starCountRef = ref(db, 'Seller_Master/');
            onValue(starCountRef, async (snapshot) => {
                const data = snapshot.val();

                if (data[item.Book_Id]) {
                    if (data[item.Book_Id].Id == item.Book_Id) {
                        setBook(data[item.Book_Id])
                    }
                }
            });
        } catch (error) {

        }
    }

    const cancelHandler = async (id) => {
        const value = await AsyncStorage.getItem('userDetails')
        const userVal = JSON.parse(value)
        try {
            update(ref(db, 'Orders/' + id), {
                order_Id: id,
                Book_Id: book?.Id,
                Book_Name: book?.Name,
                Book_Quantity: item.Book_Quantity,
                Buyer_Name: item?.Buyer_Name,
                Book_Price: item.Book_Price,
                Seller_Name: userVal?.Name,
                Date: AppFunctions.Datetoday(),
                End_dt: item.End_dt,
                Status: 3,

            }).then(() => {
                console.log("Updated")
                navigation.navigate('SellerTransactionList');
            }).catch((e) => console.log(e))

        } catch (error) {
            console.log(error)
        }
    };
    const completeHandler = async (id) => {
        const value = await AsyncStorage.getItem('userDetails')
        const userVal = JSON.parse(value)
        try {
            update(ref(db, 'Orders/' + id), {
                order_Id: id,
                Book_Id: book?.Id,
                Book_Name: book?.Name,
                Book_Quantity: item.Book_Quantity,
                Buyer_Name: item?.Buyer_Name,
                Book_Price: item.Book_Price,
                Seller_Name: userVal?.Name,
                Date: AppFunctions.Datetoday(),
                End_dt: item.End_dt,
                Status: 1,
            }).then(() => {
                console.log("Updated")
                navigation.navigate('SellerTransactionList');
            }).catch((e) => console.log(e))

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <View style={styles.Main_Body}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={completedmodalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setCompletedModalVisible(!completedmodalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{
                            fontWeight: 'bold'
                        }}>Are you sure you want to mark the order as compled?</Text>
                        <View style={{ marginBottom: '8%', marginTop: '3%' }}>
                            <Pressable
                                style={[styles.button, styles.buttonOption]}
                                onPress={() => {
                                    completeHandler(item?.order_Id);
                                    setCompletedModalVisible(!completedmodalVisible);
                                }}>
                                <Text style={styles.textStyle}>Confirm</Text>
                            </Pressable>
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setCompletedModalVisible(!completedmodalVisible)}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{
                            fontWeight: 'bold'
                        }}>Are you sure you want to cancel the order?</Text>
                        <View style={{ marginBottom: '8%' }}>
                            <Pressable
                                style={[styles.button, styles.buttonOption]}
                                onPress={() => {
                                    cancelHandler(item?.order_Id);
                                    setModalVisible(!modalVisible);
                                }}>
                                <Text style={styles.textStyle}>Confirm</Text>
                            </Pressable>
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View style={{ flex: 1, alignItems: 'center', marginTop: '5%' }}>
                <Image
                    source={{ uri: `data:image/jpeg;base64,${book?.image}` }}
                    style={styles.Image_Style}
                />
            </View>
            <View style={{ flex: 1, }}>
                <ScrollView>
                    <Text style={styles.Title_Text}>
                        {item.Book_Name}
                    </Text>
                    <Divider style={{ borderWidth: 0.3, borderColor: 'white' }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.autherName}>Price: Rs.{item.Book_Price}.00</Text>
                        <Text style={styles.autherName}>Auther: Name</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.sellerName}>Seller: {item.Seller_Name}</Text>
                        <Text style={styles.sellerName}>Quantity: {item.Book_Quantity}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.sellerName}>Category: {CategoryReader(book?.Category)}</Text>
                        <Text style={styles.sellerName}>Ordered Date: {AppFunctions.dateShowConvert(item.Date)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.sellerName}>Status: {StatusReader(item.Status)}</Text>
                        <Text style={styles.sellerName}>Expires on: {AppFunctions.dateShowConvert(item.End_dt)}</Text>
                    </View>
                    {
                        item.Status == 0 ?
                            <>
                                <View style={{ marginHorizontal: '5%' }}>
                                    <Button lable={'Mark as completed'} style={{ marginVertical: '5%' }} linearGradient onPress={() => setCompletedModalVisible(!completedmodalVisible)} />
                                    <Button lable={'Cancel'} textColor='red' onPress={() => setModalVisible(!modalVisible)} />
                                </View>
                            </>
                            :
                            null
                    }
                </ScrollView>
            </View >
        </View >
    )
}

export default SellerTransactionDetails

const styles = StyleSheet.create({
    Main_Body: {
        flex: 1,
        backgroundColor: Colors.ghostWhite
    },
    Title_Text: {
        padding: 10,
        color: 'black',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'monospace'
    },

    Image_Style: {
        width: 300,
        height: 300,
    },
    autherName: {
        color: 'ghostwhite',
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
        marginVertical: '5%',
        color: 'black'
    },
    sellerName: {
        fontSize: 14,
        flex: 1,
        textAlign: 'center',
        marginVertical: '1%',
        color: 'black'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
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
})