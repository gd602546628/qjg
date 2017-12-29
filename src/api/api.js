/**
 * Created by gd on 2017/12/29/029.
 */
import httpService from '@/service/httpService'
import {config} from '@/config/config'
class Api {
  constructor() {
  }

  /*登录*/
  async login(params) {
    let data = await httpService.formPost(config.loginUrl, params)
    return data
  }
}

export default new Api()
