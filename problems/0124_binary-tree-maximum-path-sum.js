/*

A path in a binary tree is a sequence of nodes where each pair of
adjacent nodes in the sequence has an edge connecting them.
A node can only appear in the sequence at most once.
Note that the path does not need to pass through the root.

The path sum of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the maximum path sum of any non-empty path.

Example 1:
  Input: root = [1,2,3]
  Output: 6
  Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.

Example 2:
  Input: root = [-10,9,20,null,null,15,7]
  Output: 42
  Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.

Constraints:
- The number of nodes in the tree is in the range [1, 3 * 104].
- -1000 <= Node.val <= 1000

*/

var maxPathSum = function (root) {
  const MIN = -3 * 10 ** 7
  if (!root.left && !root.right) return root.val

  // Given a root of a tree, we have options:
  // 1. The maximum path passes throught it
  //    a. Which means no further sum down the line can do a "^" shape
  // 2. The maximum path does not pass through it
  //    a. Which means, its either to the left of it or to the right

  let leftPathSum = MIN
  let rightPathSum = MIN
  let leftBranchSum = 0
  let rightBranchSum = 0

  if (root.left) {
    leftPathSum = maxPathSum(root.left)
    leftBranchSum = maxBranchSum(root.left)
  }
  if (root.right) {
    rightPathSum = maxPathSum(root.right)
    rightBranchSum = maxBranchSum(root.right)
  }

  return Math.max(
    root.val + leftBranchSum + rightBranchSum,
    leftPathSum,
    rightPathSum,
  )
}

// Gets the the maximum linear sum from root
// (it doesn't necessarily needs to reach a leaf, it can stop midway if,
// for example, all the following nodes are negative)
var maxBranchSum = function (root) {
  if (!root) return 0
  return Math.max(
    0,
    root.val + maxBranchSum(root.left),
    root.val + maxBranchSum(root.right),
  )
}

// Optimized solution
var maxPathSum = function (root) {
  let result = -Infinity

  const findSum = (node) => {
    if (!node) return 0

    const leftSum = findSum(node.left)
    const rightSum = findSum(node.right)

    // The sum calculation includes all the options
    result = Math.max(
      result,
      node.val,
      node.val + leftSum,
      node.val + rightSum,
      node.val + leftSum + rightSum,
    )

    // However, the findSUm recursive search
    // only includes branch sums (without considering the "^" route)
    return Math.max(node.val, node.val + leftSum, node.val + rightSum)
  }

  findSum(root)
  return result
}
