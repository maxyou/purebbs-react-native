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
import List from './list'
interface Props {
  navigation: any,
  route: any
}

const PostScreen: React.FC<Props> = function (props) {


  return (
    <View>
      {/* <Button
        title="Go to Detail@@@@@@@@@@@@"
        onPress={() => {
          console.log('press goto detail')
          props.navigation.navigate('Detail', { id: '--id-------' })
        }}
      />
      <Button
        title="Update the title"
        onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
      /> */}
      <List></List>
    </View>
  );
};


export default PostScreen;