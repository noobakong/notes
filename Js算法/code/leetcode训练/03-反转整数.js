var n = 120

// 我的。。。
// var reverse = function (x) {
//   var nstr = x.toString()
//   if (nstr.startsWith('-')) {
//     nstr = nstr.split('').slice(1).reverse()
//     nstr.unshift('-')
//     rs = parseInt(nstr.join(''))
//     if (rs > -2147483648 && rs < 2147483648) {
//       return rs
//     } else {
//       return 0
//     }

//   } else {
//     nstr = parseInt(x.toString().split('').reverse().join(''))
//     if (nstr > -2147483648 && nstr < 2147483648) {
//       return nstr
//     } else {
//       return 0
//     }
//   }


//   while (nstr.endsWith('0')) {
//     nstr = nstr.split('')
//     nstr.pop()
//     nstr = nstr.join('')

//   }
//   if (parseInt(nstr) > -2147483648 && parseInt(nstr) < 2147483648) {
//     return parseInt(nstr)
//   } else {
//     return 0
//   }
// }

// 别人的
let reverse = function (x) {
  let res = 0;
  while (x !== 0) {
    res = res * 10 + x % 10;
    x = x < 0 ? Math.ceil(x / 10) : Math.floor(x / 10);
  }
  return res < -(2 ** 31) || res > 2 ** 31 - 1 ? 0 : res;
};

console.log(reverse(n))