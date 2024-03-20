/*

Given the root of a binary tree, invert the tree, and return its root.

Example 1:
  Input: root = [4,2,7,1,3,6,9]
  Output: [4,7,2,9,6,3,1]

Example 2:
  Input: root = [2,1,3]
  Output: [2,3,1]

Example 3:
  Input: root = []
  Output: []

Constraints:
- The number of nodes in the tree is in the range [0, 100].
- -100 <= Node.val <= 100

*/

var invertTree = function (root) {
  if (root == null) return null

  const { left, right } = root
  root.left = invertTree(right)
  root.right = invertTree(left)

  return root
}

// Attempt made at 20/03/2024
var invertTree = function (root) {
  if (!root) return root

  const reverse = (node) => {
    if (!(node.left || node.right)) return

    node.left && reverse(node.left)
    node.right && reverse(node.right)

    ;[node.left, node.right] = [node.right, node.left]
  }

  reverse(root)
  return root
}
