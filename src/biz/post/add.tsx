import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { user as actionUser, post as actionPost, locale as actionLocale, detail as actionDetail } from '../../redux/action'
// import ResetPwd from './resetpwd'
// import {FieldSet} from 'component/style'
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
import { calc } from '../../tool';
import SvgUri from 'react-native-svg-uri';


const appConfig = require('../../config')

const StyledViewMarkdownContainer = styled(View)`
  flexGrow: 1;
  color: #127834;
  backgroundColor: #f2a8c4;
  `
const StyledViewButton = styled(View)`
  height: 45px;
  color: #127834;
  `
const StyledViewTitle = styled(View)`
  height: 85px;
  color: #127834;
  backgroundColor: #c2aac4;
  `
const StyledTextInput = styled(TextInput)`
  height: 40px;
  backgroundColor: #eee;
  margin: 2px;
  `
  // padding: 5px;
  const StyledTextInputMultLine = styled(TextInput)`
  margin: 2px;
  flexGrow: 1;
  backgroundColor: #eee;
  textAlign: left;
  textAlignVertical: top;
  `
const StyledImageVerifyCode = styled(Image)`
  width: 100px;
  height: 50px;
  `
const StyledViewContainer = styled(View)`
  height: 100%;
  padding: 2px;
    justifyContent: space-between;
    backgroundColor: lightblue;
`
const AddPost = function (props: IState2Prop & IDispatch2Prop & Props) {

  const navigation = useNavigation();
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

    navigation.goBack()
  }

  return (
    <StyledViewContainer>

      {/* <StyledViewTitle> */}
        {/* <Text >{props.words.cntnt_title}: </Text> */}
        <StyledTextInput onChangeText={text => setTitle(text)} value={title} placeholder={'title'} />
      {/* </StyledViewTitle> */}

      {/* <StyledViewMarkdownContainer> */}
        {/* <Text >{props.words.cntnt_content}: </Text> */}
        <StyledTextInputMultLine onChangeText={text => setContent(text)} value={content} 
          multiline={true} placeholder={'content'} />
      {/* </StyledViewMarkdownContainer> */}


      {/* <StyledViewButton> */}
        <Button title={props.words.cmn_confirm} onPress={handleSubmit} />
      {/* </StyledViewButton> */}


    </StyledViewContainer>
  );
}
interface Props {
  navigation: any,
  route: any
}
interface IDispatch2Prop {
  submit: (v: any) => void,
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
  markdownTab: "write" | "preview" | undefined,
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
