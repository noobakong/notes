function InversePairs(data) {
  var copy = data.slice();
  return mergeInversePairs(data, copy, 0, data.length - 1) % 1000000007;
}
function mergeInversePairs(arr, copy, l, r) {
  if (l === r) {
    return 0;
  }
  var mid = l + r >> 1;
  var left = mergeInversePairs(arr, copy, l, mid)
  var right = mergeInversePairs(arr, copy, mid + 1, r)
  var num = 0, i = l, p1 = l, p2 = mid + 1
  while (p1 <= mid && p2 <= r) {
    if (arr[p1] <= arr[p2]) {
      copy[i++] = arr[p1++]
    } else {
      num += mid - p1 + 1
      copy[i++] = arr[p2++]
    }
  }
  while (p1 <= mid) copy[i++] = arr[p1++];
  while (p2 <= r) copy[i++] = arr[p2++];
  for (var s = l; s <= r; s++) {
    arr[s] = copy[s];
  }
  return num + left + right;
}

var arr = [364, 637, 341, 406, 747, 995, 234, 971, 571, 219, 993, 407, 416, 366, 315, 301, 601, 650, 418, 355, 460, 505, 360, 965, 516, 648, 727, 667, 465, 849, 455, 181, 486, 149, 588, 233, 144, 174, 557, 67, 746, 550, 474, 162, 268, 142, 463, 221, 882, 576, 604, 739, 288, 569, 256, 936, 275, 401, 497, 82, 935, 983, 583, 523, 697, 478, 147, 795, 380, 973, 958, 115, 773, 870, 259, 655, 446, 863, 735, 784, 3, 671, 433, 630, 425, 930, 64, 266, 235, 187, 284, 665, 874, 80, 45, 848, 38, 811, 267, 575]
// var arr = [1, 4, 2, 3, 9, 6, 8, 7]
var a = InversePairs(arr)
console.log(a)
console.log(arr)