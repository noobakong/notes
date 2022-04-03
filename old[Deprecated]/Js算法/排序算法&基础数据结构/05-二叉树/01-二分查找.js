// 非递归
function binarySearch1(arr,target) {
  let l = 0, r = arr.length - 1
  while(l<=r) {
    // let mid = Math.floor((l + r) / 2)
    let mid = l + Math.floor((r-l)/2)
    if(target === arr[mid])
      return mid
    if(target < arr[mid])
      r = mid -1
    if(target > arr[mid])
      l = mid + 1
  }
  return -1
}

// 递归
function binarySearch2(arr,target,l,r) {
  if (l>r){
    return -1
  }
  let mid = l + Math.floor((r - l) / 2)
  if (target === arr[mid]) {
    return mid
  }
  if (target < arr[mid])
    return binarySearch2(arr,target,l,mid - 1)
  if (target > arr[mid])
    return binarySearch2(arr, target, mid+1, r)
}


let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(binarySearch1(arr,3));
console.log(binarySearch2(arr, 3,0,arr.length-1));