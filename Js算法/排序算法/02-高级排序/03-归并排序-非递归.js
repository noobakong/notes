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

// 两组的归并操作
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

// 自底向上的归并排序
function mergeSortBottomToUp (arr) {
  var len = arr.length
  // 第一轮循环控制有几次向上的过程 1 - 2 - 4 - 8 。。。 这样的过程
  for (let size = 1; size <= len; size+=size) {
    // 对arr[i...i+size-1],和 arr[i+size....i+size*2-1] 进行归并
    // for (let i = 0; i< len; i += size*2) {
    // i+size也至少是小于n的 保证 i+size-1 是不会越界的
    for (let i = 0; i + size < len; i += size * 2) {
      // __merge(arr, i, i+size-1, i+size*2 - 1)
      // i+size*2 -1 可能会比n大 所以
      __merge(arr, i, i+size-1, Math.min((i+size*2-1),len-1))
    }
  }
}


// 自然归并排序
// 我们知道归并排序是将多个有序的数组合并成一个数组
// 一个无序的数组（除了完全逆序的数组 ），总有一部分数组是有序的
// 我们可以获取有序数组的标记，从而将多个有序数组合并成一个数组,这是自然归并排序的关键
// let arr = [1, 5, 2, 3, 6, 0, 7, 4, 8]
//         0, 1, 2, 3, 4, 5, 6, 7, 8
//    arr[0-1] arr[2-4] arr[5-6] arr[7-8]

// 自然分组
function fenzu (arr,getPosArr) {
  let j = 0
  getPosArr[j++] = 0  // 第一个分组一定是从下标0开始的
  for(i=0 ;i < arr.length -1;i++) {
    if (arr[i] > arr[i+1]) {
      getPosArr[j++] = i
    }
  }
  // let arr = [1, 5, 2, 3, 6, 0, 7, 4, 8]
  // numOfNatureGroupings为自然分组的个数, 此次值为4，
  // 即分为四组，{1, 5}, {2, 3, 6}, {0, 7}, {4, 8}
  return j
}

function naturallyMergeSort (arr) {
  let getPosArr = []
  let groupsNum = fenzu(arr,getPosArr)
  while(groupsNum>2) {
    for(i=0;i<groupsNum-2;i+=2) {
      __merge(arr,getPosArr[i],getPosArr[i+1],getPosArr[i+2])
    }
    groupsNum = fenzu(arr,getPosArr)
  }
  if(groupsNum == 2) {
    __merge(arr,getPosArr[0],getPosArr[1],arr.length-1)
  }
  return arr
}



let arr = util.randomArray(500000, 0, 50000)
let arr1 = arr.slice()
util.testSort('归并BU', mergeSortBottomToUp, arr)
// util.testSort('自然归并', naturallyMergeSort, arr1)