/**
 * Created by gd on 2017/12/29/029.
 */

class Util {
  constructor() {
    this.PI = Math.PI
  }

  urlEncode(url, params) {
    var result = url + '?'
    for (var key in params) {
      result += key + '=' + params[key] + '&'
    }
    return encodeURI(result.substring(0, result.length - 1))
  }

  getLongitude(longitude) {
    if (longitude > this.PI) {
      return ((longitude - 2 * this.PI) / this.PI) * 180;
    } else {
      return ((longitude) / this.PI) * 180;
    }
  }

  getLatitude(latitude) {
    if (latitude < 0) {
      return window.Math.abs(latitude / this.PI) * 180
    } else {
      return -((latitude / this.PI) * 180)
    }
  }

  getRandomString(number = 16) {
    return Math.random().toString(number).substr(2);
  }
}
export default new Util()
