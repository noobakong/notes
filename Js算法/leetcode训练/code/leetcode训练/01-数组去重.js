// var removeDuplicates = function (arr) {
//   for (var i = 0; i < arr.length - 1; i++) {
//     for (var j = i + 1; j < arr.length; j++) {
//       if (arr[i] === arr[j]) {
//         arr.splice(j, 1);
//         j--;

//       }
//     }
//   }
//   return arr;
// }

// var removeDuplicates = function (arr) {
//   for (var i = 0; i < arr.length; i++) {
//     if (arr.indexOf(arr[i]) !== i) {
//       arr.splice(i, 1)
//       i--
//     }
//   }
//   return arr;
// }

// var removeDuplicates = function (arr) {
//   var res = [];
//   var obj = {};
//   for (var i = 0; i < arr.length; i++) {
//     if (!obj[arr[i]]) {
//       obj[arr[i]] = 1;
//       res.push(arr[i]);
//     }
//   }
//   return res;
// };

var removeDuplicates = function (arr) {
  var x = new Set(arr)
  return [...x]
}
arr = ['hahha', 'hahha', 1, 1, 1, 2, 2, 3, 3, 4]

console.log(removeDuplicates(arr))
