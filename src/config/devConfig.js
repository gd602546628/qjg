/**
 * Created by gd on 2017/12/29/029.
 * 测试url配置
 */
let devPre = 'http://172.31.61.40:8181/'
devPre = 'http://gdweixin.viphk.ngrok.org/'
let DevConfig = {
  loginUrl: `${devPre}springboot/public/login`, //登录
  logoutUrl: `${devPre}springboot/public/logout`,//退出
  getUrls: `${devPre}springboot/system/role/getUrls`, // 可配置角色权限列表
  addOrUpdateRole: `${devPre}springboot/system/role/addOrUpdateRole`,// 增加角色
  getAllRole: `${devPre}springboot/system/role/getAllRole`,// 角色列表
  getUserList: `${devPre}springboot/system/user/getList`,//用户列表
  addUser: `${devPre}springboot/system/user/add`, //添加用户
  updateStatus: `${devPre}springboot/system/user/updateStatus`, //跟新账号状态
  updateUser: `${devPre}springboot/system/user/update`, //更新账号信息
  updateUserPassword: `${devPre}springboot/system/user/updatePassword`,// 更新账号密码
  deleteUser: `${devPre}springboot/system/user/deleteById`,//删除用户
}


export default DevConfig
