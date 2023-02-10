import AsyncStorage from '@react-native-async-storage/async-storage'
import { ref, update } from 'firebase/database'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import DocumentPicker, { types } from 'react-native-document-picker'
import RNFS from 'react-native-fs'
import { ActivityIndicator, TextInput } from 'react-native-paper'
import Button from '../components/Core/Form/Button'
import { db } from '../firestore/config'
import { AppFunctions } from '../utils/AppFunctions'

const EditResearchPaper = ({ navigation, route }) => {
    const item = route.params.item
    const [loading, setLoading] = useState(false)

    const [image, setImage] = useState('')
    const [Title, setTitle] = useState('');
    const [publisher, setPublisher] = useState('')
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('');



    const submitHandler = async () => {
        setLoading(true);
        const value = await AsyncStorage.getItem('userDetails')
        const userVal = JSON.parse(value)
        console.log({
            Id: item.Id,
            Name: Title,
            Admin_Id: userVal?.Contact_no,
            Admin_Name: userVal?.Name,
            Publisher: publisher,
            Category: category,
            url: url,
        })
        if (Title != '' && publisher != '' && category != '' && url != '') {
            try {
                let id = AppFunctions.Datetoday() + AppFunctions.now();
                update(ref(db, 'Research_Papers/' + item.Id), {
                    Id: item.Id,
                    Name: Title,
                    Admin_Id: userVal?.Contact_no,
                    Admin_Name: userVal?.Name,
                    Publisher: publisher,
                    Category: category,
                    url: url,
                    image: image
                }).then(() => {
                    console.log("Updated")
                    navigation.navigate('AdminResearchPaperList');
                }).catch((e) => console.log(e))

            } catch (error) {
                console.log(error)
            }
        } else {
            Alert.alert('Invalid Input', 'Please fill all boxes')
        }
        setLoading(false);
    };

    const uploadImageHandler = async () => {
        try {
            const response = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
                type: [types.images],
            });
            if (response.size > 15728640) {
                Alert.alert("File size should be less than 15MB")
            }
            else {
                convertToBase64(response);
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const convertToBase64 = async (file) => {
        // console.log(file)
        try {
            var data = await RNFS.readFile(file?.uri, 'base64').then((res) => {
                return res;
            })

            setImage(data)
        }
        catch (error) {
            console.log("ERROR", error)
        }
    }



    return (
        <View style={{ flex: 1 }}>
            {
                loading ? (
                    <ActivityIndicator animating={loading} />
                ) : (
                    <ScrollView>
                        <Text style={styles.title}>Enter Details</Text>
                        <View style={styles.textInput_view}>

                            <TextInput
                                style={styles.basicTextInpute}
                                mode='outlined'
                                label={'Title'}
                                placeholderTextColor={'gray'}
                                onChangeText={(text) => {
                                    setTitle(text)
                                }}
                            />
                            <TextInput
                                style={styles.basicTextInpute}
                                mode='outlined'
                                label={'Publisher'}
                                placeholderTextColor={'gray'}
                                onChangeText={(text) => {
                                    setPublisher(text)
                                }}
                            />
                            <TextInput
                                style={styles.basicTextInpute}
                                mode='outlined'
                                label={'Category'}
                                placeholderTextColor={'gray'}
                                onChangeText={(text) => {
                                    setCategory(text)
                                }}
                            />
                            <TextInput
                                style={styles.basicTextInpute}
                                mode='outlined'
                                label={'URL'}
                                placeholderTextColor={'gray'}
                                onChangeText={(text) => {
                                    setUrl(text)
                                }}
                            />
                            {
                                image == '' ?
                                    <Button lable={'Upload Image'} textColor='green' style={{ marginHorizontal: '20%' }} onPress={uploadImageHandler} />
                                    : <Button lable={'Choose another Image'} textColor='green' style={{ marginHorizontal: '20%' }} onPress={uploadImageHandler} />
                            }
                            <View style={{ marginTop: '5%' }}>
                                <Button lable={'SAVE'} linearGradient onPress={submitHandler} />
                            </View>
                        </View>
                    </ScrollView>

                )
            }
        </View>
    )
}

export default EditResearchPaper

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        marginTop: '7%'
    },
    textInput_view: {
        padding: '5%',
        flex: 1
    },
    basicTextInpute: {
        backgroundColor: '#f1f3f6',
        borderRadius: 6,
        paddingHorizontal: 10,
        marginVertical: '3%'
    },
})