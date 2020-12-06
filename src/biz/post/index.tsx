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
  Image,
  StatusBar,
  PermissionsAndroid,
  TouchableOpacity
} from 'react-native';
import styled from 'styled-components/native'
import { Btn } from '../../component'
import List from './list'
import PostPaging from './paging'
import { calc, time } from '../../tool'
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

const styles = (props: any) =>StyleSheet.create({
  toStyle: {
    backgroundColor: '#37688c',
    elevation: 8,
    width: 50,
    height: 30,
    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtStyle: {
    textAlign: 'center',
    marginVertical: 8,
    // color: props.button.titleColor,
  },
});

const StyledViewPageSelect = styled(View)`
  height: 50px;
`

const StyledImageAvatar = styled(Image)`
  width: 40px;
  height: 40px;
  borderRadius: 20px;
  marginRight: 10px;
  `
const PostScreen: React.FC<IState2Prop & IDispatch2Prop & Props> = function (props) {
  const themeContext = useContext(ThemeContext);
  const { user } = props

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        user.isLogin ? <>
          <TouchableOpacity onPress={() => props.navigation.navigate('UserInfo')}>
            <StyledImageAvatar source={{ uri: calc.getUserAvatarPath(props.user) }} />
          </TouchableOpacity>
          {/* <Button onPress={() => props.navigation.navigate('UserInfo')} title="User" /> */}
        </>
          :
          // <Button onPress={() => props.navigation.navigate('Login')} title="Login" />
          <Btn
            toStyle={styles(themeContext).toStyle}
            txtStyle={styles(themeContext).txtStyle}
            title={props.words.user_login}
            onPress={() => props.navigation.navigate('Login')}
          />
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

interface Props {
  navigation: any,
  route: any
}

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
  ) as any)(PostScreen)