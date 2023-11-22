/*

Given the root of a binary tree, imagine yourself standing on the right side of it,
return the values of the nodes you can see ordered from top to bottom.

Example 1:
  Input: root = [1,2,3,null,5,null,4]
  Output: [1,3,4]

Example 2:
  Input: root = [1,null,3]
  Output: [1,3]

Example 3:
  Input: root = []
  Output: []

Constraints:
- The number of nodes in the tree is in the range [0, 100].
- -100 <= Node.val <= 100

*/

var rightSideView = function (root) {
  const result = []

  // Marks the current layer we are adding to the view array
  let reqDepth = 0

  // For each layer, we only add one node, the rightmost
  const dive = (node, depth) => {
    if (!node) return

    if (depth == reqDepth) {
      result.push(node.val)
      reqDepth++
    }

    dive(node.right, depth + 1)
    dive(node.left, depth + 1)
  }
  dive(root, 0)
  return result
}
