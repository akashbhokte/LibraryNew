import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { Card } from 'react-native-shadow-cards';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import axios from 'axios'
import { useTogglePasswordVisibility } from '../components/useTogglePasswordVisibility';
import { db } from '../firestore/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {


    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState();

    const getData = () => {
        const starCountRef = ref(db, 'users/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setData(data)
            console.log(data)
        });
    }

    useEffect(() => {
        getData();
    }, [])

    const loginHandler = async () => {
        if (data[mobile]) {
            if (data[mobile].Password == password) {
                await AsyncStorage.setItem('userDetails', value)
                if (data[mobile].Type == 1) {
                    navigation.navigate('SellerDashboard')
                } else {
                    navigation.navigate('Home')

                }
            } else {
                Alert.alert('Worng Password', 'Please Enter Valid Password...')
            }
        }
        else {
            Alert.alert('User Not Found!', 'Please Enter Registered Mobile Number...')
        }


    }

    return (
        <View style={styles.main}>
            <Card style={styles.card}>
                <Text style={styles.Text_Title}>Login</Text>
                <Divider height={5} width="100%" />

                {/* Text Inpute */}
                <ScrollView>
                    <View style={styles.textInput_view}>

                        <TextInput
                            style={styles.basicTextInpute}
                            placeholder={'Mobile Number'}
                            textContentType='telephoneNumber'
                            keyboardType='numeric'
                            autoCapitalize='none'
                            placeholderTextColor={'gray'}
                            maxLength={10}
                            onChangeText={(mobile) => setMobile(mobile)}
                        />

                    </View>

                    <View style={{ flex: 1, marginVertical: '5%', flexDirection: "row" }}>
                        <View style={{ flex: 1, justifyContent: 'center', width: '100%' }}>

                            <View style={styles.inputView}>
                                {/* <Icon color='dodgerblue' name='lock' type='font-awesome' size={20} /> */}
                                <TextInput
                                    style={{ flex: 1, paddingHorizontal: 12 }}
                                    secureTextEntry={passwordVisibility}
                                    placeholder={"Password"}
                                    textContentType='password!'
                                    placeholderTextColor={'gray'}
                                    onChangeText={(password) => setPassword(password)}
                                />
                                <Pressable onPress={handlePasswordVisibility}>
                                    <MaterialCommunityIcons name={rightIcon} size={25} color='dodgerblue' />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button_view}
                        // onPress={submithandler}
                        onPress={loginHandler}
                    >
                        <View style={styles.button} >
                            <Text style={styles.Button_Text}>Log In</Text>
                        </View>
                    </TouchableOpacity>


                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'dodgerblue' }} />
                        <View>
                            <Text style={{ width: 50, textAlign: 'center', fontFamily: 'Montserrat-Light', color: 'gray' }}>OR</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'dodgerblue' }} />
                    </View>

                    {/* Don't have an account? & Sign up - Button */}
                    <View style={{ marginVertical: 30, alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{ flex: 0.8, }}>
                            <Text style={{ fontSize: 14, color: 'grey', textAlign: 'right', fontFamily: 'Montserrat-Regular', }}>Don't have an account?</Text>
                        </View>
                        <View style={{ flex: 0.4, }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                                <Text style={{ fontSize: 17, color: 'dodgerblue', marginLeft: 10, fontFamily: 'Montserrat-Medium', }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Card>
        </View >
    )
}

export default Login;

// Style Css --->
const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',

    },
    Text_Title: {
        fontSize: 25,
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'Montserrat-Regular',
        color: 'black',
    },
    textInput_view: {
        marginTop: "10%",
    },
    Inputtext: {
        height: 40,
        backgroundColor: 'white'
    },
    button_view: {
        flex: 1,
        marginVertical: 35,
        alignItems: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 40,
        backgroundColor: 'dodgerblue',
        height: 45,
        width: '100%',
        borderRadius: 5,
        flexDirection: 'row',
    },
    Button_Text: {
        fontSize: 18,
        // fontWeight: '600',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Montserrat-Medium',
    },
    basicTextInpute: {
        width: '100%',
        height: 44,
        backgroundColor: '#f1f3f6',
        borderRadius: 6,
        paddingHorizontal: 10,
    },
    inputView: {
        width: '100%',
        height: 44,
        backgroundColor: '#f1f3f6',
        borderRadius: 8,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }

})
