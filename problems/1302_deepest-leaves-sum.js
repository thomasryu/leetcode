/*

Given the root of a binary tree,
return the sum of values of its deepest leaves.

Example 1:
  Input: root = [1,2,3,4,5,null,6,7,null,null,null,null,8]
  Output: 15

Example 2:
  Input: root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
  Output: 19

Constraints:
- The number of nodes in the tree is in the range [1, 104].
- 1 <= Node.val <= 100

*/

var deepestLeavesSum = function (root) {
  let queue = [root]
  let new_queue = []

  let sum = 0
  while (queue.length) {
    const node = queue.shift()
    sum += node.val

    node.left && new_queue.push(node.left)
    node.right && new_queue.push(node.right)

    if (queue.length == 0) {
      if (new_queue.length) {
        queue = new_queue
        new_queue = []
        sum = 0
      } else return sum
    }
  }
}
