
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
// import AntDesign from 'react-native-vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import moment from 'moment';
import { Colors } from '../constants';
import Button from '../components/Core/Form/Button';

const AdminTransactionDetails = ({ navigation, route }) => {
    const item = route.params.item
    const items = item.items

    // console.log("items.....", item)
    const [Movie, setMovie] = useState('');
    // useEffect(() => {
    //     console.log('reload...................');
    //     getNP();
    // }, []);

    // async function getNP() {
    //     // console.log('Hello');
    //     var resdata = await axios.get(
    //         'https://api.themoviedb.org/3/movie/top_rated?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed',

    //     );
    //     console.log('resdata is ', resdata.data.results[0]);
    //     setMovie(resdata.data.results[1]);
    // }
    let showDate = moment(item.release_date).format('MMM DD, YYYY')
    return (
        <View style={styles.Main_Body}>
            <View style={{ flex: 1, alignItems: 'center', marginTop: '5%' }}>
                <Image source={{
                    uri: 'https://image.tmdb.org/t/p/w500/' + item.poster_path,
                }}
                    style={styles.Image_Style}
                />
            </View>
            <View style={{ flex: 1, }}>
                <ScrollView>
                    <Text style={styles.Title_Text}>
                        {item.title}
                    </Text>
                    <Divider style={{ borderWidth: 0.3, borderColor: 'white' }} />
                    <Text style={{ ...styles.autherName, }}>Date & Time:</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.autherName}>Price: Rs. 499</Text>
                        <Text style={styles.autherName}>Auther: Name</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.sellerName}>Seller: Name</Text>
                        <Text style={styles.sellerName}>Buyer: Name</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.sellerName}>Type:</Text>
                        <Text style={styles.sellerName}>Status: pending</Text>
                    </View>
                </ScrollView>
            </View >
        </View >
    )
}

export default AdminTransactionDetails

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