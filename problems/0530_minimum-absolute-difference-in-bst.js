/*

Given the root of a Binary Search Tree (BST),
return the minimum absolute difference between the values of any two different nodes in the tree.

Example 1:
  Input: root = [4,2,6,1,3]
  Output: 1

Example 2:
  Input: root = [1,0,48,null,null,12,49]
  Output: 1

Constraints:
- The number of nodes in the tree is in the range [2, 104].
- 0 <= Node.val <= 105

*/

// Array solution
var getMinimumDifference = function (root) {
  const values = []

  const add = (node) => {
    if (!node) return
    values.push(node.val)
    add(node.left)
    add(node.right)
  }
  add(root)

  let result = 10 ** 5
  values.sort((a, b) => a - b)
  for (let i = 1; i < values.length; i++)
    result = Math.min(result, values[i] - values[i - 1])

  return result
}

// Complex recursion
var getMinimumDifference = function (root, low = -Infinity, high = Infinity) {
  if (!root) return high - low
  const left = getMinimumDifference(node.left, low, node.val)
  const right = getMinimumDifference(node.right, node.val, high)
  return Math.min(left, right)
}
