module.exports = {
  // 选择排序
  selectionSort: function (arr) {
    for (let i = 0; i < arr.length; i++) {
      let minIndex = i
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex])
          minIndex = j
      }
      swap(arr, i, minIndex)
    }
    return arr
  },

  // 冒泡排序
  bubbleSort3: function(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      // 有序标志，如果没有进行交换，也就是flag没有变成false，就说明数组有序，直接break
      let flag = true
      let pos = 0 // 记录最后一次交换的位置
      let k = arr.length - 1
      for (let j = 0; j < k; j++) {
        if (arr[j] > arr[j + 1]) {
          swap(arr, j, j + 1)
          flag = false
          pos = j
        }
      }
      k = pos

      if (flag) {
        break
      }
    }
    return arr
  },

  // 插入排序
  insertionSort: function (arr) {
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
  },

  // 希尔排序
  shellSort: function(arr) {
    let len = arr.length
    // 这里的gap不使用动态定义了，因为那样有点难理解
    let gaps = [5, 3, 1]

    // 一层循环控制排序次数 
    for (let g = 0; g < gaps.length; g++) {
      // 到这里就和插入排序一样了 
      for (let i = gaps[g]; i < len; i++) {
        let temp = arr[i]
        let j
        for (j = i; j >= gaps[g] && temp < arr[j - gaps[g]]; j -= gaps[g]) {
          arr[j] = arr[j - gaps[g]]
        }
        arr[j] = temp
      }
    }
    return arr
  },

  // 归并排序
  mergeSort: function(arr) {
    __mergeSort(arr, 0, arr.length - 1)
    return arr
  }
}





function swap(arr, t1, t2) {
  let temp = arr[t1]
  arr[t1] = arr[t2]
  arr[t2] = temp
  delete temp
}

/* ---------------归并函数所属 - start ----------------- */
function __mergeSort(arr, l, r) {
  // if (l >= r) {
  //   return
  // }
  if (r - l <= 15) {
    __insertionSort(arr, l, r)
    return
  }
  let mid = Math.floor((l + r) / 2)
  __mergeSort(arr, l, mid)
  __mergeSort(arr, mid + 1, r)
  // 因为两块都是有序的，如果我们的前者的最大值比后者的最小值还要小，说明此时已经有序
  if (arr[mid] > arr[mid + 1])
    __merge(arr, l, mid, r)
}

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

// 归并优化使用的插入排序
function __insertionSort(arr,l,r) {
  // 默认第一个位置与自己相比已经有序，i从1开始而不是0
  for (let i = l; i <=r; i++) {
    // 取一份待插入数的备份
    let e = arr[i]
    // j保存元素e应该插入的位置
    let j
    for (j = i; j > l && e < arr[j - 1]; j--) {
      arr[j] = arr[j - 1]
    }
    arr[j] = e
  }
  // return arr
}
/* ---------------归并函数所属 - end ----------------- */