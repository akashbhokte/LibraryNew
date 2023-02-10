import AsyncStorage from '@react-native-async-storage/async-storage';
import { onValue, ref } from 'firebase/database';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import { Card } from 'react-native-shadow-cards';
import { Colors } from '../constants';
import { db } from '../firestore/config';

const ResearchPaperList = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false)
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    const getData = () => {
        setLoading(true);
        try {
            const starCountRef = ref(db, 'Research_Papers/');
            onValue(starCountRef, async (snapshot) => {
                const data = snapshot.val();
                if (data) var myData = Object.keys(data).map(key => {
                    return data[key];
                })
                setFilteredDataSource(myData)
                setMasterDataSource(myData)
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
                    const itemData = item.Category
                        ? item.Category.toUpperCase()
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
            <View>
                <TouchableOpacity
                    onPress={() => Linking.openURL(item?.url)}
                >
                    <View style={styles.Card_Container}>
                        <View style={styles.Container_Item_Image}>
                            <Image
                                source={{ uri: `data:image/jpeg;base64,${item.image}` }}

                                style={styles.Image_Style} />
                        </View>
                        <View style={styles.Container_Item_Desc} >
                            <Text style={styles.Text_Style_Title}>{item.Name}</Text>
                            < Text style={styles.Text_Style_P} >Publisher: {item.Publisher}</Text>
                            < Text style={styles.Text_Style_P} >Category: {item.Category}</Text>
                        </View>
                    </View>

                </TouchableOpacity>
            </View>
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
                        {
                            loading ? (
                                <ActivityIndicator animating={loading} />
                            ) : (

                                <FlatList
                                    data={filteredDataSource}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={ItemView}
                                />
                            )
                        }
                    </View>
                </Card>
            </View>
        </View >
    )
}

export default ResearchPaperList

const styles = StyleSheet.create({
    Main_Body: {
        flex: 1,
        backgroundColor: Colors.ghostWhite,

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
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
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
        fontSize: 20,
        justifyContent: 'center',
        color: 'black',
        fontFamily: 'monospace'
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
        fontFamily: 'monospace'
    },
    Image_Style: {
        width: '100%',
        height: '100%',
    }
})

