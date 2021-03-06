import React, { Fragment } from 'react';
import PostScreen from '../biz/post'
import AddScreen from '../biz/post/add'
import {Vote, Lineup} from '../biz/extend'
import {Login, Register, UserInfo} from '../biz/user'
import { post as DetailPost, comment as DetailComment } from '../biz/detail'
import { Modal } from '../biz/try'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
} from 'react-native';
import styled from 'styled-components/native'
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
interface Props {
  navigation: any
}
// const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Post"
        screenOptions={{
          headerStyle: {
            backgroundColor: themeContext.header.backgroundColor,
          },
          headerTintColor: themeContext.header.headerTintColor,
          headerTitleStyle: {
            // fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="Post" component={PostScreen} options={{title:'PureBBS'}} />
        <Stack.Screen name="DetailPost" component={DetailPost} options={{ title: 'DetailPost' }} />
        <Stack.Screen name="DetailComment" component={DetailComment} options={{ title: 'DetailComment' }} />
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }} />
        <Stack.Screen name="UserInfo" component={UserInfo} options={{ title: 'UserInfo' }} />
        <Stack.Screen name="AddScreen" component={AddScreen} options={{ title: 'AddScreen' }} />
        <Stack.Screen name="Vote" component={Vote} options={{ title: 'Vote' }} />
        <Stack.Screen name="Lineup" component={Lineup} options={{ title: 'Lineup' }} />
        <Stack.Screen name="Modal" component={Modal} options={{ title: 'Modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
