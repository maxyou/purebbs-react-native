import http from '../tool/net'
import cookies from 'react-cookies'

http.defaults.headers.common['x-csrf-token'] = cookies.load('csrfToken');
http.defaults.headers.post['Content-Type'] = 'application/json';

export default {

  postAdd(post:any) {
    console.log('post add')
    // console.log(post)
    // console.log(post.extend.addVote.expireTime)
    // console.log(new Date(post.extend.addVote.expireTime).getTime())
    return http.post('/post/add', post)
  },
  postGet(v:any) {
    if (v) {
      console.log(`post get use getpages, params:${JSON.stringify(v)}`)
      return http.get('/post/getpage', { params: {pageInfo:JSON.stringify(v) }})
    } else {
      console.log('post get use get')
      return http.get('/post/get')
    }

  },
  postDeleteOne(v:any) {//找到match的第一个并删除
    return http.post('/post/deleteone', { path: v.path })
  },
  postFindByIdAndDelete(v:any) {
    // console.log('JSON.stringify(v):')
    // console.log(JSON.stringify(v))
    return http.post('/post/findbyidanddelete', v)
  },
  postFindByIdAndUpdate(v:any) {
    // console.log('JSON.stringify(v):')
    // console.log(JSON.stringify(v))
    return http.post('/post/findbyidandupdate', v)
  },

  postAttachById(cmd:any) {
    console.log('post attach')
    return http.post('/detail/post/findbyidandattach', cmd)
  },
}