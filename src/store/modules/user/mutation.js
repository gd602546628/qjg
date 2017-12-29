/**
 * Created by gd on 2017/12/29/029.
 */
import localStore from '@/service/localStorage/localStorage.service'
import cookies from '@/service/cookies'
let saveUserInfo = function (state, userInfo) {
  state.sysAuthUrls = userInfo.sysAuthUrls
  state.sysUserBg = userInfo.sysUserBg
  state.JSESSIONID = userInfo.sessionId
  console.log('JSESSIONID', state.JSESSIONID)
  localStore.setStorage('sysAuthUrls', state.sysAuthUrls)
  localStore.setStorage('sysUserBg', state.sysUserBg)
  localStore.setStorage('JSESSIONID', state.JSESSIONID)
}
let clearUserInfo = function (state) {
  state.sysAuthUrls = null
  state.sysUserBg = null
  state.JSESSIONID = null
  localStorage['sysAuthUrls'] = null
  localStorage['sysUserBg'] = null
  localStorage['JSESSIONID'] = null
}
export default {
  saveUserInfo,
  clearUserInfo
}
