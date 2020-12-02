import httpApi from '../tool/net'
import cookies from 'react-cookies'

httpApi.defaults.headers.common['x-csrf-token'] = cookies.load('csrfToken');
httpApi.defaults.headers.post['Content-Type'] = 'application/json';

export default {

  register(user:any) {
    console.log('service user register')
    return httpApi.post('/user/register', user)
  },
  login(user:any) {
    console.log('service user login')
    return httpApi.post('/user/login', user)
  },
  logout(v:any) {
    console.log('service user logout')
    return httpApi.post('/user/logout', v)
  },
  getStatus(v:any) {
    console.log('service user status')
    return httpApi.get('/user/status')
  },
  getOtherInfo(v:any) {
    console.log('service other user info')
    console.log(v)
    return httpApi.get('/user/other/info', { params: {user:JSON.stringify(v) }})
  },
  // uploadAvatar(v) {
  //   console.log('service user upload')
  //   return httpApi.post('/user/upload/avatar', v)
  // },
  updateAvatar(v:any) {
    console.log('service user upload')
    return httpApi.post('/user/upload/avatar', v)
  },
  userUpdate(v:any) {
    console.log('service user update')
    return httpApi.post('/user/update', v)
  },
  userChangePassword(v:any) {
    console.log('service user userChangePassword')
    return httpApi.post('/user/password/change', v)
  },
  userResetPassword(v:any) {
    console.log('service user userResetPassword')
    return httpApi.post('/user/password/reset', v)
  },
  userResetPasswordNew(v:any) {
    console.log('service user userResetPassword')
    return httpApi.post('/user/password/new', v)
  },
}