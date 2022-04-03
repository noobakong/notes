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

// 归并排序的基础上添加一个计数器