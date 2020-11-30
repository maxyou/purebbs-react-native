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
  Image,
  TouchableOpacity
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
// import placeHolder from '../../res/img/default.png';

// TouchableOpacity.defaultProps = { activeOpacity: 0.8 };
const ButtonContainer = styled(TouchableOpacity)`
  width: 50px;
  height: 30px;
  elevation: 8;
  border-radius: 5px;
  justifyContent: center;
  alignItems: center;
  backgroundColor: #77888c;
  margin: 5px;
`;

const ButtonText = styled(Text)`
  height: 25px;
  font-size: 18;
  color: #fff;
  font-weight: bold;
  align-self: center;
  text-transform: uppercase;
`;

const AppButton:React.FC<{onPress:()=>void,title:string}> = ({ onPress, title }) => (
  <ButtonContainer onPress={onPress}>
    <ButtonText>{title}</ButtonText>
  </ButtonContainer>
);

const StyledDivCard = styled(View)`  
  margin: 5px;
  height: 40px;
  backgroundColor: #7788cc;
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
`
const StyledViewAvatarTitle = styled(View)`  
  margin: 5px;
  height: 40px;
  backgroundColor: #7788cc;
  flexDirection: row;
  justifyContent: flex-start;
  alignItems: center;
`
const StyledButtonCommentNum = styled(View)`  
  margin: 10px;
  flexBasis: 60px;
  height: 25px;
  backgroundColor: #7738dc;
  flexDirection: row;
  justifyContent: center;
  alignItems: center;
`

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
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain'
                  }}
                  source={{ uri: calc.calcAvatarPath(v.item, v.item.anonymous, v.item.authorId === props.user._id) }}
                />
                <Text
                  onPress={() => {
                    console.log('press goto detail')
                    navigation.navigate('DetailPost', { id: v.item.postId })
                  }}
                >
                  {JSON.stringify(v.item.title)}
                </Text>
              </StyledViewAvatarTitle>
              {
                v.item.commentNum == 0 ? null
                  : <AppButton title={'' + v.item.commentNum}
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
