module.exports = {
  swap: function (arr,t1,t2) {
    let temp = arr[t1]
    arr[t1] = arr[t2]
    arr[t2] = temp
    delete temp
  },
  // 打印数组项
  printArr: function (arr) {
    var str = ''
    for (let i = 0; i < arr.length; i++) {
      str += arr[i] + ' '
    }
    return console.log(str)
  },

  // 生成随机用例方法
  randomArray: function (n, rangeL, rangeR) {
    let arr = []
    for (let i = 0; i < n; i++) {
      arr[i] = Math.floor(Math.random() * (rangeR - rangeL + 1)) + rangeL
    }
    return arr
  },
  
  // 生成近乎有序的用例
  generateNearlyOrderedArray: function (n,swapTimes) {
    let arr = []
    // 生成有序
    for (let i = 0;i<n;i++) {
      arr[i] = i
    }
    // 打乱
    for (let i=0;i<swapTimes;i++) {
      // 生成[0,n)
      let a = Math.floor(Math.random()*n)
      let b = Math.floor(Math.random()*n)
      this.swap(arr,a,b)
    }
    
    return arr
  },

  // 测试算法执行时间函数
  testSort: function(sortName, sortFn, arr) {
    console.time(sortName);
    sortFn(arr);
    console.timeEnd(sortName);
    if (!isSorted(arr)) {
      throw new Error('排序出错！');
    }
  },

  // Onlogn级别的算法到底时采用的插入排序优化
  innerInsertionSort: function (arr, l, r) {
    for (let i = l; i <= r; i++) {
      let e = arr[i]
      let j
      for (j = i; j > l && e < arr[j - 1]; j--) {
        arr[j] = arr[j - 1]
      }
      arr[j] = e
    }
  }
}


function isSorted (arr) {
  for (let i=0; i<arr.length - 1; i++) {
    if (arr[i] > arr[i+1])
      return false
  }
  return true
}