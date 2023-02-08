import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ActivityIndicator, TextInput } from 'react-native-paper'
import RadioButton from '../components/Core/Form/RadioButton'
import Button from '../components/Core/Form/Button'
import DocumentPicker, { types } from 'react-native-document-picker'
import RNFS from 'react-native-fs'
import { child, Database, push, ref, set } from 'firebase/database'
import { AppFunctions } from '../utils/AppFunctions'
import { db } from '../firestore/config'

const AddBook = ({ navigation }) => {
    const [loading, setLoading] = useState(false)

    const [image, setImage] = useState('')
    const [bookTitle, setBookTitle] = useState();
    const [autherName, setAutherName] = useState()
    const [bookPrice, setBookPrice] = useState();
    const [discountedPrice, setDiscountedPrice] = useState();
    const [bookType, setBookType] = useState();
    const [bookCategory, setBookCategory] = useState();
    const [quantity, setQuantity] = useState();

    const create = () => {
        setLoading(true);
        try {
            let id = AppFunctions.Datetoday() + AppFunctions.now();
            set(ref(db, 'Seller_Master/' + id), {
                Id: id,
                Name: bookTitle,
                Author: autherName,
                Category: bookCategory,
                Listing_Date: AppFunctions.Datetoday(),
                Quantity: quantity,
                MRP: bookPrice,
                Dis_Price: discountedPrice,
                image: image

            }).then(() => {
                console.log("Submitted")
                navigation.goBack();
            }).catch((e) => console.log(e))
            setLoading(false);

        } catch (error) {
            console.log(error)
        }
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
                        <Text style={styles.title}>Enter Book Details</Text>
                        <View style={styles.textInput_view}>

                            <TextInput
                                style={styles.basicTextInpute}
                                mode='outlined'
                                label={'Book Title'}
                                placeholderTextColor={'gray'}
                                onChangeText={(text) => {
                                    setBookTitle(text)
                                }}
                            />
                            <TextInput
                                style={styles.basicTextInpute}
                                mode='outlined'
                                label={'Auther Name'}
                                placeholderTextColor={'gray'}
                                onChangeText={(text) => {
                                    setAutherName(text)
                                }}
                            />
                            <TextInput
                                style={styles.basicTextInpute}
                                mode='outlined'
                                label={'Book Price'}
                                keyboardType='number-pad'
                                placeholderTextColor={'gray'}
                                onChangeText={(text) => {
                                    setBookPrice(text)
                                }}
                            />
                            <TextInput
                                style={styles.basicTextInpute}
                                mode='outlined'
                                label={'Discounted Price'}
                                keyboardType='number-pad'
                                placeholderTextColor={'gray'}
                                onChangeText={(text) => {
                                    setDiscountedPrice(text)
                                }}
                            />
                            <TextInput
                                style={styles.basicTextInpute}
                                mode='outlined'
                                label={'Quantity'}
                                keyboardType='number-pad'
                                placeholderTextColor={'gray'}
                                onChangeText={(text) => {
                                    setQuantity(text)
                                }}
                            />

                            <Text style={{ fontSize: 18, color: 'black', marginVertical: '3%' }}>
                                Book Category
                            </Text>
                            <RadioButton data={[
                                {
                                    label: 'History'
                                },
                                {
                                    label: 'Fantasy'
                                },
                                {
                                    label: 'Documentry'
                                },
                                {
                                    label: 'Other'
                                },
                            ]}
                                state={bookCategory}
                                setState={setBookCategory}
                                labelStyle={{ marginVertical: '2%' }}
                            />
                            <Button lable={'Upload Image'} textColor='green' style={{ marginHorizontal: '20%' }} onPress={uploadImageHandler} />
                            <View style={{ marginTop: '5%' }}>
                                <Button lable={'SAVE'} linearGradient onPress={create} />
                            </View>
                        </View>
                    </ScrollView>

                )
            }
        </View>
    )
}

export default AddBook

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