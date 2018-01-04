/**
 * Created by gd on 2017/12/29/029.
 */

import {uploadUrl} from '@/config/config'
export default {
  sysAuthUrls: state => state.sysAuthUrls,
  sysUserBg: state => state.sysUserBg,
  isLogin: state => state.sysAuthUrls && state.sysUserBg && state.JSESSIONID,
  JSESSIONID: state => state.JSESSIONID,
  q_cityInfo: state => state.q_cityInfo,
  pro_uploadImage: state => uploadUrl.objectMultipartUploadImg + ';JSESSIONID=' + state.JSESSIONID,
  source_Upload: state => uploadUrl.multipartUploadSource + ';JSESSIONID=' + state.JSESSIONID,
  source_Upload_sound: state => uploadUrl.multipartUploadSound + ';JSESSIONID=' + state.JSESSIONID,
}


