/*

Given the root of a binary tree,
determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys less than the node's key.
- The right subtree of a node contains only nodes with keys greater than the node's key.
- Both the left and right subtrees must also be binary search trees.

Example 1:
  Input: root = [2,1,3]
  Output: true

Example 2:
  Input: root = [5,1,4,null,null,3,6]
  Output: false
  Explanation: The root node's value is 5 but its right child's value is 4.

Constraints:
- The number of nodes in the tree is in the range [1, 104].
- -231 <= Node.val <= 231 - 1

*/

// Simple recursive solution
var isValidBST = function (root) {
  if (!root) return true
  return (
    isValidBST(root.left) &&
    isValidBST(root.right) &&
    root.val > getMax(root.left) &&
    root.val < getMin(root.right)
  )
}
var getMax = function (node) {
  if (!node) return -(2 ** 31) - 1
  return Math.max(node.val, getMax(node.right))
}
var getMin = function (node) {
  if (!node) return 2 ** 31
  return Math.min(node.val, getMin(node.left))
}

// Complex recursive solution (no performance or space improvement)
var isValidBST = function (root, min = -Infinity, max = Infinity) {
  if (!root) return true
  if (root.val <= min || root.val >= max) return false

  // Since we always call both of these for all nodes of the tree,
  // it ensures the values X between, for example, node.left and node:
  // node.left.val < X < node.val
  return (
    isValidBST(root.left, min, root.val) &&
    isValidBST(root.right, root.val, max)
  )
}
