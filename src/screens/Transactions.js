import AsyncStorage from '@react-native-async-storage/async-storage';
import { onValue, ref } from 'firebase/database';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Card } from 'react-native-shadow-cards';
import { Colors } from '../constants';
import { db } from '../firestore/config';
import { AppFunctions } from '../utils/AppFunctions';
import { StatusReader } from '../utils/StatusReader';

const Transactions = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [loading, setLoading] = useState(false)

    const getData = () => {
        setLoading(true);
        try {
            const starCountRef = ref(db, 'Orders/');
            onValue(starCountRef, async (snapshot) => {
                const data = snapshot.val();
                if (data) var myData = Object.keys(data).map(key => {
                    return data[key];
                })
                const value = await AsyncStorage.getItem('userDetails')
                const userVal = JSON.parse(value)
                let list = myData.filter((i) => {
                    if (i?.Buyer_Name == userVal?.Name) return i
                })
                console.log(list)
                setFilteredDataSource(list)
                setMasterDataSource(list)
            });
        } catch (error) {

        }
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, [])


    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(
                function (item) {
                    const itemData = item.Book_Name
                        ? item.Book_Name.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    const ItemView = ({ item }) => {
        return (
            <Card style={{ marginVertical: '2%', alignSelf: 'center' }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('TransactionDetails', { item: item })}
                >
                    <View style={styles.Container_Item_Desc} >
                        <Text style={styles.Text_Style_Title}>{item.Book_Name}</Text>
                        <Text style={styles.Text_Style_P}>Ordered Date: {AppFunctions.dateShowConvert(item.Date)}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Text_Style_P}>Price: Rs.{item.Book_Price}.00</Text>
                            <Text style={styles.Text_Style_P}>Quantity: {item.Book_Quantity}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Text_Style_P}>Seller: {item.Seller_Name}</Text>
                            <Text style={styles.Text_Style_P} >Status: {StatusReader(item.Status)}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Text_Style_P}>Expires on: {AppFunctions.dateShowConvert(item.End_dt)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Card>
        );
    };

    return (
        <View style={styles.Main_Body}>
            <View style={styles.SearchBar_Style}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={search}
                />
            </View>
            <View style={styles.Body_View}>
                <Card style={styles.Main_Card_Style}>
                    <View >
                        <FlatList
                            data={filteredDataSource}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={ItemView}
                        />
                    </View>
                </Card>
            </View>
        </View >
    )
}

export default Transactions

const styles = StyleSheet.create({
    Main_Body: {
        flex: 1,
        backgroundColor: Colors.ghostWhite

    },
    SearchBar_Style: {
        margin: 10,
        marginBottom: 0
    },
    Body_View: {
        flex: 1,
        backgroundColor: Colors.ghostWhite
    },
    Main_Card_Style: {
        width: '95%',
        height: '97%',
        margin: 10,
        backgroundColor: Colors.ghostWhite
    },
    Card_Container: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth: 0.3,
        backgroundColor: Colors.ghostWhite
    },
    Container_Item_Image: {
        flex: 0.7,
        justifyContent: 'center'
    },
    Container_Item_Desc: {
        padding: 10,
        flex: 1,
        justifyContent: 'center',
    },
    Text_Style_Title: {
        borderBottomWidth: 0.3,
        fontSize: 15,
        justifyContent: 'center',
        color: 'black',
        fontFamily: 'monospace',
        fontWeight: 'bold',
    },
    Text_Style_Auther: {
        // borderBottomWidth: 0.3,
        fontSize: 16,
        justifyContent: 'center',
        color: 'black',
        fontFamily: 'monospace',
        marginVertical: '4%'
    },
    Text_Style_P: {
        padding: 3,
        // paddingRight: 70,
        fontSize: 13,
        color: 'black',
        fontFamily: 'monospace',
        flex: 1
    },
    Image_Style: {
        width: '100%',
        height: '100%',
    }
})






// https://image.tmdb.org/t/p/w500/