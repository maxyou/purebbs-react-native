import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { user as actionUser, post as actionPost, locale as actionLocale, detail as actionDetail } from '../../redux/action'
// import ResetPwd from './resetpwd'
// import {FieldSet} from 'component/style'
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


const appConfig = require('../../config')

const StyledTextPrompt = styled(Text)`
  height: 30px;
  color: #127834;
  `
const StyledTextInput = styled(TextInput)`
  width: 150px;
  height: 40px;
  backgroundColor: #eee;
  `
const StyledImageVerifyCode = styled(Image)`
  width: 100px;
  height: 50px;
  `
const StyledDivLogin = styled(View)`
  padding: 10px;
    justifyContent: center;
    backgroundColor: lightblue;
`
const Login = function (props: IState2Prop & IDispatch2Prop & IRouterProp) {

  function handleSubmit(e: any) {
    console.log('login submit')
    // e.preventDefault()
    props.login({ name: name, password: password, code: code })
  }

  useEffect(() => {
    setRandom(Math.random())
  }, [])

  useEffect(() => {
    console.log('login useEffect')
    if (props.user.isLogin) {

      let setting = props.user.setting
      console.log('setting--------------')
      console.log(setting)
      if (setting.language) {
        props.languageSet(setting.language)
      }
      if (setting.postPageSize) {
        props.changePageSize(setting.postPageSize)
      }
      if (setting.commentPageSize) {
        props.changeCommentPageSize(setting.commentPageSize)
      }

      console.log('useEffect to redirect to /post')
      props.history.push('/post')
    }
  }, [props.user.isLogin])

  const [random, setRandom] = useState(0)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')

  console.log('calc.calcVerifyCodePath()')
  console.log(calc.calcVerifyCodePath(''+random))

  return (
    <StyledDivLogin>
      {/* <Text>{props.words.user_login}</Text> */}


      <View>
        <Text >{props.words.user_name}: </Text>
        <StyledTextInput onChangeText={text => setName(text)} value={name} />
      </View>

      <View>
        <Text >{props.words.user_password}: </Text>
        <StyledTextInput textContentType='password' onChangeText={text => setPassword(text)} value={password} />
      </View>

      <View>
        <Text >{props.words.cmn_verifyCode}: </Text>
        <StyledTextInput onChangeText={text => setCode(text)} value={code} />
      </View>

      <View>
        <TouchableOpacity onPress={() => setRandom(Math.random())}>
          {/* <StyledImageVerifyCode source={{ uri: calc.calcVerifyCodePath(''+random) }} /> */}
          {/* <Image style={{width: 150, height: 50}} source={{ uri: calc.calcVerifyCodePath(''+random) }} /> */}
          <SvgUri width="150" height="60" source={{ uri: calc.calcVerifyCodePath(''+random) }} />
        </TouchableOpacity>
        <Text >{"看不清？点击刷新"}</Text>
      </View>

      <View>
        <Button title={props.words.user_login} onPress={handleSubmit} />
        <Text>{props.user && props.user.result && props.user.result.message}</Text>
      </View>


    </StyledDivLogin>
  );
}
interface IRouterProp {
  history: any,
  match: any,
}
interface IState2Prop {
  user: any,
  words: any,
}
interface IDispatch2Prop {
  login: (v?: any) => void,
  changePageSize: (v?: any) => void,
  languageSet: (v: any) => void,
  changeCommentPageSize: (v: any) => void,
}
const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  user: state.user,
  words: state.locale.words,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
  login: (v) => dispatch(actionUser.Creator.userLogin(v)),
  changePageSize: (v) => dispatch(actionPost.Creator.postChangePageSize(v)),
  languageSet: (v) => dispatch(actionLocale.Creator.languageSet(v)),
  changeCommentPageSize: (v) => dispatch(actionDetail.Creator.detailCommentChangePageSize(v)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
