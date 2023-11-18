/*

Given the root of a binary tree, check whether it is a mirror of itself
(i.e., symmetric around its center).

Example 1:
- Input: root = [1,2,2,3,4,4,3]
- Output: true

Example 2:
- Input: root = [1,2,2,null,3,null,3]
- Output: false

Constraints:
- The number of nodes in the tree is in the range [1, 1000].
- -100 <= Node.val <= 100

Follow up: Could you solve it both recursively and iteratively?

*/

var isSymmetric = function (root) {
  if (root == null) return false

  const left = []
  const right = []

  const mapTree = (root, array, mirrored) => {
    if (root == null) {
      array.push(null)
      return
    }

    array.push(root.val)
    if (mirrored) {
      mapTree(root.left, array, mirrored)
      mapTree(root.right, array, mirrored)
    } else {
      mapTree(root.right, array, mirrored)
      mapTree(root.left, array, mirrored)
    }
  }

  mapTree(root.left, left, false)
  mapTree(root.right, right, true)

  return left.toString() === right.toString()
}
