// 快速排序衍生的问题

function swap(arr,i,j) {
  let t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}

function selection (arr,k) {
  return __select(arr,0,arr.length-1,k)
}

function __select(arr,l,r,k) {
  if (l===r) {
    return arr[r]
  }
  let p = __partition(arr,l,r)
  if (k == p) {
    return arr[p]
  } else if (k < p) {
    return __select(arr,l,p-1,k)
  } else {
    return __select(arr,p+1,r,k)
  }
}

function __partition(arr,l,r) {
  let random = Math.floor(Math.random() * (r - l + 1)) + l
  swap(arr, l, random)
  let v = arr[l]
  let j = l
  for(let i = l+1;i<=r;i++) {
    if(arr[i] < v) {
      swap(arr,i,j+1)
      j++
    }
  }
  swap(arr,l,j)
  return j
}

var arr = [1, 4, 2, 3, 9, 6, 8, 7]
var a = selection(arr,7)
console.log(a)