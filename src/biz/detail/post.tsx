import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { detail as actionDetail, post as actionPost } from '../../redux/action'


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

function usePrevious(value: any): any {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
const Post: React.FC<IState2Prop & IDispatch2Prop & Props> = (props) => {

  useEffect( //退出页面时清除数据，下次进入时为空白页面，并等待从服务器刷新
    () => {
      return function cleanup() {
        props.detailPostCommentsClear('')
      }
    }, []
  )

  console.log('in DetailScreen')
  console.log(props)
  const { navigation, route } = props
  const { id } = route.params;


  const { postUpdatting, postAttaching } = props
  const prevProps: IState2Prop = usePrevious({ postUpdatting, postAttaching })

  useEffect(
    () => {
      if (
        (!prevProps)
        || (prevProps.postUpdatting === true && props.postUpdatting === false)
        || (prevProps.postAttaching === true && props.postAttaching === false)
      ) {
        console.log(`detail post get: id ${id}`)
        props.detailPostGet({
          condition: { postId: id },
          select: 'title content postId author authorId avatarFileName commentNum likeUser stickTop updated created extend category anonymous source oauth'
        })
      }
    }, [props.postUpdatting, props.postAttaching]
  )

  return (
    <View>
      {/* <Text>DetailScreen</Text>
      <Text>id:{id}</Text>
      <Button
        title="go back"
        onPress={() => props.navigation.goBack()}
      /> */}
      <View>

        {/* <Text>{props.post.data.title}</Text> */}
        {/* <hr /> */}
        {/* <StyledDivPostContent dangerouslySetInnerHTML={{ __html: converter.makeHtml(props.post.data.content) }}></StyledDivPostContent> */}
        {props.post && props.post.data ?
          <Text>
            {props.post.data.content}
          </Text> : null
        }
      </View>
    </View>
  );
}

interface ICategoryItem {
  idStr: string,
  name: string,
}
interface Props {
  navigation: any,
  route: any
}
interface IState2Prop {
  user: any,
  words: any,
  post: any,
  postLoading: boolean,
  postUpdatting: boolean,
  postAttaching: boolean,
  category: ICategoryItem[],
}
interface IDispatch2Prop {
  detailPostGet: (v?: any) => void,
  findByIdAndDelete: (v?: any) => void,
  findByIdAndUpdate: (v: any) => void,
  findByIdAndAttach: (v?: any) => void,
  detailPostCommentsClear: (v: any) => void,
}

const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  user: state.user,
  words: state.locale.words,
  post: state.detail.post,
  postLoading: state.detail.postLoading,
  postUpdatting: state.detail.postUpdatting,
  postAttaching: state.detail.postAttaching,
  category: state.sys.category,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
  detailPostGet: (v) => dispatch(actionDetail.Creator.detailPostGet(v)),
  findByIdAndDelete: (v) => dispatch(actionPost.Creator.postFindByIdAndDelete(v)), //暂时复用post页面功能
  findByIdAndUpdate: (v) => dispatch(actionDetail.Creator.detailPostFindByIdAndUpdate(v)),
  findByIdAndAttach: (v) => dispatch(actionDetail.Creator.detailPostFindByIdAndAttach(v)),
  detailPostCommentsClear: (v) => dispatch(actionDetail.Creator.detailPostCommentsClear(v)),
})
export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Post)
