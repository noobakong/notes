var n = 120
var reverse = function (x) {
  var nstr = x.toString()
  // var nstr = x.toString().split("").reverse().join("")
  if (nstr.startsWith('-')) {
    nstr = nstr.split('').slice(1).reverse()
    nstr.unshift('-')
    rs = parseInt(nstr.join(""))
    console.log(rs)
    return rs
  }

  while(nstr.endsWith('0')) {
    nstr = nstr.split('').slice(1)
    nstr = parseInt(nstr.join(""))
    console.log(nstr)
    return nstr
  }
  return nstr
}

reverse(n)