import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { time, sys } from '../../tool'
import { Dispatch } from 'redux';
import { user as actionUser, locale as actionLocale, sys as actionSys, post as actionPost, detail as actionDetail } from '../../redux/action'
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Button,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput
} from 'react-native';
import { Btn } from '../../component'

const styles = StyleSheet.create({
  toStyle: {
    width: '70%',
    backgroundColor: '#37688c',
    elevation: 8,
    height: 30,
    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtStyle: {
    textAlign: 'center',
    marginVertical: 8,
  },
});

const StyledViewContainer = styled(View)`
  padding: 10px;
  justifyContent: center;
  backgroundColor: lightblue;
  alignItems: center;
`
const StyledViewInfo = styled(View)`
  width: 80%;
  padding: 10px;
  justifyContent: center;
  backgroundColor: lightgreen;
  alignItems: stretch;
`
function usePrevious(value: any): any {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
const UserInfo: React.FC<IState2Prop & IDispatch2Prop> = function (props: IState2Prop & IDispatch2Prop) {

  const { isLogin, userLogoutting } = props
  const prevProps: IState2Prop = usePrevious({ isLogin, userLogoutting })
  // const { userAvatarUpdatting, userUpdatting } = props
  const navigation = useNavigation();

  useEffect(
    () => {
      props.userGetStatus()
    }, []
  )
  useEffect(
    () => {
      console.log('app bar useEffect userLogoutReset')
      if (
        prevProps && (prevProps.userLogoutting === true && props.userLogoutting === false)
      ) {
        console.log(`app bar call userLogoutReset after logout ${(!prevProps)}`)
        console.log(`app bar call userLogoutReset after logout ${prevProps.userLogoutting}`)
        console.log(`app bar call userLogoutReset after logout ${props.userLogoutting}`)
        console.log('app bar call userLogoutReset after logout')
        props.userLogoutReset()
        navigation.goBack()
      }
    }, [props.userLogoutting]
  )
  function logout() {
    props.userLogout({ //退出时保存若干个性设置
      language: props.locale.language,
      postPageSize: props.postPageSize,
      commentPageSize: props.commentPageSize,
    })
    // console.log('push to /post')
    // props.history.push('/post')
    // console.log('push to /post 2')
  }


  return (
    <StyledViewContainer>
      {/* <AvatarImg width='35px' src={props.user.avatarPath} /> */}
      <StyledViewInfo>
        <Text>{props.words.user_name}: {props.user.name}</Text>
        <Text>{props.words.user_role}: {props.user.role}</Text>
        <Text>{props.words.user_email}: {props.user.email}</Text>
        <Text>{props.words.cmn_created}: {time.fromNow(props.user.created)}</Text>
      </StyledViewInfo>
      {/* {props.user.source === 'register' ? <button onClick={gotoEdit}> {props.words.cmn_edit}</button> : null} */}
      <Btn title={props.words.user_logout} onPress={logout} toStyle={styles.toStyle} txtStyle={styles.txtStyle} />
    </StyledViewContainer>
  );
}


interface IRouterProp {
  navigation: any,
  route: any,
}
interface IState2Prop {
  isLogin: boolean,
  userLogoutting: boolean,
  words: any,
  user: any,
  locale: any,
  sys: any,
  postPageSize: any,
  commentPageSize: any,
}
interface IDispatch2Prop {
  userGetStatus: (v?: any) => void,
  userLogout: (v?: any) => void,
  userLogoutReset: (v?: any) => void,
  languageSet: (v: any) => void,
  categoryGet: (v?: any) => void,
  changePageSize: (v?: any) => void,
  changeCommentPageSize: (v?: any) => void,
}
const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  words: state.locale.words,
  locale: state.locale,
  user: state.user,
  isLogin: state.user.isLogin,
  userAvatarUpdatting: state.user.userAvatarUpdatting,
  userUpdatting: state.user.userUpdatting,
  userLogoutting: state.user.userLogoutting,
  sys: state.sys,
  postPageSize: state.post.postPageSize,
  commentPageSize: state.detail.commentPageSize,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
  userLogout: (v) => dispatch(actionUser.Creator.userLogout(v)),
  userLogoutReset: (v) => dispatch(actionUser.Creator.userLogoutReset(v)),
  userGetStatus: (v) => dispatch(actionUser.Creator.userGetStatus(v)),
  languageSet: (v) => dispatch(actionLocale.Creator.languageSet(v)),
  categoryGet: (v) => dispatch(actionSys.Creator.categoryGet(v)),
  changePageSize: (v) => dispatch(actionPost.Creator.postChangePageSize(v)),
  changeCommentPageSize: (v) => dispatch(actionDetail.Creator.detailCommentChangePageSize(v)),
})

export default
  (connect(
    mapStateToProps,
    mapDispatchToProps
  ) as any)(UserInfo)
