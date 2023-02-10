import * as React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Card } from 'react-native-shadow-cards';
import Button from '../components/Core/Form/Button';
import { Colors } from '../constants';

const Orders = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed')
            .then((response) => response.json())
            .then((responseJson) => {
                setFilteredDataSource(responseJson.results);
                setMasterDataSource(responseJson.results);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    console.log("filteredDataSource", filteredDataSource[0])

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(
                function (item) {
                    const itemData = item.title
                        ? item.title.toUpperCase()
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
                <View>
                    <View style={styles.Container_Item_Desc} >
                        <Text style={styles.Text_Style_Title}>{item.title}</Text>
                        <Text style={styles.Text_Style_P}>Date of Order: 12/12/2022</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Text_Style_P}>Buyer: Name</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Text_Style_P} >Status: </Text>
                            <Text style={{ ...styles.Text_Style_P, color: 'red' }} >Pending</Text>
                        </View>
                        <Button lable={'Change Status'} textColor='grey' />
                    </View>
                </View>
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

export default Orders

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
    },
    Image_Style: {
        width: '100%',
        height: '100%',
    }
})






// https://image.tmdb.org/t/p/w500/