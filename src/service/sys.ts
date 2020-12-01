import httpApi from '../tool/net'
import cookies from 'react-cookies'

httpApi.defaults.headers.common['x-csrf-token'] = cookies.load('csrfToken');
httpApi.defaults.headers.post['Content-Type'] = 'application/json';

export default {
  
  categoryGet(v?:any) {
    console.log('service categoryGet get')
    // return axios.get('/detail/'+id)
    return httpApi.get('/sys/category')
  },

}