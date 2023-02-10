// In Auth.js in a new project

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import AddBook from '../screens/AddBook';
import AddResearchPaper from '../screens/AddResearchPaper';
import AdminBooksDetails from '../screens/AdminBookDetails';
import AdminBookList from '../screens/AdminBookList';
import AdminDashboard from '../screens/AdminDashboard';
import AdminResearchPaperList from '../screens/AdminResearchPaperList';
import AdminTransactionDetails from '../screens/AdminTransactionDetails';
import AdminTransactions from '../screens/AdminTransactions';
import BuyerBookList from '../screens/BuyerBookList';
import BuyerBooksDetails from '../screens/BuyerBooksDetails';
import BuyerDashboard from '../screens/BuyerDashboard';
import EditBook from '../screens/EditBook';
import EditResearchPaper from '../screens/EditResearchPaper';
import Login from '../screens/Login';
import Orders from '../screens/Orders';
import Registration from '../screens/Registration';
import ResearchPaperDetails from '../screens/ResearchPaperDetails';
import ResearchPaperList from '../screens/ResearchPaperList';
import SellerBooksDetails from '../screens/SellerBookDetails';
import SellerBookList from '../screens/SellerBookList';
import SellerDashboard from '../screens/SellerDashBoard';
import SellerTransactionDetails from '../screens/SellerTransactionDetails';
import SellerTransactionsList from '../screens/SellerTransactionList';
import TransactionDetails from '../screens/TransactionDetails';
import Transactions from '../screens/Transactions';
import UserDetails from '../screens/UserDetails';
import UserInfo from '../screens/UserInfo';
import UserType from '../screens/UserType';

const Stack = createNativeStackNavigator();

function Auth() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="UserType" component={UserType} />
                <Stack.Screen name="SellerDashboard" component={SellerDashboard} />
                <Stack.Screen name="Orders" component={Orders} />
                <Stack.Screen name="ResearchPaperList" component={ResearchPaperList} options={{ headerTitle: 'Research Papers' }} />
                <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
                <Stack.Screen name="UserInfo" component={UserInfo} />
                <Stack.Screen name="UserDetails" component={UserDetails} />
                <Stack.Screen name="Transactions" component={Transactions} />
                <Stack.Screen name="AdminTransactions" component={AdminTransactions} />
                <Stack.Screen name="BuyerBookList" component={BuyerBookList} />
                <Stack.Screen name="AdminBookList" component={AdminBookList} />
                <Stack.Screen name="AddBook" component={AddBook} />
                <Stack.Screen name="EditBook" component={EditBook} />
                <Stack.Screen name="SellerBookList" component={SellerBookList} />
                <Stack.Screen name="BuyerDashboard" component={BuyerDashboard} />
                <Stack.Screen name="BuyerBooksDetails" component={BuyerBooksDetails} />
                <Stack.Screen name="AdminBooksDetails" component={AdminBooksDetails} />
                <Stack.Screen name="SellerBooksDetails" component={SellerBooksDetails} />
                <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
                <Stack.Screen name="SellerTransactionList" component={SellerTransactionsList} />
                <Stack.Screen name="SellerTransactionDetails" component={SellerTransactionDetails} />
                <Stack.Screen name="AdminTransactionDetails" component={AdminTransactionDetails} />
                <Stack.Screen name="AdminResearchPaperList" component={AdminResearchPaperList} />
                <Stack.Screen name="ResearchPaperDetails" component={ResearchPaperDetails} />
                <Stack.Screen name="EditResearchPaper" component={EditResearchPaper} />
                <Stack.Screen name="AddResearchPaper" component={AddResearchPaper} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Auth;