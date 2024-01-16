/*

Given an integer n, return a list of all possible full binary trees with n nodes.
Each node of each tree in the answer must have Node.val == 0.

Each element of the answer is the root node of one possible tree.
You may return the final list of trees in any order.

A full binary tree is a binary tree where each node has exactly 0 or 2 children.

Example 1:
  Input: n = 7
  Output: [[0,0,0,null,null,0,0,null,null,0,0]
           [0,0,0,null,null,0,0,0,0],[0,0,0,0,0,0,0],
            [0,0,0,0,0,null,null,null,null,0,0],
            [0,0,0,0,0,null,null,0,0]]

Example 2:
  Input: n = 3
  Output: [[0,0,0]]

Constraints:
- 1 <= n <= 20

*/

var allPossibleFBT = function (n) {
  if (n % 2 == 0) return []

  // dp[i] gives me a list of all full binary trees of size i
  const dp = Array(n + 1)
    .fill()
    .map(() => [])
  dp[1].push(new TreeNode(0, null, null))

  const getTrees = (size) => {
    let result = []
    if (dp[size].length) return dp[size]

    // For a tree of size 5, we have the following possible sizes
    // for its [left, right] branches: [1, 5], [3, 3], [5, 1]
    for (let i = 1; i < size; i += 2) {
      const left_trees = getTrees(i)
      const right_trees = getTrees(size - 1 - i)

      for (let left of left_trees) for (let right of right_trees) result.push(new TreeNode(0, left, right))
    }

    dp[size] = result
    return result
  }

  return getTrees(n)
}
