import httpService from '@/service/httpService'
import {urlPre} from '@/config/config'

class Card {
  constructor() {
    this.addUrl = `${urlPre}card/add`
    this.getListUrl = `${urlPre}card/getList`
    this.deleteByIdUrl = `${urlPre}card/deleteById`
  }

  async add(params = {}) {
    let data = await httpService.post(this.addUrl, params)
    return data
  }

  async getList(params = {}) {
    let data = await httpService.post(this.getListUrl, params)
    return data
  }

  async deleteById(params = {}) {
    let data = await httpService.post(this.deleteByIdUrl, params)
    return data
  }
}

export default new Card()
