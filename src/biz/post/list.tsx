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
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
} from 'react-native';
const ItemHeight = '60px'
const PostTitleHeight = '40px'
const PostInfoHeight = '20px'

const StyledDivCard = styled(View)`
  margin: 5px;
`

function useIdAsKey(postListResult: any): any {

  console.log(postListResult)
  if (postListResult && postListResult.data && postListResult.data.length >= 0) {
    return postListResult.data.map((v: any) => ({ ...v, key: v._id }))
  }
  return []
}

function usePrevious(value: any): any {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const PostList: React.FC<IState2Prop & IDispatch2Prop & Props> = function (props) {
  // function postList(props) {

  const navigation = useNavigation();
  console.log(`PostList navigation: ${navigation}`)
  const { postAdding, postUpdatting, postDeletting, postPageCurrent, postPageSize, categoryCurrent, postAttaching } = props
  const prevProps: IState2Prop = usePrevious({ postAdding, postUpdatting, postDeletting, postPageCurrent, postPageSize, categoryCurrent, postAttaching })

  console.log('category 1')
  console.log(categoryCurrent)
  console.log(postPageSize)

  useEffect(
    () => {
      if (
        (!prevProps)
        || (prevProps.postAdding === true && props.postAdding === false)
        || (prevProps.postUpdatting === true && props.postUpdatting === false)
        || (prevProps.postAttaching === true && props.postAttaching === false)
        || (prevProps.postDeletting === true && props.postDeletting === false)
        || (prevProps.postPageCurrent !== props.postPageCurrent)
        || (prevProps.postPageSize !== props.postPageSize)
        || (prevProps.categoryCurrent !== props.categoryCurrent)
      ) {
        console.log()
        props.get({
          query: !props.categoryCurrent || props.categoryCurrent === props.category[0].idStr ? {} : { category: props.categoryCurrent },
          options: {
            offset: props.postPageSize * (props.postPageCurrent - 1),
            limit: props.postPageSize,
            sort: { allUpdated: -1 },
            select: 'source oauth title postId author authorId commentNum likeUser updated created avatarFileName lastReplyId lastReplyName lastReplyTime allUpdated stickTop category anonymous extend'
          }
        })
      }
    }, [props.postAdding, props.postUpdatting, props.postDeletting, props.postPageCurrent, props.postPageSize, props.categoryCurrent, props.postAttaching]
  )


  const dataSource = useIdAsKey(props.postListResult)
  console.log(`dataSource: ${dataSource}`)

  return (
    <View>
      
      {
        dataSource.map((v: any) => <StyledDivCard key={v.key}>
          <Text>
            {JSON.stringify(v.title)}

            <Button
              title="Go to Detail"
              onPress={() => {
                console.log('press goto detail')
                navigation.navigate('Detail', { id: v._id })
              }}
            />
          </Text>
        </StyledDivCard>)
      }
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
  postPageCurrent: number,
  postListResult: any,
  postListLoading: boolean,
  postAdding: boolean,
  postDeletting: boolean,
  postUpdatting: boolean,
  postAttaching: boolean,
  categoryCurrent: string,
  category: ICategoryItem[],
}
interface IDispatch2Prop {
  get: (v?: any) => void,
  findByIdAndDelete: (v?: any) => void,
  findByIdAndUpdate: (v: any) => void,
  postFindByIdAndAttach: (v?: any) => void,
}

const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  user: state.user,
  words: state.locale.words,
  postPageSize: state.post.postPageSize,
  postPageCurrent: state.post.postPageCurrent,
  postListResult: state.post.postListResult,
  postListLoading: state.post.postListLoading,
  postAdding: state.post.postAdding,
  postDeletting: state.post.postDeletting,
  postUpdatting: state.post.postUpdatting,
  postAttaching: state.post.postAttaching,
  categoryCurrent: state.post.categoryCurrent,
  category: state.sys.category,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
  get: (v) => dispatch(actionPost.Creator.postGet(v)),
  findByIdAndDelete: (v) => dispatch(actionPost.Creator.postFindByIdAndDelete(v)),
  findByIdAndUpdate: (v) => dispatch(actionPost.Creator.postFindByIdAndUpdate(v)),
  postFindByIdAndAttach: (v) => dispatch(actionPost.Creator.postFindByIdAndAttach(v)),
})
// export default withRouter(connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(postList))
export default
  (connect(
    mapStateToProps,
    mapDispatchToProps
  ) as any)(PostList)
