
import React, { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
// import AntDesign from 'react-native-vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import moment from 'moment';
import { Colors } from '../constants';
import Button from '../components/Core/Form/Button';
import { AppFunctions } from '../utils/AppFunctions';
import { CategoryReader } from '../utils/CategoryReader';
import { ref, remove } from 'firebase/database';
import { db } from '../firestore/config';

const AdminBooksDetails = ({ navigation, route }) => {
    const item = route.params.item
    const [modalVisible, setModalVisible] = useState(false)

    const deleteHandler = (id) => {
        try {
            remove(ref(db, 'Seller_Master/' + id)).then(() => {
                console.log("Delete Successfully");
                navigation.goBack();
            }).catch((e) => console.log(e))

        } catch (error) {
            console.log(error)
        }
    }
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
            <View style={styles.Main_Body}>
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
                            <Text style={styles.sellerName}>MRP: {item?.MRP}</Text>
                            <Text style={styles.sellerName}>Quantity {item?.Quantity}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.sellerName}>Category: {CategoryReader(item?.Category)}</Text>
                            <Text style={styles.sellerName}>Listing Date: {AppFunctions.dateShowConvert(item.Listing_Date)}</Text>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: '5%', }}>

                            <Button lable={'Delete'} textColor='red' onPress={() => setModalVisible(!modalVisible)} />

                        </View>

                    </ScrollView>
                </View >
            </View >
        </View >
    )
}

export default AdminBooksDetails

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