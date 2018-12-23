const util = require('../util/util')

function insertionSort(arr, l, r) {
  // 默认第一个位置与自己相比已经有序，i从1开始而不是0
  for (let z = l; z <= r; z++) {
    // 取一份待插入数的备份
    let e = arr[z]
    // j保存元素e应该插入的位置
    let j
    for (j = z; j > l && e < arr[j - 1]; j--) {
      arr[j] = arr[j - 1]
    }
    arr[j] = e
  }
  // return arr
}

// 自底向上的归并排序
// function mergeSortBottomToUp (arr) {
//   var len = arr.length
//   // 第一轮循环控制有几次向上的过程 1 - 2 - 4 - 8 。。。 这样的过程
//   for (let size = 1; size <= len; size+=size) {
//     // 对arr[i...i+size-1],和 arr[i+size....i+size*2-1] 进行归并
//     // for (let i = 0; i< len; i += size*2) {
//     // i+size也至少是小于n的 保证 i+size-1 是不会越界的
//     for (let i = 0; i + size < len; i += size * 2) {
//       // __merge(arr, i, i+size-1, i+size*2 - 1)
//       // i+size*2 -1 可能会比n大 所以
//       __merge(arr, i, i+size-1, Math.min((i+size*2-1),len-1))
//     }
//   }
// }


// 自然归并排序
// 我们知道归并排序是将多个有序的数组合并成一个数组
// 一个无序的数组（除了完全逆序的数组 ），总有一部分数组是有序的
// 我们可以获取有序数组的标记，从而将多个有序数组合并成一个数组,这是自然归并排序的关键
function __getIndex (arr) {
  let flag = []
  // 最开始下标为0
  let next = 0
  flag[next] = 0
  next++
  for (let i=0;i<arr.length;i++) {
    // 找到数组开始无序的地方
    if (arr[i] > arr[i+1]) {
      flag[next++] = i
    }
  }

  console.log(flag)
  console.log(next)
  return next
}

function naturallyMergeSort (arr) {
  let flag = __getIndex(arr)
  let num = flag[flag.length-1]
  // 去flag最后一项为num，大于等于2 说明数组不是完全有序的
  while (num>=2) {
    // 对相邻数组进行合并
    for (let i = 0;i <= num;i+=2) {
      __merge(arr,flag[i],flag[i+1],flag[i+2])
    }
    flag = __getIndex(arr)
    num = flag[flag.length - 1]
  }
  return arr
}

__getIndex([0, 3, 4, 1, 7, 5, 8, 2])




function __merge(arr, l, mid, r) {
  let aux = new Array(r - l + 1)
  let i = 0
  let p1 = l
  let p2 = mid + 1
  // 谁小往临时数组里就添谁的过程
  while (p1 <= mid && p2 <= r) {
    aux[i++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++]
  }
  // 临界过程
  while (p1 <= mid) {
    aux[i++] = arr[p1++]
  }
  while (p2 <= r) {
    aux[i++] = arr[p2++]
  }
  for (let i = 0; i < aux.length; i++) {
    arr[l + i] = aux[i]
  }
}

// let arr = util.randomArray(50000, 0, 50000)

// util.testSort('归并BU', mergeSortBottomToUp, arr)