var addTwoNumbers = function (l1, l2) {
  var temp = [], q1 = l1, q2 = l2, extra = 0

  while (q1 || q2) {
    var sum = (q1 ? q1.val : 0) + (q2 ? q2.val : 0) + extra
    extra = 0
    if (sum >= 10) {
      extra = 1
      sum = sum - 10
    }
    temp.push(sum)

    q1 = q1 && q1.next
    q2 = q2 && q2.next
  }

  if (extra) {
    temp.push(extra)
  }

  return temp
};

/* 
l1:[2,4,3]
L2:[5,6,4]

RETURN:[7,0,8]

难点： 链表结构
 */