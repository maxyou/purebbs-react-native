import React, { Fragment } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
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


const PostScreen: React.FC<IState2Prop & IDispatch2Prop & Props> = function (props) {

  const {user} = props

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        user.isLogin?
        <Button onPress={() => props.navigation.navigate('UserInfo')} title="User" />
        :
        <Button onPress={() => props.navigation.navigate('Login')} title="Login" />
      ),
    });
  }, [user.isLogin]);

  return (
    <View>      
      {/* <StyledViewPageSelect> */}
        <PostPaging></PostPaging>
      {/* </StyledViewPageSelect>       */}
      <List></List>
    </View>
  );
};


// export default PostScreen;
interface IState2Prop {
  user: any,
  words: any,
}
interface IDispatch2Prop {
}

const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  user: state.user,
  words: state.locale.words,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
})
export default
(connect(
  mapStateToProps,
  mapDispatchToProps
) as any) (PostScreen)