
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
// import AntDesign from 'react-native-vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import moment from 'moment';
import { Colors } from '../constants';
import Button from '../components/Core/Form/Button';
import { onValue, ref, remove } from 'firebase/database';
import { db } from '../firestore/config';
import { CategoryReader } from '../utils/CategoryReader';
import { AppFunctions } from '../utils/AppFunctions';

const SellerBooksDetails = ({ navigation, route }) => {
    const item = route.params.item
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)


    const getData = () => {
        const starCountRef = ref(db, 'Seller_Master/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            var myData = AppFunctions.convertToArray(data)
            // console.log("myData", myData)
            setData(myData)
        });
    }

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

    useEffect(() => {
        getData();
    }, [])


    let showDate = moment(item.release_date).format('MMM DD, YYYY')
    return (
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
                        <Text style={styles.sellerName}>Category: {CategoryReader(0)}</Text>
                        <Text style={styles.sellerName}>Listing Date: {AppFunctions.dateShowConvert(item.Listing_Date)}</Text>
                    </View>
                    {/* <Text style={{ color: 'white', fontFamily: 'monospace', fontSize: 15 }}>
                        {item.overview}
                    </Text> */}
                    <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                        <View style={{ flex: 1, marginHorizontal: '5%', }}>
                            <Button lable={'Edit'} linearGradient onPress={() => navigation.navigate('EditBook', { item: item })} />
                        </View>
                        <View style={{ flex: 1, marginHorizontal: '5%', }}>
                            {
                                loading ? <Text>loading</Text> :
                                    <Button lable={'Delete'} textColor='red' onPress={() => deleteHandler(item.Id)} />
                            }
                        </View>
                    </View>
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
    }
})