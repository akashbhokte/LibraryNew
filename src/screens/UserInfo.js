import * as React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Card } from 'react-native-shadow-cards';
import Button from '../components/Core/Form/Button';
import { Colors } from '../constants';

const UserInfo = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState();

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
                <TouchableOpacity
                    onPress={() => navigation.navigate('UserDetails', { item: item })}
                >
                    <View style={styles.Container_Item_Desc} >
                        <Text style={styles.Text_Style_Title}>{item.title}</Text>
                        <Text style={styles.Text_Style_P}>Date of Transaction: 12/12/2022</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Text_Style_P}>Seller: Name</Text>
                            <Text style={styles.Text_Style_P}>Buyer: Name</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Text_Style_P}>Type: Name</Text>
                            <Text style={styles.Text_Style_P} >Status: Pending</Text>
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
                <View style={styles.filterButtonContainer}>
                    <TouchableOpacity onPress={() => setSelectedFilter('Buyer')}>
                        <Text style={{
                            ...styles.filterButton,
                            backgroundColor: selectedFilter == 'Buyer' ? 'skyblue' : 'white',
                            color: selectedFilter == 'Buyer' ? 'white' : 'black'
                        }}>Buyer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedFilter('Seller')}>
                        <Text style={{
                            ...styles.filterButton,
                            backgroundColor: selectedFilter == 'Seller' ? 'skyblue' : 'white',
                            color: selectedFilter == 'Seller' ? 'white' : 'black'
                        }}>Seller</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedFilter('Both')}>
                        <Text style={{
                            ...styles.filterButton,
                            backgroundColor: selectedFilter == 'Both' ? 'skyblue' : 'white',
                            color: selectedFilter == 'Both' ? 'white' : 'black'
                        }}>Both</Text>
                    </TouchableOpacity>
                </View>
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

export default UserInfo

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
    },
    filterButton: {
        borderWidth: 1,
        paddingVertical: '2%',
        paddingHorizontal: '5%',
        borderRadius: 8,
        fontWeight: 'bold'
    },
    filterButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: '3%'
    }

})






// https://image.tmdb.org/t/p/w500/