/*

Given two integer arrays preorder and inorder where
preorder is the preorder traversal of a binary tree and
inorder is the inorder traversal of the same tree,
construct and return the binary tree.

Example 1:
  Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
  Output: [3,9,20,null,null,15,7]

Example 2:
  Input: preorder = [-1], inorder = [-1]
  Output: [-1]

Constraints:
- 1 <= preorder.length <= 3000
- inorder.length == preorder.length
- -3000 <= preorder[i], inorder[i] <= 3000
- preorder and inorder consist of unique values.
- Each value of inorder also appears in preorder.
- preorder is guaranteed to be the preorder traversal of the tree.
- inorder is guaranteed to be the inorder traversal of the tree.

*/

var buildTree = function (preorder, inorder) {
  if (preorder.length == 0) return null

  const result = new TreeNode()

  // 1. Set the node's value
  result.val = preorder[0]

  // 2. Get the current index in the inorder array to determine
  //    how many nodes remain to the left and right of it
  const rootIndex = inorder.indexOf(result.val)

  // 3. Recursively call buildTree, with the apropriately sliced
  //    preorder and inorder trees arrays, using inorder to determine
  //    the size of each side and preorder to determine their hierarchy

  //    e.g., preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]

  //    We know the root node is preorder[0] = 3
  //    since 3 = inorder[1], we know the left subtree has size 1 and the right one size 3

  //    So  leftPreorder = [9] and rightPreorder = [20, 15, 7]
  //    and leftInorder  = [9] and rightInorder  = [15, 20, 7]
  const leftSubtreeSize = rootIndex
  const rightSubtreeSize = inorder.length - (rootIndex + 1)

  result.left = buildTree(
    preorder.slice(1, 1 + leftSubtreeSize),
    inorder.slice(0, rootIndex),
  )
  result.right = buildTree(
    preorder.slice(1 + leftSubtreeSize, 1 + leftSubtreeSize + rightSubtreeSize),
    inorder.slice(rootIndex + 1, inorder.length),
  )

  return result
}
