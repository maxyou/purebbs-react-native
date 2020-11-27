import httpApi from '../tool/net'
import cookies from 'react-cookies'

httpApi.defaults.headers.common['x-csrf-token'] = cookies.load('csrfToken');
httpApi.defaults.headers.post['Content-Type'] = 'application/json';

export default {

  detailPostGet(v:any) {
    console.log('service detail post get')
    // return httpApi.get('/detail/'+id)
    return httpApi.get('/detail/post', { params: {postInfo:JSON.stringify(v) }})
  },
  detailCommentGet(v:any) {
    console.log('service detail comment get')
    // return httpApi.get('/detail/'+id)
    return httpApi.get('/detail/comment/getpage', { params: {pageInfo:JSON.stringify(v) }})
  },
  detailCommentAdd(comment:any) {
    console.log('comment add')
    return httpApi.post('/detail/comment/add', comment)
  },
  detailCommentDeleteById(comment:any) {
    console.log('comment delete')
    return httpApi.post('/detail/comment/findbyidanddelete', comment)
  },
  detailCommentUpdateById(comment:any) {
    console.log('comment update')
    return httpApi.post('/detail/comment/findbyidandupdate', comment)
  },
  detailPostUpdateById(post:any) {
    console.log('post update')
    return httpApi.post('/detail/post/findbyidandupdate', post)
  },
  detailPostAttachById(cmd:any) {
    console.log('post attach')
    return httpApi.post('/detail/post/findbyidandattach', cmd)
  },
  detailCommentAttachById(cmd:any) {
    console.log('comment attach')
    return httpApi.post('/detail/comment/findbyidandattach', cmd)
  },
}