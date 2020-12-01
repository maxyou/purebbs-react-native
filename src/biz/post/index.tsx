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
import PostBar from './bar'
interface Props {
  navigation: any,
  route: any
}

const StyledViewPageSelect = styled(View)`
  height: 50px;
`
const PostScreen: React.FC<Props> = function (props) {


  return (
    <View>      
      {/* <StyledViewPageSelect> */}
        <PostBar></PostBar>
      {/* </StyledViewPageSelect>       */}
      <List></List>
    </View>
  );
};


export default PostScreen;