
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
// import AntDesign from 'react-native-vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import moment from 'moment';
import { Colors } from '../constants';
import Button from '../components/Core/Form/Button';
import { AppFunctions } from '../utils/AppFunctions';
import { CategoryReader } from '../utils/CategoryReader';

const AdminBooksDetails = ({ navigation, route }) => {
    const item = route.params.item

    return (
        <View style={styles.Main_Body}>
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
                            <Text style={styles.sellerName}>MRP: {item?.MRP}</Text>
                            <Text style={styles.sellerName}>Quantity {item?.Quantity}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.sellerName}>Category: {CategoryReader(item?.Category)}</Text>
                            <Text style={styles.sellerName}>Listing Date: {AppFunctions.dateShowConvert(item.Listing_Date)}</Text>
                        </View>

                    </ScrollView>
                </View >
            </View >
        </View >
    )
}

export default AdminBooksDetails

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