/*
题目描述
输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。
 */

 

/* 先序遍历第一个位置肯定是根节点node，
 
  中序遍历的根节点位置在中间root
  在root左边的肯定是node的左子树的中序数组，root右边的肯定是node的右子树的中序数组
 
  另一方面，先序遍历的第二个位置到root，也是node左子树的先序子数组，剩下root右边的就是node的右子树的先序子数组
 
  把四个数组找出来，分左右递归调用即可
 
*/

function TreeNode(val) {
  this.val = val
  this.left = null
  this.right = null
}

function reConstructBinaryTree(pre, vin) {
  if (vin.length === 0)
    return null

  var root = 0, i, j
  var left_pre = [], right_pre = [], left_in = [], right_in = []
  // 根节点为前序遍历的第一项
  var head = new TreeNode(pre[0])
  // 在中序中找到根节点的位置
  for (i = 0;i < vin.length; i++) {
    if (vin[i] === pre[0]) {
      root = i
      break
    }
  }
  for (j = 0; j < root; j++) {
    // node左子树的先序子数组
    left_pre.push(pre[j + 1])
    // node的左子树的中序数组
    left_in.push(vin[j])
  }
  for (j = root + 1; j < vin.length; j++) {
    right_pre.push(pre[j])
    right_in.push(vin[j])
  }

  head.left = reConstructBinaryTree(left_pre, left_in)
  head.right = reConstructBinaryTree(right_pre, right_in)

  return head
}