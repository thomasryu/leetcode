/*

Given two integer arrays inorder and postorder where
inorder is the inorder traversal of a binary tree and
postorder is the postorder traversal of the same tree,
construct and return the binary tree.

Example 1:
  Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
  Output: [3,9,20,null,null,15,7]

Example 2:
  Input: inorder = [-1], postorder = [-1]
  Output: [-1]

Constraints:
- 1 <= inorder.length <= 3000
- postorder.length == inorder.length
- -3000 <= inorder[i], postorder[i] <= 3000
- inorder and postorder consist of unique values.
- Each value of postorder also appears in inorder.
- inorder is guaranteed to be the inorder traversal of the tree.
- postorder is guaranteed to be the postorder traversal of the tree

*/

var buildTree = function (inorder, postorder) {
  if (postorder.length == 0) return null

  const result = new TreeNode()

  // 1. Set the node's value
  result.val = postorder[postorder.length - 1]

  // 2. Get the current index in the inorder array to determine
  //    how many nodes remain to the left and right of it
  const rootIndex = inorder.indexOf(result.val)

  // 3. Recursively call buildTree, with the apropriately sliced
  //    preorder and inorder trees arrays, using inorder to determine
  //    the size of each side and postorder to determine their hierarchy
  const leftSubtreeSize = rootIndex
  const rightSubtreeSize = inorder.length - (rootIndex + 1)

  result.right = buildTree(
    inorder.slice(rootIndex + 1, inorder.length),
    postorder.slice(
      postorder.length - 1 - rightSubtreeSize,
      postorder.length - 1,
    ),
  )
  result.left = buildTree(
    inorder.slice(0, rootIndex),
    postorder.slice(
      postorder.length - 1 - rightSubtreeSize - leftSubtreeSize,
      postorder.length - 1 - rightSubtreeSize,
    ),
  )

  return result
}
