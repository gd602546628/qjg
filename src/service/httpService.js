/**
 * Created by gd on 2017/12/29/029.
 */
import axios from 'axios'
import Util from '@/service/util'
import store from '@/store/index'
import {code} from '@/config/config'
import router from '@/router/index'
import {MessageBox} from 'element-ui'
class Http {
  constructor() {
  }

  async post(url, params) {
    let resultUrl = `${url};JSESSIONID=${store.getters.JSESSIONID}`
    let data = await axios.post(resultUrl, params)
    if (data.data.code === code.NO_AUTHORITY) { // 无权限访问
      MessageBox.alert('登录已失效', '').then(() => {
        router.push({
          name: 'login'
        })
      })
      throw new Error()
    }
    return data.data
  }

  async formPost(url, params) {
    let headerOption = {
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
      }
    }
    let resultUrl = Util.urlEncode(url, params)
    let data = await axios({
      url: resultUrl,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data.data
  }
}
export default new Http()
