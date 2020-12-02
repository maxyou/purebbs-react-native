import React, { Fragment } from 'react';
import PostScreen from '../biz/post'
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

interface Props {
  navigation: any
}
// const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Post"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#d4713e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="Post" component={PostScreen} options={{title:'PureBBS'}} />
        <Stack.Screen name="DetailPost" component={DetailPost} options={{ title: 'DetailPost' }} />
        <Stack.Screen name="DetailComment" component={DetailComment} options={{ title: 'DetailComment' }} />
        <Stack.Screen name="Modal" component={Modal} options={{ title: 'Modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
