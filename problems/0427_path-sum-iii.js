/*

Given the root of a binary tree and an integer targetSum,
return the number of paths where the sum of the values along the path equals targetSum.

The path does not need to start or end at the root or a leaf,
but it must go downwards (i.e., traveling only from parent nodes to child nodes).

Example 1:
  Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
  Output: 3
  Explanation: The paths that sum to 8 are shown.

Example 2:
  Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
  Output: 3

Constraints:
- The number of nodes in the tree is in the range [0, 1000].
- -109 <= Node.val <= 109
- -1000 <= targetSum <= 1000

*/

var pathSum = function (root, targetSum) {
  let result = 0

  const search = (node, sum = 0, previousNodes = false) => {
    if (!node) return
    if (sum + node.val == targetSum) result++

    // We either:

    // 1. Use the current node in our path
    search(node.left, sum + node.val, true)
    search(node.right, sum + node.val, true)

    // 2. Or we don't (however, we can only do this if no previous
    //    nodes were used, or else it would create a hole in our path)
    if (!previousNodes) {
      search(node.left, sum, false)
      search(node.right, sum, false)
    }
  }

  search(root)
  return result
}

// Attempt made at 20/03/2024
var pathSum = function (root, targetSum) {
  if (root == null) return 0

  // prefixMap gives me all the previous prefixes from the root node
  // to the current one inside the DFS call
  const prefixMap = new Map()
  prefixMap.set(0, 1) // An empty tree has a prefix 0

  let result = 0

  const dfs = (node, prev_prefix, prefixMap) => {
    const curr_prefix = prev_prefix + node.val
    result += prefixMap.get(curr_prefix - targetSum) || 0
    prefixMap.set(curr_prefix, (prefixMap.get(curr_prefix) || 0) + 1)

    if (node.left) dfs(node.left, curr_prefix, prefixMap)
    if (node.right) dfs(node.right, curr_prefix, prefixMap)

    prefixMap.set(curr_prefix, prefixMap.get(curr_prefix) - 1)
  }

  dfs(root, 0, prefixMap)
  return result
}
