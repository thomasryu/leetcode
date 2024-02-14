/*

Given the root of a binary tree with unique values and the values of two different nodes of the tree x and y,
return true if the nodes corresponding to the values x and y in the tree are cousins, or false otherwise.

Two nodes of a binary tree are cousins if they have the same depth with different parents.

Note that in a binary tree, the root node is at the depth 0,
and children of each depth k node are at the depth k + 1.

Example 1:
  Input: root = [1,2,3,4], x = 4, y = 3
  Output: false

Example 2:
  Input: root = [1,2,3,null,4,null,5], x = 5, y = 4
  Output: true

Example 3:
  Input: root = [1,2,3,null,4], x = 2, y = 3
  Output: false

Constraints:
- The number of nodes in the tree is in the range [2, 100].
- 1 <= Node.val <= 100
- Each node has a unique value.
- x != y
- x and y are exist in the tree.

*/

var isCousins = function (root, x, y) {
  let queue = [[root, null]]
  let new_queue = []

  let x_found = false
  let x_parent = null

  let y_found = false
  let y_parent = null

  while (queue.length) {
    const [node, parent_val] = queue.shift()

    if (node.val == x) {
      x_found = true
      x_parent = parent_val
    }
    if (node.val == y) {
      y_found = true
      y_parent = parent_val
    }

    node.left && new_queue.push([node.left, node.val])
    node.right && new_queue.push([node.right, node.val])

    if (queue.length == 0) {
      queue = new_queue
      new_queue = []

      if (x_found || y_found) {
        if (x_found && y_found && x_parent != y_parent) return true
        else return false
      }
    }
  }

  return false
}
