
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
// import AntDesign from 'react-native-vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import moment from 'moment';
import { Colors } from '../constants';
import Button from '../components/Core/Form/Button';

const UserDetails = ({ navigation, route }) => {
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
            <View style={{ flex: 1, }}>
                <ScrollView>
                    <View style={styles.rowContainer}>
                        <Text style={styles.autherName}>
                            Name:
                        </Text>
                        <Text style={styles.autherName}>
                            ABCD
                        </Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.autherName}>
                            Contact Number:
                        </Text>
                        <Text style={styles.autherName}>
                            9865874598
                        </Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.autherName}>
                            Address:
                        </Text>
                        <Text style={styles.autherName}>
                            ABCD
                        </Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.autherName}>
                            City:
                        </Text>
                        <Text style={styles.autherName}>
                            Pune:
                        </Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.autherName}>
                            Type:
                        </Text>
                        <Text style={styles.autherName}>
                            Seller
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: '5%' }}>
                        <Button lable={'Delete'} textColor='red' />
                    </View>
                </ScrollView>
            </View >
        </View >
    )
}

export default UserDetails

const styles = StyleSheet.create({
    Main_Body: {
        flex: 1,
        backgroundColor: Colors.ghostWhite
    },
    autherName: {
        color: 'ghostwhite',
        fontSize: 18,
        flex: 1,
        textAlign: 'left',
        paddingVertical: '5%',
        color: 'black',
        paddingLeft: '8%'
    },
    sellerName: {
        fontSize: 14,
        flex: 1,
        textAlign: 'left',
        marginVertical: '1%',
        color: 'black',
        backgroundColor: 'red'
    },
    rowContainer: {
        flexDirection: 'row'
    }
})