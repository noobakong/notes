// 大根堆

// --------一代------------
// function MaxHeap() {
//   this.data = []
//   this.count = 0
// }

// --------二代------------
/*
    heapify: 将整个数组构建成堆
    对于一棵完全二叉树，第一个非叶子节点的索引值=Math.floor(元素个数/2)
    从第一个非叶子节点开始递减，依次shiftDown
*/

/*
    将n个元素逐个插入到一个空堆中，算法复杂度是O(nlogn)
    heapify的过程，直接舍弃了n/2个元素，算法复杂度为O(n)
 */
function MaxHeap(arr) {
  if(arr&&Object.prototype.toString.call(arr) === '[object Array]') {
    let i
    let len = arr.length
    this.data = []
    for(i=0;i<len;i++) {
      this.data[i+1] = arr[i]
    }
    this.count = len
    for(i=Math.floor(this.count/2);i>=1;i--) {
      this.shiftDown(i)
    }
  } else {
    this.data = []
    this.count = 0
  } 
}

MaxHeap.prototype.swap = function(arr,i,j) {
  let t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}

MaxHeap.prototype.size = function () {
  return this.count
}

MaxHeap.prototype.isEmpty = function() {
  return this.count == 0
}

/* 
堆的插入：
  - 插入尾部 count++
  - 进入shiftUp
  - 比较是否符合大根堆的特点，不符合就进行调整
 */
MaxHeap.prototype.insert = function(item) {
  // 传统数组[0..count-1]  表示堆的数组 [1..count] 所以这里是count+1
  this.data[this.count + 1] = item
  this.count++
  this.shiftUp(this.count)
}

MaxHeap.prototype.shiftUp = function(k) { 
  while(k>1&&this.data[Math.floor(k / 2)]<this.data[k]) {
    this.swap(this.data, k, Math.floor(k / 2))
    k = Math.floor(k / 2)
  }
}

/* 从堆中取出一个元素：
    - 只能取根节点元素，对于最大堆来说，取出的就是优先级最大的元素
    - 最后一个元素放到根元素的位置 保证其是完全二叉树
    - 进入shifDown，调换位置，保证其是大根堆(最大堆)
*/
MaxHeap.prototype.extractMax = function () {
  if (this.count>0) {
    let res = this.data[1]
    this.swap(this.data,1,this.count)
    this.count--
    this.shiftDown(1)
    return res
  } else {
    throw new Error('堆为空')
  }
}

MaxHeap.prototype.shiftDown = function (k) {
  while(this.count>=2*k) {
    let j = 2*k
    if (j+1 <=this.count && this.data[j+1]>this.data[j]){
      j++
    }
    if (this.data[k]>=this.data[j]) {
      break
    }
    this.swap(this.data,k,j)
    k=j
  }
}



// //-----------test-------------
// let maxHeap = new MaxHeap()
// for (let i = 1;i<=5;i++) {
//   // Math.floor(Math.random() * (rangeR - rangeL + 1)) + rangeL
//   var num = Math.floor(Math.random() * 101)
//   maxHeap.insert(num)
// }
// console.log(maxHeap.data)

// while (!maxHeap.isEmpty()) {
//   console.log(maxHeap.extractMax());
// };

module.exports = MaxHeap