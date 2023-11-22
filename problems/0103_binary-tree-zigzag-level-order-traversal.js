/*

Given the root of a binary tree, return the zigzag level order traversal of its nodes' values.
(i.e., from left to right, then right to left for the next level and alternate between).

Example 1:
  Input: root = [3,9,20,null,null,15,7]
  Output: [[3],[20,9],[15,7]]

Example 2:
  Input: root = [1]
  Output: [[1]]

Example 3:
  Input: root = []
  Output: []

Constraints:
- The number of nodes in the tree is in the range [0, 2000].
- -100 <= Node.val <= 100

*/

var zigzagLevelOrder = function (root) {
  if (!root) return []

  const result = [[]]
  let queue = [root]
  let temp = []

  let order = 0 // 0 = left to right | 1 = right to left

  while (queue.length) {
    const { left, right, val } = queue.shift()
    left && temp.push(left)
    right && temp.push(right)
    order == 0
      ? result[result.length - 1].push(val)
      : result[result.length - 1].unshift(val)

    if (queue.length == 0 && temp.length > 0) {
      queue = temp
      temp = []

      result.push([])
      order = (order + 1) % 2
    }
  }

  return result
}
