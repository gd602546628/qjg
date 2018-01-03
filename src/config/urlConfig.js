/**
 * Created by gd on 2017/12/29/029.
 * 测试url配置
 */
let build = 1 // 0生产  1王伟本地测试  2 映射公网测试
let urlMap = {
  0: '',
  1: 'http://172.31.61.40:8181/',
  2: 'http://gdweixin.viphk.ngrok.org/'
}
let fileMap = {
  0: '',
  1: 'http://172.31.61.40:80/ftp/file/',
  2: 'http://gdweixin.viphk.ngrok.org/'
}
let urlPre = urlMap[build]
let filePre = fileMap[build]
let DevConfig = {
  m_uploadIcon: `${urlPre}springboot/source/multipartUploadIcon`,// 上传图标
  pro_uploadImg:`${urlPre}springboot/sourceObject/multipartUploadImg`, // 项目管理上传图片
  loginUrl: `${urlPre}springboot/public/login`, //登录
  logoutUrl: `${urlPre}springboot/public/logout`,//退出
  getUrls: `${urlPre}springboot/system/role/getUrls`, // 可配置角色权限列表
  addOrUpdateRole: `${urlPre}springboot/system/role/addOrUpdateRole`,// 增加角色
  getAllRole: `${urlPre}springboot/system/role/getAllRole`,// 角色列表
  getUserList: `${urlPre}springboot/system/user/getList`,//用户列表
  addUser: `${urlPre}springboot/system/user/add`, //添加用户
  updateStatus: `${urlPre}springboot/system/user/updateStatus`, //跟新账号状态
  updateUser: `${urlPre}springboot/system/user/update`, //更新账号信息
  updateUserPassword: `${urlPre}springboot/system/user/updatePassword`,// 更新账号密码
  deleteUser: `${urlPre}springboot/system/user/deleteById`,//删除用户
  deleteRole: `${urlPre}springboot/system/role/deleteRole`,// 删除角色
  getValidateCode: `${urlPre}springboot/public/getValidateCode`, // 获取验证码
  getObjectList: `${urlPre}springboot/sourceObject/getList`, //项目列表
  deleteObject: `${urlPre}springboot/sourceObject/deleteById`, // 删除项目
  updateObject: `${urlPre}springboot/sourceObject/update`,// 更新项目
  getAllArea: `${urlPre}springboot/source/areaCode/getAllArea`, // 获取所有行政区域
  getAreaList: `${urlPre}springboot/source/area/getList`, //获取区域列表
}


export  {DevConfig, urlPre, filePre}
