import React, { useState, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { detail as actionDetail } from '../../redux/action'
import { calc, time } from '../../tool'
import ReactMde from "react-mde"
import styled from 'styled-components'
import * as Showdown from "showdown";
import { Text, View, Image, FlatList } from 'react-native';
import { Round as PageRound, Btn } from '../../component'



const StyledViewPagingContainer = styled(View)`  
  height: 35px;
  flexDirection: row;
  justifyContent: flex-end;
  marginRight:5px;
`
const StyledViewFlatlistContainer = styled(View)`  
  backgroundColor: lightgreen;
  flex:1;
  `
// flexShrink: 1;
const StyledDivCard = styled(View)`  
  backgroundColor: white;
  marginBottom: 1px;
  flexDirection: row;
  justifyContent: space-between;
  alignItems: stretch;
  `
// const StyledDivCard = styled(View)`  
//   backgroundColor: #d7c8cc;
//   flexDirection: row;
//   justifyContent: flex-start;
//   alignItems: stretch;  
//   marginBottom: 1px;
//   `
const StyledTextContent = styled(Text)`
  marginTop: 5px;
  marginLeft: 5px;
  marginRight: 5px;
  marginBottom: 5px;
  flexShrink: 1;
  flexGrow: 1;
  font-size: 16px;
  `
const StyledImageAvatar = styled(Image)`
  width: 30px;
  height: 30px;
  borderRadius: 20px;
  margin: 5px;
  `

function useIdAsKey(commentListResult: any) {
  if (commentListResult && commentListResult.data && commentListResult.data.length >= 0) {
    return commentListResult.data.map((v: any) => ({ ...v, key: v._id }))
  }
  // console.log(array)
  return []
}

function usePrevious(value: any): any {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Comment: React.FC<IState2Prop & IDispatch2Prop & Props> = function (props) {

  useEffect( //退出页面时清除数据，下次进入时为空白页面，并等待从服务器刷新
    () => {
      return function cleanup() {
        props.detailPostCommentsClear('')
      }
    }, []
  )

  const { navigation, route } = props
  const { id } = route.params;

  // const [commentUpdate, setCommentUpdate] = useState('')
  const [commentEdit, setCommentEdit] = useState({ content: '', anonymous: false })

  const { commentAdding, commentUpdatting, commentDeletting, commentPageCurrent, commentPageSize, commentAttaching } = props
  const prevProps: IState2Prop = usePrevious({ commentAdding, commentUpdatting, commentDeletting, commentPageCurrent, commentPageSize, commentAttaching })

  const [markdownTab, setMarkdownTab] = useState<"write" | "preview" | undefined>("write")

  useEffect(
    () => {
      if (
        (!prevProps)
        || (prevProps.commentAdding === true && props.commentAdding === false)
        || (prevProps.commentAttaching === true && props.commentAttaching === false)
        || (prevProps.commentUpdatting === true && props.commentUpdatting === false)
        || (prevProps.commentDeletting === true && props.commentDeletting === false)
        || (prevProps.commentPageCurrent !== props.commentPageCurrent)
        || (prevProps.commentPageSize !== props.commentPageSize)
      ) {
        props.get({
          query: {
            postId: id
          },
          options: {
            offset: props.commentPageSize * (props.commentPageCurrent - 1),
            limit: props.commentPageSize,
            sort: { created: -1 },
            select: 'postId content author authorId updated created avatarFileName likeUser anonymous source oauth'
          }
        })
      }
    }, [props.commentAdding, props.commentUpdatting, props.commentDeletting, props.commentPageCurrent, props.commentPageSize, props.commentAttaching]
  )

  const dataSource = useIdAsKey(props.commentListResult)
  // console.log(dataSource)


  return (
    <>
      <StyledViewPagingContainer>
        <PageRound current={props.commentPageCurrent} ext={props.commentPaginateExt} totalDocs={props.commentTotalDocs} pageSize={props.commentPageSize} nav={props.nav}></PageRound>
      </StyledViewPagingContainer>
      <StyledViewFlatlistContainer>
        <FlatList
          data={dataSource}
          renderItem={
            (v: any) => {
              console.log(calc.calcAvatarPath(v.item, v.item.anonymous, v.item.authorId === props.user._id))
              return <StyledDivCard>

                <StyledImageAvatar
                  source={{ uri: calc.calcAvatarPath(v.item, v.item.anonymous, v.item.authorId === props.user._id) }}
                />
                {/* <StyledViewContent> */}
                <StyledTextContent>
                  {JSON.stringify(v.item.content)}
                </StyledTextContent>
                {/* </StyledViewContent> */}

              </StyledDivCard>
            }
          }
        >

        </FlatList>

      </StyledViewFlatlistContainer>
    </>
  )
}
interface Props {
  navigation: any,
  route: any
}
interface IState2Prop {
  user: any,
  words: any,
  commentTotalDocs: number,
  commentPageSize: number,
  commentPageCurrent: number,
  commentPaginateExt: number,
  commentListResult: any,
  commentListLoading: boolean,
  commentAdding: boolean,
  commentDeletting: boolean,
  commentUpdatting: boolean,
  commentAttaching: boolean,
}
interface IDispatch2Prop {
  nav: (v: any) => void,
  get: (v?: any) => void,
  delete: (v?: any) => void,
  update: (v: any) => void,
  findByIdAndAttach: (v?: any) => void,
  detailPostCommentsClear: (v: any) => void,
}

const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  user: state.user,
  words: state.locale.words,
  commentTotalDocs: state.detail.commentTotalDocs,
  commentPageSize: state.detail.commentPageSize,
  commentPageCurrent: state.detail.commentPageCurrent,
  commentPaginateExt: state.detail.commentPaginateExt,
  commentListResult: state.detail.commentListResult,
  commentListLoading: state.detail.commentListLoading,
  commentAdding: state.detail.commentAdding,
  commentDeletting: state.detail.commentDeletting,
  commentUpdatting: state.detail.commentUpdatting,
  commentAttaching: state.detail.commentAttaching,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
  get: (v) => dispatch(actionDetail.Creator.detailCommentGet(v)),
  delete: (v) => dispatch(actionDetail.Creator.detailCommentDelete(v)),
  update: (v) => dispatch(actionDetail.Creator.detailCommentUpdate(v)),
  findByIdAndAttach: (v) => dispatch(actionDetail.Creator.detailCommentFindByIdAndAttach(v)),
  detailPostCommentsClear: (v) => dispatch(actionDetail.Creator.detailPostCommentsClear(v)),
  nav: (v: any) => dispatch(actionDetail.Creator.detailCommentNav(v)),
})
// export default withRouter(connect(
//   mapStateToProps,
//   mapDispatchToProps
// ) (commentList))

export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Comment)

