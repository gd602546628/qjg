/**
 * Created by gd on 2017/12/29/029.
 */

import {config} from '@/config/config'
export default {
  sysAuthUrls: state => state.sysAuthUrls,
  sysUserBg: state => state.sysUserBg,
  isLogin: state => state.sysAuthUrls && state.sysUserBg && state.JSESSIONID,
  JSESSIONID: state => state.JSESSIONID,
  q_cityInfo: state => state.q_cityInfo,
  pro_uploadImage: state => config.pro_uploadImg + ';JSESSIONID=' + state.JSESSIONID
}

