/*

Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along
the longest path from the root node down to the farthest leaf node.

Example 1:
  Input: root = [3,9,20,null,null,15,7]
  Output: 3

Example 2:
  Input: root = [1,null,2]
  Output: 2

Constraints:
- The number of nodes in the tree is in the range [0, 104].
- -100 <= Node.val <= 100

*/

// Standard solution
var maxDepth = function (root) {
  let result = 0

  const getDepth = (node, depth) => {
    if (node != null) {
      result = Math.max(result, depth + 1)
      getDepth(node.left, depth + 1)
      getDepth(node.right, depth + 1)
    }
  }

  getDepth(root, 0)

  return result
}

// Cleaner solution
var maxDepth = function (root) {
  if (root == null) return 0

  const leftDepth = maxDepth(root.left)
  const rightDepth = maxDepth(root.right)

  return Math.max(leftDepth, rightDepth) + 1
}
