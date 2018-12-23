/**
 * @param {string} s
 * @return {number}
 */
var obj = {
  "I": 1,
  "V": 5,
  "X": 10,
  "L": 50,
  "C": 100,
  "D": 500,
  "M": 1000,

}
var romanToInt = function (s) {
  var sum = 0
  for (let i = 0; i < s.length; i++) {
    sum += obj[s[i]]
    if ((s[i] == "V" || s[i] == "X") && s[i - 1] == "I") {
      console.log(s[i] == "V" || s[i] == "X")
      sum = sum - 2
    }
    if ((s[i] == "C" || s[i] == "L") && s[i - 1] == "X") {
      sum = sum - 20
    }
    if ((s[i] == "D" || s[i] == "M") && s[i - 1] == "C") {
      sum = sum - 200
    }
  }
  return sum
};