/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (!strs.length) {
    return ''
  }
  var num = 0
  var fs = strs[0]
  flag = true
  for (let i = 0; i < fs.length; i++) {
    flag = strs.every((a, b, c) => {
      return a[i] == fs[i]
    })
    if (flag == false) {
      num = i
      break
    }
  }
  return flag ? fs : fs.substr(0, num)
};