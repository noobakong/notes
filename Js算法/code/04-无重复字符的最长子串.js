// 我的

// var lengthOfLongestSubstring = function (s) {
//   var arr = []
//   var num = 1
//   for (var j = 0; j < s.length; j++) {
//     for (var i = j; i < s.length; i++) {
//       if (arr.indexOf(s[i]) == -1) {
//         arr.push(s[i])
//         if (i === s.length - 1) {
//           num = Math.max(num, arr.length)
//         }
//       } else {
//         if (arr.length > num) {
//           num = arr.length
//         }
//         arr = []
//       }

//     }
//     arr = []
//   }
//   return s.length == 0 ? 0 : num
// };

//  986 / 987 个通过测试用例 最后一个输出超时，很是郁闷

// var str = '1234ddf'
// console.log(str.charAt(0))


// 滑动窗口法
var lengthOfLongestSubstring = function (s) {
  // 第一个字符
  var ls = s.charAt(0);

  var length = ls.length;

  for (i = 1; i <= s.length; i++) {
    let index = -1;

    // 后面的是否包含ls
    index = ls.indexOf(s.charAt(i))

    if (index > -1) { // 遇到相同的
      length = ls.length > length ? ls.length : length;
      ls = ls.substr(index + 1, s.length);
    }
    ls += s.charAt(i);
  }
  return length;
};



