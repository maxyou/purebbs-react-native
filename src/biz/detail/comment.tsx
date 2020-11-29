import React, { useState, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { detail as actionDetail } from '../../redux/action'
import { calc, time } from '../../tool'
import ReactMde from "react-mde"
import styled from 'styled-components'
import * as Showdown from "showdown";
import { Text, View } from 'react-native';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const CommentTotalHeight = '60px'
const CommentInfoHeight = '20px'


const StyledDivList = styled(View)`
  min-height: ${CommentTotalHeight}
  padding: 0.5px;
  margin-bottom: 5px;
  display:flex;
  justify-content: flex-start;
  align-items: stretch;  
  `
  // background-color: #ffffff;

  // padding: 5px;  
const StyledDivMain = styled(View)`
  background-color: #ffffff;

  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  flex: 1 0 0%;
  `

function useIdAsKey(commentListResult:any) {
  if (commentListResult && commentListResult.data && commentListResult.data.length >= 0) {
    return commentListResult.data.map((v:any) => ({ ...v, key: v._id }))
  }
  // console.log(array)
  return []
}

function usePrevious(value:any): any {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Comment: React.FC<IState2Prop & IDispatch2Prop & Props> = function (props) {

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
      {
        dataSource.map((v:any) => <StyledDivList key={v.key}>
          {/* <StyledDivContainerNoUse> */}
          {/* {JSON.stringify(v)} */}

          {/* <StyledDivAvatar> */}
            {/* <StyledLink to={'/user/other/' + (v.authorId === props.user._id || v.anonymous === false ? v.authorId : 'anonymous')}>
              <AvatarImg src={calc.calcAvatarPath(v, v.anonymous, v.authorId === props.user._id)}
                width='40px' radius='20px'></AvatarImg>
            </StyledLink> */}

          {/* </StyledDivAvatar> */}

          <StyledDivMain>

            {/* <StyledDivCommentUpper> */}
              {/* <StyledDivComment>
                  {v.content}
              </StyledDivComment> */}
              {/* <StyledDivCommentMde dangerouslySetInnerHTML={{ __html: converter.makeHtml(v.content) }}></StyledDivCommentMde> */}
            <Text>{v.content}</Text>
            {/* </StyledDivCommentUpper> */}
{/* 
            <StyledDivInfo>
              <StyledDivTime>
                <StyledDivTime><StyledLink to={'/user/other/' + v.authorId}>{v.author}</StyledLink></StyledDivTime>
              </StyledDivTime> */}

              <Text>
                {/*created:*/}{time.fromNow(v.created)}
              </Text>


              {/* <StyledDivTime>
                <StyledLink to={'#'} onClick={() => handleLike(v)}><StyledSpanLike color={v.likeHasCurrentUser ? '#FF4500' : '#777777'} hoverColor={v.likeHasCurrentUser ? '#A52A2A' : '#333333'}>{props.words.cntnt_like}{v.likeUser.length}</StyledSpanLike></StyledLink>
              </StyledDivTime> */}

            {/* </StyledDivInfo> */}

          </StyledDivMain>

          {/* </StyledDivContainerNoUse> */}
        </StyledDivList>)
      }
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
  commentPageSize: number,
  commentPageCurrent: number,
  commentListResult: any,
  commentListLoading: boolean,
  commentAdding: boolean,
  commentDeletting: boolean,
  commentUpdatting: boolean,
  commentAttaching: boolean,
}
interface IDispatch2Prop {
  get: (v?:any) => void,
  delete: (v?:any) => void,
  update: (v:any) => void,
  findByIdAndAttach: (v?:any) => void,
}

const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  user: state.user,
  words: state.locale.words,
  commentPageSize: state.detail.commentPageSize,
  commentPageCurrent: state.detail.commentPageCurrent,
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

