/*

Given a root node reference of a BST and a key,
delete the node with the given key in the BST.
Return the root node reference (possibly updated) of the BST.

Basically, the deletion can be divided into two stages:

1. Search for a node to remove.
2. If the node is found, delete the node.

Example 1:
  Input: root = [5,3,6,2,4,null,7], key = 3
  Output: [5,4,6,2,null,null,7]
  Explanation: Given key to delete is 3. So we find the node with value 3 and delete it.
               One valid answer is [5,4,6,2,null,null,7], shown in the above BST.
               Please notice that another valid answer is [5,2,6,null,4,null,7]
               and it's also accepted.

Example 2:
  Input: root = [5,3,6,2,4,null,7], key = 0
  Output: [5,3,6,2,4,null,7]
  Explanation: The tree does not contain a node with value = 0.

Example 3:
  Input: root = [], key = 0
  Output: []

Constraints:
- The number of nodes in the tree is in the range [0, 104].
- -105 <= Node.val <= 105
- Each node has a unique value.
- root is a valid binary search tree.
- -105 <= key <= 105

Follow up: Could you solve it with time complexity O(height of tree)?

*/

// Interactive solution (inefficient)
var deleteNode = function (root, key) {
  const replaceNode = (node, parent) => {
    // We use these to avoid replicating code in case
    // the right branch is empty but the left isn't
    let replacement = 'left'
    let otherSide = 'right'

    if (node.right) {
      replacement = 'right'
      otherSide = 'left'
    }

    // We are not at root
    if (parent) {
      if (parent.val > node.val) parent.left = node[replacement]
      else parent.right = node[replacement]
    }
    // We are at root
    else root = node[replacement]

    // If there is an orphaned branch on the other side
    if (node[otherSide]) {
      // Navigate to the corresponding leaf
      // where it will be inserted
      let leaf = node[replacement]
      while (leaf != null) {
        parent = leaf
        leaf = leaf[otherSide]
      }

      // Insert the branch
      if (parent) parent[otherSide] = node[otherSide]
    }
  }

  let parent = null
  let current = root

  while (current) {
    if (current.val == key) {
      replaceNode(current, parent)
      break
    } else {
      parent = current
      if (current.val > key) current = current.left
      else current = current.right
    }
  }

  return root
}

// Recursive solution
var deleteNode = function (root, key) {
  if (null === root) return null

  if (root.val === key) {
    // 1. The key node doesn't have children
    if (root.left == null && root.right == null) return null

    // 2. The key node either has both children
    //    (here is an illustration of what we are doing, key = 5)
    //
    //           5                     8
    //        /     \                 / \
    //       3*      8               7   9
    //      / \     / \    --->     /
    //     2   4   7   9           6
    //            /               /
    //           6               3*
    //                          / \
    //                         2   4
    //
    if (root.left != null && root.right != null) {
      let curr = root.right
      while (curr.left) curr = curr.left
      curr.left = root.left
      return root.right
    }

    // 3. The key node has only one of the children
    if (root.left == null) return root.right
    if (root.right == null) return root.left
  }

  // We keep searching for our key node
  if (key < root.val) root.left = deleteNode(root.left, key)
  else root.right = deleteNode(root.right, key)

  return root
}
