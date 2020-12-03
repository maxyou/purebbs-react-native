import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { time, sys } from '../../tool'
import { Dispatch } from 'redux';
import { user as actionUser } from '../../redux/action'
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

function usePrevious(value:any): any {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
const Me: React.FC<IState2Prop & IDispatch2Prop  & IRouterProp> = function (props: IState2Prop & IDispatch2Prop & IRouterProp) {

  const { userAvatarUpdatting, userUpdatting } = props
  const prevProps: IState2Prop = usePrevious({ userAvatarUpdatting, userUpdatting })

  useEffect(
    () => {      
        props.userGetStatus()      
    }, []
  )

  return (
    <View>
      {/* <AvatarImg width='35px' src={props.user.avatarPath} /> */}
      <Text>{props.words.user_name}: {props.user.name}</Text>
      <Text>{props.words.user_role}: {props.user.role}</Text>
      <Text>{props.words.user_email}: {props.user.email}</Text>
      <Text>{props.words.cmn_created}: {time.fromNow(props.user.created)}</Text>
      {/* {props.user.source === 'register' ? <button onClick={gotoEdit}> {props.words.cmn_edit}</button> : null} */}
    </View>
  );
}


interface IRouterProp {
  navigation: any,
  route: any,
}
interface IState2Prop {
  user: any,
  words: any,
  userAvatarUpdatting: boolean,
  userUpdatting: boolean,
}
interface IDispatch2Prop {
  userGetStatus: (v?:any) => void,
}
const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  user: state.user,
  userAvatarUpdatting: state.user.userAvatarUpdatting,
  userUpdatting: state.user.userUpdatting,
  words: state.locale.words,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
  userGetStatus: (v) => dispatch(actionUser.Creator.userGetStatus(v)),
})

export default 
  (connect(
    mapStateToProps,
    mapDispatchToProps
  ) as any)(Me)
