/**
 * Created by gd on 2017/12/29/029.
 */
const build = 1 // 0生产  1王伟本地测试  2 映射公网测试
const isTest = true // true开启权限验证
const projectMap = { // 项目复制前缀
  0: 'http://www.yungoods.com/mobile/#/index/',
  1: 'http://172.31.60.66:8889/#/index/'
}
const urlMap = {
  0: 'http://47.104.136.67/pg/',
  1: 'http://172.31.61.85:9000/pg/',
  2: 'http://wangwei.viphk.ngrok.org/pg/'
}
const fileMap = {
  0: 'http://47.104.136.67/ftp/',
  1: 'http://172.31.61.85:80/ftp/file/',
  2: 'http://gdweixin.viphk.ngrok.org/'
}
const urlPre = urlMap[build]
const filePre = fileMap[build]
const projectPre = projectMap[build]
const uploadUrl = { // 上传地址
  multipartUploadFile: `${urlPre}source/multipartUploadFile`,// 文件
  multipartUploadSource: `${urlPre}source/multipartUploadSource`,//资源上传
}
const code = {
  SUCCESS: '000000',
  NO_AUTHORITY: '000003' // 无访问权限
}
const fileSize = {
  music: 1024 * 1024 * 5,
  video: 1024 * 1024 * 10,
  image: 1024 * 500,
  icon: 1024 * 50
}
export {uploadUrl, code, urlPre, filePre, fileSize, projectPre, isTest}



