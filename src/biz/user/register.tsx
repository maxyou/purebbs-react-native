import React, { useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import styled from 'styled-components/native'
import { connect } from 'react-redux'
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
import { calc } from '../../tool';
import SvgUri from 'react-native-svg-uri';
import { Btn } from '../../component'
const appConfig = require('../../config')

const StyledDivLogin = styled.View`
  padding: 10px;
  justifyContent: center;
  backgroundColor: lightblue;
`
const StyledTextInput = styled(TextInput)`
  width: 150px;
  height: 40px;
  backgroundColor: #eee;
  `
const Register = function (props: IState2Prop & IDispatch2Prop & Props) {

  function handleSubmit(e: any) {
    // e.preventDefault()

    // if(password!==passwordAgain){
    //   setPrompt(props.words.user_inconsist_pwd_twice)
    //   return
    // }else{
    //   setPrompt('')
    // }

    props.register({ name: name, password: password, email: email, code: code })
  }

  useEffect(() => {
    setRandom(Math.random())
  }, [])

  useEffect(() => {
    console.log('register useEffect')
    if (props.user.isLogin) {
      console.log('useEffect to redirect to /post')
      props.navigation.navigate('Post')
    }
  }, [props.user.isLogin])

  const [random, setRandom] = useState(0)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [prompt, setPrompt] = useState('')

  return (
    <StyledDivLogin>
      <View>
        <Text >{props.words.user_name}: </Text>
        <StyledTextInput onChangeText={text => setName(text)} value={name} />
      </View>

      <View>
        <Text >{props.words.user_password}: </Text>
        <StyledTextInput textContentType='password' onChangeText={text => setPassword(text)} value={password} />
      </View>
      <View>
        <Text >{props.words.user_passwordAgain}: </Text>
        <StyledTextInput textContentType='password' onChangeText={text => setPasswordAgain(text)} value={passwordAgain} />
      </View>

      <View>
        <Text >{props.words.cmn_verifyCode}: </Text>
        <StyledTextInput onChangeText={text => setCode(text)} value={code} />
      </View>

      <View>
        <TouchableOpacity onPress={() => setRandom(Math.random())}>
          {/* <StyledImageVerifyCode source={{ uri: calc.calcVerifyCodePath(''+random) }} /> */}
          {/* <Image style={{width: 150, height: 50}} source={{ uri: calc.calcVerifyCodePath(''+random) }} /> */}
          <SvgUri width="150" height="60" source={{ uri: calc.calcVerifyCodePath('' + random) }} />
        </TouchableOpacity>
        <Text >{"看不清？点击刷新"}</Text>
      </View>

      <View>
        <Button title={props.words.user_register} onPress={handleSubmit} />
        <Text>{props.user && props.user.result && props.user.result.message}</Text>
      </View>
    </StyledDivLogin>
  );
}
interface Props {
  navigation: any,
  route: any
}
interface IState2Prop {
  user: any,
  words: any,
}
interface IDispatch2Prop {
  register: (v?: any) => void,
}
const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  user: state.user,
  words: state.locale.words,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
  register: (v) => dispatch(actionUser.Creator.userRegister(v))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
