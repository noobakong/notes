function Node(key) {
  this.key = key
  this.left = null
  this.right = null
}
// 返回节点的键值
Node.prototype.show = function () {
  return this.key
}

function BST() {
  this.root = null
  this.count = 0
}
BST.prototype.size = function () {
  return this.count
}
BST.prototype.isEmpty = function () {
return this.count === 0
}

/* 
    插入：先跟根节点的键值做比较
         特殊情况：键值相同则替代
 */
BST.prototype.insert = function(key) {
  var newNode = new Node(key) // 创建一个空节点
  if (!this.root) { // 空树
    this.root = newNode
    this.count++
    return
  }
  let current = this.root
  while (true) {
    if (key < current.key) {
      if(!current.left) {
        current.left = newNode
        this.count++
        break
      } else {
        current = current.left
      }
    } else if (key > current.key) {
      if (!current.right) {
        current.right = newNode
        this.count++
        break
      } else {
        current = current.right
      }
    }
  }
}

/* 
查找：contain和search同质
 */
BST.prototype.contain = function(key) {
  var current = this.root
  while (true) {
    if (key < current.key) {
      if (!current.left) {
        break
      } else {
        current = current.left
      }
    } else if (key > current.key) {
      if (!current.right) {
        break
      } else {
        current = current.right
      }
    } else {
      return true
    }
  }
  return false
}

BST.prototype.search = function (key) {
  var current = this.root
  while (true) {
    if (key < current.key) {
      if (!current.left) {
        break
      } else {
        current = current.left
      }
    } else if (key > current.key) {
      if (!current.right) {
        break
      } else {
        current = current.right
      }
    } else {
      return current
    }
  }
  return null
}

/* 
遍历
 - 前序遍历
 - 中序遍历
 - 后续遍历
 */
// 前序遍历
BST.prototype.preOrder = function() {
  (function(node){
    if(node){
      console.log(node.show())
      arguments.callee(node.left)
      arguments.callee(node.right)
    }
  })(this.root)
}
// 中序遍历
BST.prototype.inOrder = function () {
  (function (node) {
    if (node) {
      arguments.callee(node.left)
      console.log(node.show())
      arguments.callee(node.right)
    }
  })(this.root)
}
// 后续遍历
BST.prototype.postOrder = function () {
  (function (node) {
    if (node) {
      arguments.callee(node.left)
      arguments.callee(node.right)
      console.log(node.show())
    }
  })(this.root)
}
/* 
层序遍历
 */
BST.prototype.levelOrder = function() {
  var q = []
  q.push(this.root)
  while(q.length!==0) {
    var res = q.shift()
    console.log(res.show())
    if (res.left !== null) {
      q.push(res.left)
    }
    if (res.right !== null) {
      q.push(res.right)
    }
  }
}
/* 
查找最小值和最大值
 */
BST.prototype.getMin = function () {
  if(this.root) {
    var current = this.root
    while(current.left) {
      current = current.left
    }
    return current.key
  } else {
    return null
  }
}
BST.prototype.getMax = function () {
  if (this.root) {
    var current = this.root
    while (current.right) {
      current = current.right
    }
    return current.key
  } else {
    return null
  }
}
/* 
删除节点
 */
BST.prototype.remove = function(key) {
  this.root = this.removeNode(this.root,key)
}
BST.prototype.removeNode = function(node,key) {
  if(node === null)
    return null
  if(key < node.key) {
    node.left = this.removeNode(node.left,key)
    return node
  }
  else if (key > node.key) {
    node.right = this.removeNode(node.right, key)
    return node
  }
  else { // 找到要删除的节点
    // 没有左右子节点
    if(!node.left&&!node.right) {
      this.count--
      return null
    }
    // 没有左子节点
    if(!node.left) {
      this.count--
      return node.right
    }
    // 没有右子节点
    if (!node.right) {
      this.count--
      return node.left
    }

    // 左右子节点都有
    // 1.找到待删除的节点的右子节点的较小的节点
    // 2.赋值给待删除节点
    // 3.再删除最小节点
    var minNode = this.__getSmallest(node.right)
    node.key = minNode.key
    node.right = this.removeNode(node.right,minNode.key)
    return node
  }
}
//查找以node为根节点的二叉树的最小值
BST.prototype.__getSmallest = function (node) {
  var current = node
  while (current.left) {
    current = currnet.left
  }
  return current
}
var bst = new BST()

bst.insert(1)
bst.insert(3)
bst.insert(2)
console.log(bst)
bst.remove(3)
console.log(bst)