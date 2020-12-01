import * as React from 'react'
import { Component, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { post as actionPost } from '../../redux/action'
import { calc, time } from '../../tool'
// import ErrorBoundary from 'errorBoundary'
import styled from 'styled-components'
import {
  View,
  Button,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import {Round as PageRound} from '../../component'

const StyledTOButtonContainer = styled(TouchableOpacity)`
  backgroundColor: #37688c;
  elevation: 8;
  width: 50px;
  height: 30px;
  border-radius: 5px;
  margin: 5px;  
  justifyContent: center;
  alignItems: center;
  `
const StyledTextButtonTitle = styled(Text)`
  height: 25px;
  font-size: 18px;
  color: #fff;
`
const AppButton: React.FC<{ onPress: () => void, title: string }> = ({ onPress, title }) => (
  <StyledTOButtonContainer onPress={onPress}>
    <StyledTextButtonTitle>{title}</StyledTextButtonTitle>
  </StyledTOButtonContainer>
)

const StyledViewTitle = styled(View)`  
  flexShrink: 1;
  marginLeft: 5px;
`
const StyledTextTitle = styled(Text)`
`

// margin: 5px;
const StyledDivCard = styled(View)`  
  backgroundColor: #d7c8cc;
  marginBottom: 1px;
  height: 45px;
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
`
// margin: 5px;
// backgroundColor: #77d8cc;
const StyledViewAvatarTitle = styled(View)`  
  height: 40px;
  flexDirection: row;
  justifyContent: flex-start;
  alignItems: center;
  flexShrink: 1;
  `
const StyledImageAvatar = styled(Image)`
  width: 30px;
  height: 30px;
  borderRadius: 20px;
  marginLeft: 5px;
  `


const PostBar: React.FC<IState2Prop & IDispatch2Prop & Props> = function (props) {


    console.log(`props.postPageCurrent:${props.postPageCurrent}`)
    console.log(`props.postPaginateExt:${props.postPaginateExt}`)
    console.log(`props.postTotalDocs:${props.postTotalDocs}`)
    console.log(`props.postPageSize:${props.postPageSize}`)

  return (
    <View>
      <PageRound current={props.postPageCurrent} ext={props.postPaginateExt} totalDocs={props.postTotalDocs} pageSize={props.postPageSize} nav={props.nav}></PageRound>
    </View>
  )
}
interface Props {
  navigation: any,
  route: any
}
interface ICategoryItem {
  idStr: string,
  name: string,
}
interface IState2Prop {
  user: any,
  words: any,
  postPageSize: number,
  postTotalDocs: number,
  postPageCurrent: number,
  postPaginateExt: number,
}
interface IDispatch2Prop {
    changePageSize: (v?:any) => void,
    categoryNav: (v?:any) => void,
    nav: (v:any) => void,
}

const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
    words: state.locale.words,
    user: state.user,
    postPageSize: state.post.postPageSize,
    postPageCurrent: state.post.postPageCurrent,
    postTotalDocs: state.post.postTotalDocs,
    postPaginateExt: state.post.postPaginateExt,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
    changePageSize: (v) => dispatch(actionPost.Creator.postChangePageSize(v)),
    categoryNav: (v) => dispatch(actionPost.Creator.postCategoryNav(v)),
    nav: (v) => dispatch(actionPost.Creator.postNav(v))
})
// export default withRouter(connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(postList))
export default
  (connect(
    mapStateToProps,
    mapDispatchToProps
  ) as any)(PostBar)
