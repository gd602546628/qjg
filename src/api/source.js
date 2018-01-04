/**
 * Created by gd on 2018/1/4/004.
 * 资源
 */
import httpService from '@/service/httpService'
import {urlPre} from '@/config/config'
let url = {
  getList: `${urlPre}source/getList`,
  add: `${urlPre}source/add`
}
let source = {
  getList: async function (params = {}) {
    let data = await httpService.post(url.getList, params)
    return data
  },
  add: async function (params = {}) {
    let data = await httpService.post(url.add, params)
    return data
  },
}
export default source
