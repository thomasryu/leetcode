/*

Given the root of a binary search tree, and an integer k,
return the kth smallest value (1-indexed) of all the values of the nodes in the tree.

Example 1:
  Input: root = [3,1,4,null,2], k = 1
  Output: 1

Example 2:
  Input: root = [5,3,6,2,4,null,null,1], k = 3
  Output: 3

Constraints:
- The number of nodes in the tree is n.
- 1 <= k <= n <= 104
- 0 <= Node.val <= 104

Follow up: If the BST is modified often (i.e., we can do insert and delete operations)
           and you need to find the kth smallest frequently, how would you optimize?

*/

// Array + recursion solution (bad performance and space)
var kthSmallest = function (root, k) {
  const array = []
  const add = (node) => {
    if (!node) return
    add(node.left)
    array.push(node.val)
    add(node.right)
  }
  add(root)
  return array[k - 1]
}

// Array + iteractive solution (improvement in performance and space)
var kthSmallest = function (root, k) {
  let current = root
  const array = []

  while (current || array.length > 0) {
    while (current) {
      array.unshift(current)
      current = current.left
    }

    current = array.shift()
    if (k == 1) return current.val
    k--

    current = current.right
  }
}
