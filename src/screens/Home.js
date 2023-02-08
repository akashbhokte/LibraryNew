
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, ScrollView, RefreshControl, FlatList, ActivityIndicator } from 'react-native';
// import { Icon } from 'react-native-elements';
// import axios from 'axios';
import { Card } from 'react-native-shadow-cards';
// import { useAuth } from '../frameWork/Auth/Auth';
// import AppConstants from '../AppConstants';
// import FirebaseComponent from '../frameWork/Components/FirebaseComponent/index';
import { Divider, } from 'react-native-paper';
// import ReadMore from 'react-native-read-more-text';
const _ = require('lodash');
// import GetLocation from 'react-native-get-location';


const Home = ({ navigation }) => {

    // Const ->
    const [loadingBooks, setLoadingBooks] = useState(true);
    const [loadingAllBooks, setLoadingAllBooks] = useState(false);
    const [AllBooks, setAllBooks] = useState([])
    // const auth = useAuth();
    // const { state: { userdata: UserDetails } } = useAuth();
    // var LoginInfo = auth.state.userdata;
    const [location, setlocation] = useState([])
    const [Count, setCount] = useState([])

    // console.log("Count", Count)

    // Use-Effect ->
    // useEffect(() => {
    //     ApiCall()
    //     GetLocationApi()
    //     BookCount()
    //     TotalBooksCountApi()
    // }, [])

    // Api Call ->
    // async function ApiCall() {
    //     setLoadingBooks(true)
    //     setLoadingAllBooks(true)
    //     try {
    //         const res = await axios.get(AppConstants.APIurl + '/bookmaster/', {});
    //         setAllBooks(res.data.Message);
    //     } catch (e) {
    //         console.error(e)
    //     }
    //     setLoadingBooks(false)
    //     setLoadingAllBooks(false)
    // }

    // async function BookCount() {
    //     setLoadingBooks(true)
    //     try {

    //         const res_BooksDetails = await axios.post(
    //             AppConstants.APIurl + '/getbookaddedbymember/',
    //             {
    //                 // "owner": UserDetails.recno,
    //                 "memberrecno": UserDetails.recno,

    //             }
    //         );
    //         setCount(res_BooksDetails.data.Count);
    //     } catch (e) {
    //         console.error(e)
    //     }
    //     setLoadingBooks(false)
    // }

    const [TotalBooksCount, setTotalBooksCount] = useState('')

    // async function TotalBooksCountApi() {
    // setLoadingBooks(true)
    // try {
    //     const res_TotalBooksCount = await axios.post(AppConstants.APIurl + '/filterbookmaster/', {});
    //     if (res_TotalBooksCount.data.Success) {
    //         setTotalBooksCount(res_TotalBooksCount.data.Count)
    //     } else {
    //         console.log('error')
    //     }
    // } catch (e) {
    //     console.error(e)
    // }
    // setLoadingBooks(false)
    // }



    // console.log('TotalBooksCount', TotalBooksCount)


    // var sortdata = _.sortBy(AllBooks, ['trdate']);
    var sortdata = _.sortBy(AllBooks, ['trdate', 'recno']).reverse();

    // for Ascending Dates
    // const sorted = sortdata.sort((a, b) => {
    //     const aDate = new Date(a.trdate);
    //     const bDate = new Date(b.trdate);
    //     return bDate.getTime() - aDate.getTime();
    // });


    function GetLocationApi() {
        // try {
        //     GetLocation.getCurrentPosition({
        //         enableHighAccuracy: true,
        //         timeout: 15000,
        //     })
        //         .then(location => {
        //             // console.log("location", location);
        //             setlocation(location)
        //         })
        //         .catch(error => {
        //             const { code, message } = error;
        //             console.warn(code, message);
        //         })
        // } catch (error) {
        //     console.log(error)
        // }
    }


    // const RenderItem2 = ({ item, index }) => {
    //     return (
    //         <View style={{ flex: 2, margin: 4, justifyContent: 'center', padding: 1, }} key={index.toString()}>
    //             <TouchableOpacity onPress={() => navigation.navigate('SubscribeBook', { item })}>
    //                 <Card style={{ width: 120, height: 200 }}>
    //                     <View style={{ flex: 2, borderRadius: 12 }}>
    //                         {item.image ? (
    //                             <Image
    //                                 source={{ uri: `data:image/png;base64,${item.image}` }}
    //                                 style={{ height: "100%", width: "100%", borderTopRightRadius: 12, borderTopLeftRadius: 12 }}
    //                                 resizeMode="stretch"
    //                             />
    //                         ) : (<Image style={{ width: 80, height: 80, borderRadius: 10, opacity: 0.2 }}
    //                             source={require('../Images/image-not-found.png')} resizeMode='contain' />)
    //                         }
    //                     </View>
    //                     <View style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center', paddingBottom: 5, paddingHorizontal: 5 }}>
    //                         <Text numberOfLines={1} style={{ fontSize: 14, fontFamily: 'Montserrat-Medium', textTransform: 'uppercase', color: 'black', paddingTop: '3%', textAlign: 'center' }}> {item.booktitle} </Text>
    //                         <Text numberOfLines={1} style={{ fontSize: 12, textTransform: 'uppercase', fontFamily: 'Montserrat-Regular', textAlign: 'center' }}> {item.bookauthor} </Text>
    //                     </View>
    //                 </Card>
    //             </TouchableOpacity>
    //         </View>
    //     );
    // };

    // const AllBooksRender = ({ item, index }) => {
    //     return (
    //         <View style={{ marginHorizontal: '3%', marginVertical: "1%", }} key={index.toString()}>
    //             <TouchableOpacity onPress={() => navigation.navigate('SubscribeBook', { item })}>
    //                 <Card style={{ height: 130, width: '100%' }}>
    //                     <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
    //                         <View style={{ flex: 0.5, marginLeft: "1%" }}>
    //                             {item.image ? (
    //                                 <Image
    //                                     source={{ uri: `data:image/png;base64,${item.image}` }}
    //                                     style={{ height: "95%", width: "95%" }}
    //                                     resizeMode="contain"
    //                                 />
    //                             ) : (<Image style={{ width: 80, height: 80, borderRadius: 10, opacity: 0.2 }}
    //                                 source={require('../Images/image-not-found.png')} resizeMode='contain' />)
    //                             }
    //                         </View>
    //                         <View style={{ flex: 1, justifyContent: 'center' }}>
    //                             {/* <View style={{ flex: 1,  }}> */}
    //                             <View style={{ flex: 0.5, justifyContent: 'center', paddingLeft: "2%", marginHorizontal: "1%", }}>
    //                                 <Text numberOfLines={1} style={{ fontSize: 16, textTransform: 'uppercase', fontFamily: 'Montserrat-Medium', color: 'black' }}> {item.booktitle} </Text>
    //                             </View>
    //                             <Divider />
    //                             <View style={{ flex: 1, flexDirection: 'row' }}>
    //                                 <View style={{ flex: 1, justifyContent: 'center', borderRadius: 10, marginHorizontal: "4%", padding: "4%" }}>
    //                                     <Text style={{ fontSize: 12, textAlign: 'left', fontFamily: 'Montserrat-Regular', }}> Author - </Text>
    //                                     <Text style={{ fontSize: 13, textTransform: 'uppercase', fontWeight: '500', fontFamily: 'Montserrat-Medium', color: 'black' }}>{item.bookauthor} </Text>
    //                                 </View>
    //                                 <View style={{ flex: 0.8, justifyContent: 'center', borderRadius: 10, marginHorizontal: "4%", padding: "5%" }}>
    //                                     <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Regular' }}> Language</Text>
    //                                     <Text style={{ fontSize: 13, textTransform: 'uppercase', fontWeight: '500', fontFamily: 'Montserrat-Medium', color: 'black' }}> {item.language} </Text>
    //                                 </View>
    //                             </View>
    //                             <View style={{ flex: 0.4, borderRadius: 10, paddingLeft: "5%", paddingBottom: "2%", marginHorizontal: "1%", flexDirection: 'row', alignItems: 'center' }}>
    //                                 <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Regular' }}>Category :</Text>
    //                                 {/*  backgroundColor: '#6E3CBC', */}
    //                                 <View style={{ borderRadius: 10, padding: "2%", marginLeft: "2%", alignItems: 'center', justifyContent: 'center', height: "100%" }}>
    //                                     <Text style={{ fontSize: 13, textTransform: 'uppercase', color: 'black', fontFamily: 'Montserrat-Medium' }}> {item.subjectname} </Text>
    //                                 </View>
    //                             </View>
    //                         </View>
    //                     </View>
    //                 </Card>
    //             </TouchableOpacity>
    //         </View>
    //     );
    // };


    return (
        <View style={{ flex: 1 }}>
            {/* <FirebaseComponent
                url={AppConstants.APIurl + "/entity/"}
                payload={{ recno: auth.state.userdata.recno }}
            /> */}
            <StatusBar
                animated={true}
                backgroundColor="white"
                barStyle={'dark-content'}
                showHideTransition={'fade'}

            />
            <View style={styles.Header_Style}>
                <View style={{ flex: 1, }}>
                    {/* <Icon
                        // raised
                        name="menu"
                        type="ionicon"
                        color="dodgerblue"
                        size={24}
                        onPress={() => navigation.openDrawer()}
                    /> */}
                </View>
                <View style={{ flex: 2, alignItems: 'center' }}>
                    <Text style={{ fontSize: 22, color: '#212121', fontFamily: 'Montserrat-Medium', }}>Open Library</Text>
                </View>
                {/* Notification */}
                <View style={{ flex: 1, flexDirection: 'row', padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                    {/* <View style={{ backgroundColor: 'red', borderRadius: 50, width: 15, height: 15, marginRight: -8, zIndex: 1, marginTop: -10 }}>
                        <Text style={{ fontSize: 10, color: 'white', textAlign: 'center' }}>{auth?.state?.notificationcount}</Text>
                    </View>
                    <View>
                        <Icon
                            // raised
                            name="notifications"
                            type="ionicon"
                            color="dodgerblue"
                            size={24}
                            onPress={() => navigation.navigate('NotificationHistory')}
                        />
                    </View> */}
                </View>
            </View>


            <View style={{ flex: 3, }}>
                <ScrollView
                // refreshControl={
                //     <RefreshControl
                //         onRefresh={ApiCall}
                //         refreshing={loadingBooks}
                //     />
                // }
                >
                    <View style={{ flex: 2, flexDirection: 'row', backgroundColor: 'white', height: 60 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ justifyContent: 'center', marginLeft: 18 }}>
                                <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Light', }}>Welcome,</Text>
                            </View>
                            <View style={{ alignItems: 'center', }}>
                                <Text numberOfLines={1} style={{ color: 'black', fontSize: 18, fontWeight: '400', fontFamily: 'Montserrat-Regular', }}>
                                    {/* {LoginInfo.descn} */}
                                    Mr. XYZ
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end', marginHorizontal: 10, marginVertical: 10 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('BooksDetails')}>
                                <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'dodgerblue', justifyContent: 'center', alignItems: 'center', borderRadius: 10, width: '70%' }}>
                                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                        <Text style={styles.BlueButton_Text_Style}>My Books -</Text>
                                        <View style={{ paddingLeft: 10, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: 'white' }}>{Count} </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {
                        loadingAllBooks ? (
                            <View style={{ height: 600, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size={'large'} color={'dodgerblue'} />
                            </View>
                        ) : (
                            <>

                                <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
                                    <View style={{ marginLeft: 15, marginTop: 10, flexDirection: 'row' }}>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 16, fontWeight: '400', color: '#212121', fontFamily: 'Montserrat-Light', }}>New Arrival</Text>
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                            {/* <Icon
                                                name="arrow-forward-outline"
                                                type="ionicon"
                                                color="dodgerblue"
                                                size={24}
                                            /> */}
                                        </View>
                                    </View>


                                    {/* <FlatList
                                        horizontal={true}
                                        showsVerticalScrollIndicator={false}
                                        showsHorizontalScrollIndicator={false}
                                        data={sortdata}
                                        renderItem={({ item, index }) => (
                                            <RenderItem2 item={item} index={index} />
                                        )}
                                        keyExtractor={item => item.recno}
                                        nestedScrollEnabled={true}
                                    /> */}

                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                        {
                                            sortdata.map((item, index) => {
                                                return (
                                                    <View style={{ flex: 2, margin: 4, justifyContent: 'center', padding: 1, }} key={index.toString()}>
                                                        <TouchableOpacity onPress={() => navigation.navigate('SubscribeBook', { item })}>
                                                            <Card style={{ width: 120, height: 200 }}>
                                                                <View style={{ flex: 2, borderRadius: 12 }}>
                                                                    {/* {item.image ? (
                                                                        <Image
                                                                            source={{ uri: `data:image/png;base64,${item.image}` }}
                                                                            style={{ height: "100%", width: "100%", borderTopRightRadius: 12, borderTopLeftRadius: 12 }}
                                                                            resizeMode="stretch"
                                                                        />
                                                                    ) : (<Image style={{ width: 80, height: 80, borderRadius: 10, opacity: 0.2 }}
                                                                        source={require('../Images/image-not-found.png')} resizeMode='contain' />)
                                                                    } */}
                                                                </View>
                                                                <View style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center', paddingBottom: 5, paddingHorizontal: 5 }}>
                                                                    <Text numberOfLines={1} style={{ fontSize: 14, fontFamily: 'Montserrat-Medium', textTransform: 'uppercase', color: 'black', paddingTop: '3%', textAlign: 'center' }}> {item.booktitle} </Text>
                                                                    <Text numberOfLines={1} style={{ fontSize: 12, textTransform: 'uppercase', fontFamily: 'Montserrat-Regular', textAlign: 'center' }}> {item.bookauthor} </Text>
                                                                </View>
                                                            </Card>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            })
                                        }
                                    </ScrollView>


                                </View>
                                <View style={{ flex: 2, backgroundColor: 'ghostwhite' }}>
                                    <View style={{ marginLeft: 15, marginTop: 10, flexDirection: 'row' }}>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 16, fontWeight: '400', color: '#212121', fontFamily: 'Montserrat-Light', }}>Browse Books</Text>
                                        </View>
                                        <View style={{
                                            backgroundColor: 'dodgerblue', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, marginLeft: 10, borderRadius: 12
                                        }}>
                                            <Text style={{ color: 'white' }}>Total Books - {TotalBooksCount}</Text>
                                        </View>
                                        <View style={{ marginLeft: 2 }}>
                                            {/* <Icon
                                                name="arrow-forward-outline"
                                                type="ionicon"
                                                color="dodgerblue"
                                                size={24}
                                            /> */}
                                        </View>
                                    </View>
                                    {/* Another mapping Start From Here */}


                                    {/* <FlatList
                                        showsVerticalScrollIndicator={false}
                                        showsHorizontalScrollIndicator={false}
                                        data={AllBooks}
                                        renderItem={({ item, index }) => (
                                            <AllBooksRender item={item} index={index} />
                                        )}
                                        keyExtractor={item => item.recno}
                                        nestedScrollEnabled={true}
                                    /> */}

                                    <ScrollView>
                                        {
                                            AllBooks.map((item, index) => {
                                                return (
                                                    <View style={{ marginHorizontal: '3%', marginVertical: "1%", }} key={index.toString()}>
                                                        <TouchableOpacity onPress={() => navigation.navigate('SubscribeBook', { item })}>
                                                            <Card style={{ height: 130, width: '100%' }}>
                                                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                    <View style={{ flex: 0.5, marginLeft: "1%" }}>
                                                                        {/* {item.image ? (
                                                                            <Image
                                                                                source={{ uri: `data:image/png;base64,${item.image}` }}
                                                                                style={{ height: "95%", width: "95%" }}
                                                                                resizeMode="contain"
                                                                            />
                                                                        ) : (<Image style={{ width: 80, height: 80, borderRadius: 10, opacity: 0.2 }}
                                                                            source={require('../Images/image-not-found.png')} resizeMode='contain' />)
                                                                        } */}
                                                                    </View>
                                                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                                                        {/* <View style={{ flex: 1,  }}> */}
                                                                        <View style={{ flex: 0.5, justifyContent: 'center', paddingLeft: "2%", marginHorizontal: "1%", }}>
                                                                            <Text numberOfLines={1} style={{ fontSize: 16, textTransform: 'uppercase', fontFamily: 'Montserrat-Medium', color: 'black' }}> {item.booktitle} </Text>
                                                                        </View>
                                                                        <Divider />
                                                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                            <View style={{ flex: 1, justifyContent: 'center', borderRadius: 10, marginHorizontal: "4%", padding: "4%" }}>
                                                                                <Text style={{ fontSize: 12, textAlign: 'left', fontFamily: 'Montserrat-Regular', }}> Author - </Text>
                                                                                <Text style={{ fontSize: 13, textTransform: 'uppercase', fontWeight: '500', fontFamily: 'Montserrat-Medium', color: 'black' }}>{item.bookauthor} </Text>
                                                                            </View>
                                                                            <View style={{ flex: 0.8, justifyContent: 'center', borderRadius: 10, marginHorizontal: "4%", padding: "5%" }}>
                                                                                <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Regular' }}> Language</Text>
                                                                                <Text style={{ fontSize: 13, textTransform: 'uppercase', fontWeight: '500', fontFamily: 'Montserrat-Medium', color: 'black' }}> {item.language} </Text>
                                                                            </View>
                                                                        </View>
                                                                        <View style={{ flex: 0.4, borderRadius: 10, paddingLeft: "5%", paddingBottom: "2%", marginHorizontal: "1%", flexDirection: 'row', alignItems: 'center' }}>
                                                                            <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Regular' }}>Category :</Text>
                                                                            {/*  backgroundColor: '#6E3CBC', */}
                                                                            <View style={{ borderRadius: 10, padding: "2%", marginLeft: "2%", alignItems: 'center', justifyContent: 'center', height: "100%" }}>
                                                                                <Text style={{ fontSize: 13, textTransform: 'uppercase', color: 'black', fontFamily: 'Montserrat-Medium' }}> {item.subjectname} </Text>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            </Card>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            })
                                        }
                                    </ScrollView>


                                </View>
                            </>

                        )
                    }


                </ScrollView>
            </View>



        </View >
    );
};

export default Home;

const styles = StyleSheet.create({

    Header_Style: {
        flex: 0.4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    BlueButton_Container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    BlueButton_TouchableOpacity_Style: {
        elevation: 8,
        backgroundColor: "dodgerblue",
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 10
    },
    BlueButton_Text_Style: {
        fontSize: 14,
        color: "#fff",
        // fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        fontFamily: 'Montserrat-Regular',
    },
});
