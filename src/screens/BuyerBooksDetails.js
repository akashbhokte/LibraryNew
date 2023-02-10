
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider, TextInput } from 'react-native-paper';
import { Colors } from '../constants';
import Button from '../components/Core/Form/Button';
import { onValue, ref, remove, set } from 'firebase/database';
import { db } from '../firestore/config';
import { CategoryReader } from '../utils/CategoryReader';
import { AppFunctions } from '../utils/AppFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BuyerBooksDetails = ({ navigation, route }) => {
    const item = route.params.item
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [endDt, setEndDt] = useState();
    const [modalVisible, setModalVisible] = useState(false)

    const setEndingDate = () => {
        var date = new Date();
        date.setDate(date.getDate() + 2);
        setEndDt(AppFunctions.endDateSendConvert(date));
    }

    useEffect(() => {
        setEndingDate();
    }, [])


    const create = async () => {
        const value = await AsyncStorage.getItem('userDetails')
        const userVal = JSON.parse(value)
        let id = AppFunctions.Datetoday() + AppFunctions.now();
        set(ref(db, 'Orders/' + id), {
            order_Id: id,
            Book_Id: item?.Id,
            Book_Name: item?.Name,
            Book_Quantity: selectedQuantity,
            Buyer_Name: userVal?.Name,
            Book_Price: item.Dis_Price,
            Seller_Name: item?.Owner,
            Date: AppFunctions.Datetoday(),
            End_dt: endDt,
            Status: 0,
        }).then(() => {
            console.log("Submitted Successfully");
            navigation.navigate('BuyerBookList');
        }).catch((e) => console.log(e))
    };


    return (
        <View style={styles.Main_Body}>
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
                            fontWeight: 'bold',
                            marginBottom: '5%'
                        }}>Please Select the Book Quantity</Text>
                        <View style={styles.filterButtonContainer}>
                            <TouchableOpacity onPress={() => setSelectedQuantity(1)}>
                                <Text style={{
                                    ...styles.filterButton,
                                    backgroundColor: selectedQuantity == 1 ? 'skyblue' : 'white',
                                    color: selectedQuantity == 1 ? 'white' : 'black'
                                }}>1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSelectedQuantity(2)}>
                                <Text style={{
                                    ...styles.filterButton,
                                    backgroundColor: selectedQuantity == 2 ? 'skyblue' : 'white',
                                    color: selectedQuantity == 2 ? 'white' : 'black'
                                }}>2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSelectedQuantity(3)}>
                                <Text style={{
                                    ...styles.filterButton,
                                    backgroundColor: selectedQuantity == 3 ? 'skyblue' : 'white',
                                    color: selectedQuantity == 3 ? 'white' : 'black'
                                }}>3</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonOption]}
                            onPress={() => {
                                create();
                                setModalVisible(!modalVisible);
                            }}>
                            <Text style={styles.textStyle}>Confirm</Text>
                        </TouchableOpacity>
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
                    source={{ uri: `data:image/jpeg;base64,${item.image}` }}
                    style={styles.Image_Style}
                />
            </View>
            <View style={{ flex: 1, }}>
                <ScrollView>
                    <Text style={styles.Title_Text}>
                        {item.Name}
                    </Text>
                    <Divider style={{ borderWidth: 0.3, borderColor: 'white' }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.autherName}>Selling Price: Rs.{item.Dis_Price}</Text>
                        <Text style={styles.autherName}>Auther: {item.Author}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.sellerName}>Category: {CategoryReader(item?.Category)}</Text>
                        <Text style={styles.sellerName}>Listing Date: {AppFunctions.dateShowConvert(item.Listing_Date)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.sellerName}>MRP: {item?.MRP}.00</Text>
                        <Text style={styles.sellerName}>Books in stock: {item?.Quantity}</Text>
                    </View>
                    <View style={{ flex: 1, marginHorizontal: '5%', marginTop: '5%' }}>
                        <Button lable={'Reserve'} linearGradient onPress={() => setModalVisible(!modalVisible)} />
                    </View>
                </ScrollView>
            </View >
        </View >
    )
}

export default BuyerBooksDetails

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
        marginVertical: '3%',
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
    filterButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: '3%',
        width: '100%',
        marginVertical: '8%'
    },
    filterButton: {
        borderWidth: 1,
        paddingVertical: '2%',
        paddingHorizontal: '5%',
        borderRadius: 8,
        fontWeight: 'bold'
    },
})