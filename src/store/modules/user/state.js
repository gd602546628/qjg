/**
 * Created by gd on 2017/12/29/029.
 */
import localStorage from '@/service/localStorage/localStorage.service'
export default {
  JSESSIONID: localStorage.getStorage('JSESSIONID'),
  sysAuthUrls: localStorage.getStorage('sysAuthUrls'),
  sysUserBg: localStorage.getStorage('sysUserBg')
}
