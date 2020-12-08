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
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Round as PageRound, Btn } from '../../component'
// const IconVote = require( '../../res/icon/vote.svg')
import IconVote from '../../res/icon/vote.svg'
import IconLineup from '../../res/icon/lineup.svg'

const StyledViewFlatlistContainer = styled(View)`  
  padding: 1px;
  backgroundColor: gray;
  `
// flexShrink: 1;
const StyledDivCard = styled(View)`  
  backgroundColor: white;
  marginBottom: 1px;
  height: 50px;
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
  `

// height: 60px;
// padding: 5px;
const StyledViewAvatarTitle = styled(View)`  
  height: 50px;
  flexDirection: row;
  flexShrink: 1;
  flexGrow: 1;
  alignItems: stretch;
  `
// justifyContent: flex-start;
// padding: 5px;
// margin: 5px;
const StyledImageAvatar = styled(Image)`
  width: 30px;
  height: 30px;
  borderRadius: 20px;
  marginLeft: 5px;
  alignSelf: center;
  `
const StyledTOTitle = styled(TouchableOpacity)`
  flexShrink: 2;
  flexGrow: 2;
  marginLeft: 10px;
  marginRight: 10px;
  flexDirection: row;
  alignItems: center;
`
const StyledTextTitle = styled(Text)`
  font-size: 18px;
`
const StyledViewExtCmt = styled(View)`
  flexDirection: row;
  marginRight: 5px;
  alignItems: center;
`
// alignItems: center;
// flexShrink: 2;
// flexGrow: 2;
// marginLeft: 10px;
// marginRight: 10px;
// width: 35px;
// height: 35px;
const StyledTOExtIcon = styled(TouchableOpacity)`
  flexDirection: row;
  alignItems: center;
  borderStyle: solid;
  borderWidth: 1px;
  borderColor: red;
  padding: 5px;
`
const StyledViewCmtSpace = styled(View)`
  width:45px;
`

const styles = (props: any) => StyleSheet.create({
  toStyle: {
    backgroundColor: props.postList.cmtButton,
    elevation: 8,
    width: 40,
    height: 30,
    borderRadius: 5,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtStyle: {
    textAlign: 'center',
    marginVertical: 8,
  },
});

function useIdAsKey(postListResult: any): any {

  // console.log(postListResult)
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

  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  console.log(`PostList navigation: ${navigation}`)
  const { postAdding, postUpdatting, postDeletting, postPageCurrent, postPageSize, categoryCurrent, postAttaching } = props
  const prevProps: IState2Prop = usePrevious({ postAdding, postUpdatting, postDeletting, postPageCurrent, postPageSize, categoryCurrent, postAttaching })

  console.log('category 1')
  console.log(categoryCurrent)
  console.log(postPageSize)

  useEffect(
    () => {
      props.get({
        query: !props.categoryCurrent || props.categoryCurrent === props.category[0].idStr ? {} : { category: props.categoryCurrent },
        options: {
          offset: props.postPageSize * (props.postPageCurrent - 1),
          limit: props.postPageSize,
          sort: { allUpdated: -1 },
          select: 'source oauth title postId author authorId commentNum likeUser updated created avatarFileName lastReplyId lastReplyName lastReplyTime allUpdated stickTop category anonymous extend'
        }
      })
    }, [props.user.isLogin]
  )
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

  function getExtendIcon(v: string) {

    switch (v) {
      case 'lineup':
        return <IconLineup width={30} height={30} />
      case 'vote':
        return <IconVote width={30} height={30} />
      default:
        return null
    }

  }

  const dataSource = useIdAsKey(props.postListResult)
  // console.log(`dataSource: ${dataSource}`)

  return (
    <StyledViewFlatlistContainer>
      {/* <IconVote width={120} height={40} /> */}
      <FlatList
        data={dataSource}
        renderItem={
          (v: any) => {
            // console.log(v)
            return <StyledDivCard>

              <StyledViewAvatarTitle>
                <StyledImageAvatar
                  source={{ uri: calc.calcAvatarPath(v.item, v.item.anonymous, v.item.authorId === props.user._id) }}
                />
                <StyledTOTitle
                  onPress={() => {
                    console.log('press goto detail')
                    navigation.navigate('DetailPost', { id: v.item.postId })
                  }}
                >
                  <StyledTextTitle
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                  >
                    {JSON.stringify(v.item.title)}
                  </StyledTextTitle>
                </StyledTOTitle>
              </StyledViewAvatarTitle>

              <StyledViewExtCmt>
                {v.item.extend && v.item.extend.addChoice ?
                  <StyledTOExtIcon
                    onPress={() => {
                      console.log('press goto detail')
                      navigation.navigate('DetailPost', { id: v.item.postId })
                    }}
                  >
                    {getExtendIcon(v.item.extend.addChoice)}
                  </StyledTOExtIcon>
                  : null}
                {
                  v.item.commentNum == 0 ? <StyledViewCmtSpace></StyledViewCmtSpace>
                    :
                    <Btn
                      toStyle={styles(themeContext).toStyle}
                      txtStyle={styles(themeContext).txtStyle}
                      title={'' + v.item.commentNum}
                      onPress={() => navigation.navigate('DetailComment', { id: v.item.postId })}
                    />
                }
              </StyledViewExtCmt>
            </StyledDivCard>
          }
        }
      />
    </StyledViewFlatlistContainer>
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
