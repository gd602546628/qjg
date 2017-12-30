/**
 * Created by gd on 2017/12/29/029.
 */
import localStorage from '@/service/localStorage/localStorage.service'
export default {
  JSESSIONID: localStorage.getStorage('JSESSIONID') || '1111',
  sysAuthUrls: localStorage.getStorage('sysAuthUrls') || '1111',
  sysUserBg: localStorage.getStorage('sysUserBg') || '11111'
}
