import { Modal, Pressable, StyleSheet, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '../components/Core/Form/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SellerDashboard = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <View style={{ flex: 1 }}>
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
                        <View style={{ marginBottom: '8%' }}>
                            <Pressable
                                style={[styles.button, styles.buttonOption]}
                                onPress={() => navigation.navigate('SellerBookList')}>
                                <Text style={styles.textStyle}>View / Update</Text>
                            </Pressable>
                        </View>
                        <View style={{ marginBottom: '8%' }}>
                            <Pressable
                                style={[styles.button, styles.buttonOption]}
                                onPress={() => navigation.navigate('AddBook')}>
                                <Text style={styles.textStyle}>Add Book</Text>
                            </Pressable>

                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>BACK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View style={{ flex: 1 }}>
            </View>
            <View style={{ flex: 8, justifyContent: 'center', padding: '10%', }}>
                <View style={{ marginVertical: '8%' }}>
                    <Button lable='Manage Books'
                        linearGradient
                        onPress={() => {
                            setModalVisible(!modalVisible)
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
                            navigation.navigate('Orders');
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