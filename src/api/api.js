/**
 * Created by gd on 2017/12/29/029.
 */
import httpService from '@/service/httpService'
import {config} from '@/config/config'
class Api {
  constructor() {
  }

  /*登录*/
  async login(params = {}) {
    let data = await httpService.formPost(config.loginUrl, params)
    return data
  }

  /*登录*/
  async logout(params = {}) {
    let data = await httpService.post(config.logoutUrl, params)
    return data
  }

// 获取可配置角色权限列表
  async getUrls() {
    let data = await httpService.post(config.getUrls)
    return data
  }

  // 增加修改角色
  async addOrUpdateRole(params = {}) {
    let data = await httpService.post(config.addOrUpdateRole, params)
    return data
  }

  // 增加角色
  async getAllRole(params = {}) {
    let data = await httpService.post(config.getAllRole, params)
    return data
  }

  // 添加用户
  async addUser(params = {}) {
    let data = await httpService.post(config.addUser, params)
    return data
  }

  // 用户列表
  async getUserList(params = {}) {
    let data = await httpService.post(config.getUserList, params)
    return data
  }

  // 启用停用账号
  async updateStatus(params = {}) {
    let data = await httpService.post(config.updateStatus, params)
    return data
  }

  // 更新账号
  async updateUser(params = {}) {
    let data = await httpService.post(config.updateUser, params)
    return data
  }

  // 更新账号密码
  async updateUserPassword(params = {}) {
    let data = await httpService.post(config.updateUserPassword, params)
    return data
  }

// 删除用户
  async deleteUser(params = {}) {
    let data = await httpService.post(config.deleteUser, params)
    return data
  }
}

export default new Api()
