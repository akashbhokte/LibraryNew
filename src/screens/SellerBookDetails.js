
import { ref, remove } from 'firebase/database';
import React, { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import Button from '../components/Core/Form/Button';
import { Colors } from '../constants';
import { db } from '../firestore/config';
import { AppFunctions } from '../utils/AppFunctions';
import { CategoryReader } from '../utils/CategoryReader';

const SellerBooksDetails = ({ navigation, route }) => {
    const item = route.params.item
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)


    const deleteHandler = (id) => {
        setLoading(true)
        try {
            remove(ref(db, 'Seller_Master/' + id)).then(() => {
                console.log("Delete Successfully");
                navigation.goBack();
            }).catch((e) => console.log(e))

        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }


    return (
        <View style={styles.Main_Body}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{
                            fontWeight: 'bold'
                        }}>Are you sure you want to delete the book ?</Text>
                        <View style={{ marginBottom: '8%' }}>
                            <Pressable
                                style={[styles.button, styles.buttonOption]}
                                onPress={() => {
                                    deleteHandler(item.Id);
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
                    {
                        item?.Quantity > 0 ? (
                            <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                                <View style={{ flex: 1, marginHorizontal: '5%', }}>
                                    <Button lable={'Edit'} linearGradient onPress={() => navigation.navigate('EditBook', { item: item })} />
                                </View>
                                <View style={{ flex: 1, marginHorizontal: '5%', }}>
                                    {
                                        loading ? <Text>loading</Text> :
                                            <Button lable={'Delete'} textColor='red' onPress={() => setModalVisible(!modalVisible)} />
                                    }
                                </View>
                            </View>
                        ) : null
                    }
                </ScrollView>
            </View >
        </View >
    )
}

export default SellerBooksDetails

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