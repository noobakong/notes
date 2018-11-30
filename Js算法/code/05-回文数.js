/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x < 0) {
    return false
  }
  if (x == 0) {
    return true
  }

  var str = x.toString()
  var l = 0
  var r = str.length - 1
  while (str[l] == str[r] && l < r) {
    l++
    r--
  }

  if (l >= r) {
    return true
  } else {
    return false
  }
};