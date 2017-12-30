/**
 * Created by gd on 2017/12/29/029.
 */
import Router from '@/router/index'
let _loginPromise = null
let loginAction = async function ({commit, state}, {routeName, params}) {
  let userInfo = await login()
  commit('saveUserInfo', userInfo)
  if (routeName) {
    Router.push({
      name: routeName,
      params: params
    })
  }
  return
}
let logoutAction = async function ({commit, state}) {
  commit('clearUserInfo')
}
let login = function () {
  if (_loginPromise) return _loginPromise
  return new Promise((resolve, reject) => {
    let fn = function () {
      _loginPromise = null
    }
    Router.push({
      name: 'login', params: {resolve, reject, fn}
    })
  })
}
export default {
  loginAction,
  logoutAction
}
