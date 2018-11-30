/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function (J, S) {
  var result = 0
  for (i = 0; i < J.length; i++) {
    for (j = 0; j < S.length; j++) {
      if (S[j] == J[i])
        result++
    }
  }
  return result
};