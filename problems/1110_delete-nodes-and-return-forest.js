/*

Given the root of a binary tree, each node in the tree has a distinct value.

After deleting all nodes with a value in to_delete,
we are left with a forest (a disjoint union of trees).

Return the roots of the trees in the remaining forest.
You may return the result in any order.

Example 1:
  Input: root = [1,2,3,4,5,6,7], to_delete = [3,5]
  Output: [[1,2,null,4],[6],[7]]

Example 2:
  Input: root = [1,2,4,null,3], to_delete = [3]
  Output: [[1,2,4]]

Constraints:
- The number of nodes in the given tree is at most 1000.
- Each node has a distinct value between 1 and 1000.
- to_delete.length <= 1000
- to_delete contains distinct values between 1 and 1000.

*/

var delNodes = function (root, to_delete) {
  // A hash map where
  // - The key is the value of the root node of each tree
  // - The value is the root node itself
  const trees = new Map()
  trees.set(root.val, root)

  // A more complex BFS queue, which also contains the parent node
  // and where the side in which the current node was on
  const queue = [{ node: root, parent: null, side: null }]

  while (queue.length) {
    const { node, parent, side } = queue.shift()

    node.left && queue.push({ node: node.left, parent: node, side: 'left' })
    node.right && queue.push({ node: node.right, parent: node, side: 'right' })

    if (to_delete.includes(node.val)) {
      parent && (parent[side] = null)
      trees.delete(node.val)

      node.left && trees.set(node.left.val, node.left)
      node.right && trees.set(node.right.val, node.right)
    }
  }

  return [...trees.values()]
}
