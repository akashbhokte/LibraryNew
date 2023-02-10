
import { ref, remove } from 'firebase/database';
import React, { useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Core/Form/Button';
import { Colors } from '../constants';
import { db } from '../firestore/config';
import { UserTypeReader } from '../utils/UserTypeReader';

const UserDetails = ({ navigation, route }) => {
    const item = route.params.item
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    const deleteHandler = (id) => {
        setLoading(true)
        try {
            remove(ref(db, 'users/' + id)).then(() => {
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
                                    deleteHandler(item.Contact_no);
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
            {
                loading ?
                    <Text>Loading</Text>
                    :
                    <View style={{ flex: 1, }}>
                        <ScrollView>
                            <View style={styles.rowContainer}>
                                <Text style={styles.autherName}>
                                    Name:
                                </Text>
                                <Text style={styles.autherName}>
                                    {item?.Name}
                                </Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.autherName}>
                                    Contact Number:
                                </Text>
                                <Text style={styles.autherName}>
                                    {item?.Contact_no}
                                </Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.autherName}>
                                    Email:
                                </Text>
                                <Text style={styles.autherName}>
                                    {item?.Mail_id}
                                </Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.autherName}>
                                    Address:
                                </Text>
                                <Text style={styles.autherName}>
                                    {item?.Add}
                                </Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.autherName}>
                                    Type:
                                </Text>
                                <Text style={styles.autherName}>
                                    {UserTypeReader(item?.Type)}
                                </Text>
                            </View>
                            <View style={{ marginHorizontal: '5%' }}>
                                <Button lable={'Delete'} textColor='red' onPress={() => setModalVisible(!modalVisible)} />
                            </View>
                        </ScrollView>
                    </View >
            }
        </View >
    )
}

export default UserDetails

const styles = StyleSheet.create({
    Main_Body: {
        flex: 1,
        backgroundColor: Colors.ghostWhite
    },
    autherName: {
        color: 'ghostwhite',
        fontSize: 18,
        flex: 1,
        textAlign: 'left',
        paddingVertical: '5%',
        color: 'black',
        paddingLeft: '8%'
    },
    sellerName: {
        fontSize: 14,
        flex: 1,
        textAlign: 'left',
        marginVertical: '1%',
        color: 'black',
        backgroundColor: 'red'
    },
    rowContainer: {
        flexDirection: 'row'
    },
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