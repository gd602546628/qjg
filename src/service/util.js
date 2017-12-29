/**
 * Created by gd on 2017/12/29/029.
 */

class Util {
  constructor() {
  }

  urlEncode(url, params) {
    var result = url + '?'
    for (var key in params) {
      result += key + '=' + params[key] + '&'
    }
    return encodeURI(result.substring(0, result.length - 1))
  }
}
export default new Util()
