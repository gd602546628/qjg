/**
 * Created by gd on 2017/12/29/029.
 */


export default {
  sysAuthUrls: state => state.sysAuthUrls,
  sysUserBg: state => state.sysUserBg,
  isLogin: state => state.sysAuthUrls && state.sysUserBg && state.JSESSIONID,
  JSESSIONID: state => state.JSESSIONID
}

