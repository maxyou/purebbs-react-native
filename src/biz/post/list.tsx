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
import { FlatList } from 'react-native-gesture-handler';

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
// resizeMode: 'contain';

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
  // console.log(`dataSource: ${dataSource}`)

  return (
    <View>
      <FlatList
        data={dataSource}
        renderItem={
          (v: any) => {
            console.log(v)
            return <StyledDivCard>

              <StyledViewAvatarTitle>
                <StyledImageAvatar
                  source={{ uri: calc.calcAvatarPath(v.item, v.item.anonymous, v.item.authorId === props.user._id) }}
                />
                <StyledViewTitle>
                  <StyledTextTitle
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    onPress={() => {
                      console.log('press goto detail')
                      navigation.navigate('DetailPost', { id: v.item.postId })
                    }}
                  >
                    {JSON.stringify(v.item.title)}
                  </StyledTextTitle>
                </StyledViewTitle>
              </StyledViewAvatarTitle>
              
              {
                v.item.commentNum == 0 ? null
                  :
                  <AppButton title={'' + v.item.commentNum}
                    onPress={() => navigation.navigate('DetailComment', { id: v.item.postId })}
                  />
              }

            </StyledDivCard>
          }
        }
      />
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
