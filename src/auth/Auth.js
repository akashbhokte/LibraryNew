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
                <Stack.Screen name="SellerDashboard" component={SellerDashboard} options={{ headerTitle: 'Dashboard' }} />
                <Stack.Screen name="Orders" component={Orders} options={{ headerTitle: 'Orders' }} />
                <Stack.Screen name="ResearchPaperList" component={ResearchPaperList} options={{ headerTitle: 'Research Papers' }} />
                <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ headerTitle: 'Dashboard' }} />
                <Stack.Screen name="UserInfo" component={UserInfo} options={{ headerTitle: 'Users' }} />
                <Stack.Screen name="UserDetails" component={UserDetails} options={{ headerTitle: 'Details' }} />
                <Stack.Screen name="Transactions" component={Transactions} options={{ headerTitle: 'Orders' }} />
                <Stack.Screen name="AdminTransactions" component={AdminTransactions} options={{ headerTitle: 'Orders' }} />
                <Stack.Screen name="BuyerBookList" component={BuyerBookList} options={{ headerTitle: 'Books' }} />
                <Stack.Screen name="AdminBookList" component={AdminBookList} options={{ headerTitle: 'Books' }} />
                <Stack.Screen name="AddBook" component={AddBook} options={{ headerTitle: 'Add Book' }} />
                <Stack.Screen name="EditBook" component={EditBook} options={{ headerTitle: 'Edit Book' }} />
                <Stack.Screen name="SellerBookList" component={SellerBookList} options={{ headerTitle: 'Books' }} />
                <Stack.Screen name="BuyerDashboard" component={BuyerDashboard} options={{ headerTitle: 'Dashboard' }} />
                <Stack.Screen name="BuyerBooksDetails" component={BuyerBooksDetails} options={{ headerTitle: 'Details' }} />
                <Stack.Screen name="AdminBooksDetails" component={AdminBooksDetails} options={{ headerTitle: 'Details' }} />
                <Stack.Screen name="SellerBooksDetails" component={SellerBooksDetails} options={{ headerTitle: 'Details' }} />
                <Stack.Screen name="TransactionDetails" component={TransactionDetails} options={{ headerTitle: 'Details' }} />
                <Stack.Screen name="SellerTransactionList" component={SellerTransactionsList} options={{ headerTitle: 'Orders' }} />
                <Stack.Screen name="SellerTransactionDetails" component={SellerTransactionDetails} options={{ headerTitle: 'Details' }} />
                <Stack.Screen name="AdminTransactionDetails" component={AdminTransactionDetails} options={{ headerTitle: 'Details' }} />
                <Stack.Screen name="AdminResearchPaperList" component={AdminResearchPaperList} options={{ headerTitle: 'Research Papers' }} />
                <Stack.Screen name="ResearchPaperDetails" component={ResearchPaperDetails} options={{ headerTitle: 'Details' }} />
                <Stack.Screen name="EditResearchPaper" component={EditResearchPaper} options={{ headerTitle: 'Edit' }} />
                <Stack.Screen name="AddResearchPaper" component={AddResearchPaper} options={{ headerTitle: 'Add Research Paper' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Auth;