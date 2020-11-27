import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
  PermissionsAndroid
} from 'react-native';
import styled from 'styled-components/native'
import Post from './post'

const DetailScreen: React.FC<Props> = (props) => {

    console.log('in DetailScreen')
    console.log(props)
    const { navigation, route } = props
    const { id } = route.params;
    return (
       <View>           
           <Text>DetailScreen</Text>
           <Text>id:{id}</Text>
            <Button
                title="go back"
                onPress={() => props.navigation.goBack()}                
              />
       </View>
    );
  };
  
  interface Props{
    navigation:any,
    route:any
  }
  export default DetailScreen;