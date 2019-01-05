const util = require('../util/util')
let arr = util.randomArray(100000,0,1000)
let arr1 = arr.slice()
let arr2 = arr.slice()


function shellSort(arr) {
  let len = arr.length
  // 这里的gap不使用动态定义了，因为那样有点难理解
  let gaps = [5,3,1]

  // 一层循环控制排序次数 
  for (let g=0;g<gaps.length;g++) {
    // 到这里就和插入排序一样了 
    for (let i=gaps[g]; i<len; i++) {
      let temp = arr[i]
      let j
      for (j=i;j>=gaps[g]&&temp<arr[j-gaps[g]];j-=gaps[g]) {
        arr[j] = arr[j - gaps[g]]
      }
      arr[j] = temp
    }
  }
  return arr
}

// 插入排序
function insertionSort(arr) {
  // 默认第一个位置与自己相比已经有序，i从1开始而不是0
  for (let i = 1; i < arr.length; i++) {
    // 取一份待插入数的备份
    let e = arr[i]
    // j保存元素e应该插入的位置
    let j
    for (j = i; j > 0 && e < arr[j - 1]; j--) {
      arr[j] = arr[j - 1]
    }
    arr[j] = e
  }
  return arr
}

util.testSort('shell',shellSort,arr1)
// util.testSort('insert', insertionSort, arr2)
