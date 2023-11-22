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
