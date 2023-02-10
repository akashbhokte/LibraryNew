import { ref, set } from "firebase/database";
import moment from 'moment';
import React, { useState } from 'react';
import {
    Alert,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Card } from 'react-native-shadow-cards';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Label from '../components/Core/Form/Label';
import RadioButton from '../components/Core/Form/RadioButton';
import { useTogglePasswordVisibility } from '../components/useTogglePasswordVisibility';
import { db } from '../firestore/config';
import { AppFunctions } from '../utils/AppFunctions';

const Registration = ({ navigation }) => {
    var date = moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss');


    const [name, setname] = useState('');
    const [MobileNumber, setMobileNumber] = useState('');
    const [Email, setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [type, setType] = useState(0);
    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
        useTogglePasswordVisibility();


    const create = () => {
        // console.log("obj", {
        //     Name: name,
        //     Contact_no: MobileNumber,
        //     Mail_id: Email,
        //     Add: Address,
        //     City: city,
        //     Password: Password,
        //     Type: type
        // })
        if (name != '' && MobileNumber != '' && Email != '' && Address != '') {
            if (Password == ConfirmPassword) {
                let id = AppFunctions.Datetoday() + AppFunctions.now();
                set(ref(db, 'users/' + MobileNumber), {
                    Id: id,
                    Name: name,
                    Contact_no: MobileNumber,
                    Mail_id: Email,
                    Add: Address,
                    Password: Password,
                    Type: type

                }).then(() => {
                    console.log("Submitted Successfully");
                    navigation.navigate('Login');
                }).catch((e) => console.log(e))

            }
            else {
                Alert.alert('Invalid Password')
            }
        }
        else {
            Alert.alert('Invalid Input')
        }
    };

    return (
        <View style={styles.main}>
            <StatusBar
                animated={true}
                backgroundColor="dodgerblue"
                barStyle={'light-content'}
                showHideTransition={'slide'}
            />

            <View style={styles.head}>
                <Text
                    style={{
                        fontSize: 35,
                        color: 'white',
                        marginBottom: '3%',
                        fontFamily: 'Montserrat-Medium',
                        textTransform: 'uppercase',
                    }}>
                    Sign up
                </Text>
            </View>

            <Card style={styles.card}>
                <View>
                    <Text
                        style={{
                            fontSize: 17,
                            textAlign: 'left',
                            color: 'dodgerblue',
                            fontFamily: 'Montserrat-Medium',
                            textAlign: 'center',
                        }}>
                        Create A New Account
                    </Text>
                </View>
                <ScrollView>
                    <View style={styles.textInput_view}>
                        <TextInput
                            style={styles.Inputtext}
                            mode="flat"
                            placeholder="Full Name"
                            value={name}
                            textContentType={'name'}
                            onChangeText={text => setname(text)}
                            theme={{
                                colors: {
                                    primary: 'dodgerblue', // Outline color here
                                },
                            }}
                            right={<TextInput.Icon name="account" color="dodgerblue" />}
                        />
                    </View>

                    <View style={styles.textInput_view}>
                        <TextInput
                            mode="flat"
                            style={styles.Inputtext}
                            placeholder="Mobile Number"
                            value={MobileNumber}
                            maxLength={10}
                            keyboardType="number-pad"
                            textContentType={'telephoneNumber'}
                            onChangeText={text => setMobileNumber(text)}
                            theme={{
                                colors: {
                                    primary: 'dodgerblue', // Outline color here
                                },
                            }}
                            right={<TextInput.Icon name="phone" color="dodgerblue" />}
                        />
                    </View>

                    <View style={styles.textInput_view}>
                        <TextInput
                            mode="flat"
                            style={styles.Inputtext}
                            placeholder="Email Id"
                            value={Email}
                            keyboardType="email-address"
                            onChangeText={text => setEmail(text)}
                            theme={{
                                colors: {
                                    primary: 'dodgerblue', // Outline color here
                                },
                            }}
                            right={<TextInput.Icon name="email" color="dodgerblue" />}
                        />
                    </View>

                    <View style={styles.textInput_view}>
                        <TextInput
                            mode="flat"
                            style={styles.Inputtext}
                            placeholder="Full Addreass"
                            value={Address}
                            multiline={true}
                            onChangeText={text => setAddress(text)}
                            theme={{
                                colors: {
                                    primary: 'dodgerblue', // Outline color here
                                },
                            }}
                            right={<TextInput.Icon name="pen" color="dodgerblue" />}
                        />
                    </View>
                    <View
                        style={[
                            styles.textInput_view,
                            {
                                width: '100%',
                                height: 44,
                                // backgroundColor: '#f1f3f6',
                                borderRadius: 8,
                                paddingHorizontal: 10,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            },
                        ]}>
                        <TextInput
                            style={[styles.Inputtext, { flex: 1, paddingHorizontal: 12 }]}
                            secureTextEntry={true}
                            placeholder={'Password'}
                            textContentType="password!"
                            placeholderTextColor={'gray'}
                            onChangeText={text => setPassword(text)}
                            theme={{
                                colors: {
                                    primary: 'dodgerblue', // Outline color here
                                },
                            }}
                        />
                        {/* <Pressable
                        // onPress={handlePasswordVisibility}
                        >
                            <MaterialCommunityIcons
                                name={rightIcon}
                                size={25}
                                color="dodgerblue"
                            />
                        </Pressable> */}
                    </View>
                    <View
                        style={[
                            styles.textInput_view,
                            {
                                width: '100%',
                                height: 44,
                                // backgroundColor: '#f1f3f6',
                                borderRadius: 8,
                                paddingHorizontal: 10,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            },
                        ]}>
                        <TextInput
                            style={[styles.Inputtext, { flex: 1, paddingHorizontal: 12 }]}
                            secureTextEntry={passwordVisibility}
                            placeholder={'Confirm Password'}
                            textContentType="password!"
                            placeholderTextColor={'gray'}
                            onChangeText={text => setConfirmPassword(text)}
                            theme={{
                                colors: {
                                    primary: 'dodgerblue', // Outline color here
                                },
                            }}
                        />
                        <Pressable
                            onPress={handlePasswordVisibility}
                        >
                            <MaterialCommunityIcons
                                name={rightIcon}
                                size={25}
                                color="dodgerblue"
                            />
                        </Pressable>
                    </View>
                    <View style={{ paddingLeft: '5%' }}>
                        <Label label="Select User Type" />
                        <RadioButton
                            state={type}
                            setState={setType}
                            data={[{ label: 'Buyer' }, { label: 'Seller' },]}
                            labelStyle={{
                                marginVertical: '2%',
                            }}
                        />
                    </View>

                    <View style={styles.button_view}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                create();
                            }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: 'white',
                                    fontWeight: 'normal',
                                    fontFamily: 'Montserrat-Medium',
                                }}>
                                Sign up
                            </Text>
                            <AntDesign
                                name={'login'}
                                size={22}
                                color={'white'}
                                style={{ marginLeft: 30 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'dodgerblue' }} />
                        <View>
                            <Text
                                style={{
                                    width: 50,
                                    textAlign: 'center',
                                    color: 'gray',
                                    fontFamily: 'Montserrat-Medium',
                                }}>
                                OR
                            </Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'dodgerblue' }} />
                    </View>

                    {/* <Divider style={{borderColor:'red',borderWidth:1}} /> */}
                    <View
                        style={{
                            marginVertical: 30,
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}>
                        {/* <TouchableOpacity style={{backgroundColor:'dodgerblue',width:100,height:45,justifyContent:'center',borderRadius:20}}> */}
                        <View style={{ flex: 0.8 }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: 'grey',
                                    textAlign: 'right',
                                    fontFamily: 'Montserrat-Medium',
                                }}>
                                Already Have an account?
                            </Text>
                        </View>
                        <View style={{ flex: 0.3 }}>
                            <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: 'dodgerblue',
                                        marginLeft: 10,
                                        fontFamily: 'Montserrat-Medium',
                                    }}>
                                    Log in
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Card>
        </View>
    );
};

export default Registration;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'ghostwhite',
    },
    head: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.2,
        backgroundColor: 'dodgerblue',
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    card: {
        backgroundColor: 'white',
        flex: 0.8,
        borderRadius: 10,
        padding: 10,
        marginTop: '-5%',
        marginBottom: '4%',
        marginHorizontal: '4%',
        width: '92%',
        shadowColor: 'dodgerblue',
    },
    textInput_view: {
        marginTop: '10%',
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
    },
    Inputtext: {
        height: 40,
        backgroundColor: 'white',
    },
    button_view: {
        marginVertical: 35,
        alignItems: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 40,
        backgroundColor: 'dodgerblue',
        height: 45,
        width: 250,
        borderRadius: 5,
        flexDirection: 'row',
    },
});
