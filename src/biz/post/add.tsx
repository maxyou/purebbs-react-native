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
const AddPost = function (props: IState2Prop & IDispatch2Prop & Props) {


    const [random, setRandom] = useState(0)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [code, setCode] = useState('')

    function handleSubmit(e: any) {

    props.submit({
        title: title,
        content: content,
        category: 'category_dev_client',
        anonymous: false,
        extend: null,
        // author: user.result && user.result.data && user.result.data.name,
        // authorId: user.result && user.result.data && user.result.data._id,
    })
  }



//   console.log('calc.calcVerifyCodePath()')
//   console.log(calc.calcVerifyCodePath(''+random))

  return (
    <StyledDivLogin>
      {/* <Text>{props.words.user_login}</Text> */}


      <View>
        <Text >{props.words.cntnt_title}: </Text>
        <StyledTextInput onChangeText={text => setTitle(text)} value={title} />
      </View>

      <View>
        <Text >{props.words.cntnt_content}: </Text>
        <StyledTextInput onChangeText={text => setContent(text)} value={content} />
      </View>


      <View>
        <Button title={props.words.user_login} onPress={handleSubmit} />
      </View>


    </StyledDivLogin>
  );
}
interface Props {
  navigation: any,
  route: any
}
interface IDispatch2Prop {
    submit: (v:any) => void,
}

type IState2Prop = {
    addResult: object,
    words: any,
    user: any,
    extend: any,
};

type State = {
    title: string,
    content: string,
    category: string,
    anonymous: boolean,
    markdownTab: "write"|"preview"|undefined,
};
const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
    addResult: state.post.postAddResult,
    words: state.locale.words,
    user: state.user,
    extend: state.extend,
    category: state.sys.category,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
    submit: (v) => dispatch(actionPost.Creator.postAdd(v)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPost)
