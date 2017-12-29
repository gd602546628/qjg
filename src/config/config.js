/**
 * Created by gd on 2017/12/29/029.
 */
import devConfig from './devConfig'
import prdConfig from './prdConfig'
let build = 1 // 0生产，1伟哥本地测试

let configArr = [prdConfig, devConfig]
let config = configArr[build]
let code = {
  SUCCESS: '000000',
  NO_AUTHORITY: '000003' // 无访问权限
}
export {config, code}



