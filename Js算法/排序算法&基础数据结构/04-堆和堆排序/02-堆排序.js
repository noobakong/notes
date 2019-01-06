let MaxHeap = require('./01-js实现堆')

// -----------一代--------------------
// function heapSort(arr) {
//   let maxHeap = new MaxHeap()
//   for(let i=0;i<arr.length;i++) {
//     maxHeap.insert(arr[i])
//   }
//   for(let i=arr.length - 1;i>=0;i--) {
//     arr[i] = maxHeap.extractMax()
//   }
//   return arr
// }
// let arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
// console.log(heapSort(arr))

//-------------二代------------------------
// function heapSort(arr) {
//   let maxHeap = new MaxHeap(arr)
//   for (let i = arr.length - 1; i >= 0; i--) {
//     arr[i] = maxHeap.extractMax()
//   }
//   return arr
// }
// let arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
// console.log(heapSort(arr))

//------------三代----------------------------
/*
    原地堆排序:无需额外的空间,直接在原数组上进行原地的堆排序
    树从0开始索引
    parent(i) = (i - 1)/2
    left child (i) = 2*i + 1
    right child (i) = 2*i + 2
    最后一个非叶子节点的索引（count - 1)/2
*/
function heapSort(arr) {
  // 从第一个非叶子节点开始，依次递减，shiftDown后，数组变为最大堆
  for(let i = Math.floor((arr.length-1)/2);i>=0;i--){
    __shiftDown(arr,arr.length,i)
  }
  // 将数组的第一个数(数组中最大的数) 和最后一个元素交换位置，这样就保证最的元素在后面
  // count-- 再把堆重新shifDown成最大堆 在进行上面操作
  for(let i=arr.length-1;i>0;i--){
    swap(arr,i,0)
    __shiftDown(arr,i,0)
  }
  return arr

}

function __shiftDown(arr,n,k) {
  while(2*k+1<n) {
    let j = 2*k+1
    if(j+1<n&&arr[j+1]>arr[j]){
      j++
    }
    if(arr[k]>=arr[j]) {
      break
    }
    swap(arr,k,j)
    k = j
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

let arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
console.log(heapSort(arr))