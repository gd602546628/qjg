/**
 * Created by gd on 2017/12/29/029.
 */
import axios from 'axios'
import Util from '@/service/util'
import cookie from '@/service/cookies'
import store from '@/store/index'
class Http {
  constructor() {
  }

  async post(url, params) {
    let resultUrl = `${url};JSESSIONID=${store.getters.JSESSIONID}`
    let data = await axios.post(resultUrl, params)
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
