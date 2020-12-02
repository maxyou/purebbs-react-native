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
import PostPaging from './paging'
interface Props {
  navigation: any,
  route: any
}

const StyledViewPageSelect = styled(View)`
  height: 50px;
`
const PostScreen: React.FC<Props> = function (props) {
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => props.navigation.navigate('Login')} title="User" />
      ),
    });
  }, []);

  return (
    <View>      
      {/* <StyledViewPageSelect> */}
        <PostPaging></PostPaging>
      {/* </StyledViewPageSelect>       */}
      <List></List>
    </View>
  );
};


export default PostScreen;