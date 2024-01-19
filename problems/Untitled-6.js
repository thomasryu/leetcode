/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} n
 * @param {number} x
 * @return {boolean}
 */
var btreeGameWinningMove = function (root, n, x) {
  const heights = Array(n + 1).fill(0)
  const depths = Array(n + 1).fill(0)

  let red_parent_node = null
  let red_node = null

  const get_heights = (node, depth) => {
    if (node == null) return 0
    if (heights[node.val] > 0) return heights[node.val]

    if (node.left?.val == x || node.right?.val == x) red_parent_node = node
    else if (node.val == x) red_node = node

    depths[node.val] = depth
    heights[node.val] = Math.max(get_heights(node.left, depth + 1), get_heights(node.right, depth + 1)) + 1

    return heights[node.val]
  }

  get_heights(root, 1)

  // Our solution can be

  // 1. Below the X's node
  //    - If X only has one branch we've either won or tied
  //    - If X has two branches, we need to check one of them is bigger than (height[sibling] + 1)

  // 2. Elsewhere on the tree, so we also need to keep track of the greatest height
  //    achievable without X's node and children

  if (red_parent_node) {
    let sibling_branch_side = null
    if (red_parent_node.left && red_parent_node.left.val != x) sibling_branch_side = 'left'
    else if (red_parent_node.right && red_parent_node.right.val != x) sibling_branch_side = 'right'
    if (
      sibling_branch_side &&
      depths[red_parent_node.val] + heights[red_parent_node[sibling_branch_side].val] > heights[x]
    )
      return true
  }

  if (get_heights(red_node.left) >= get_heights(red_node.right) + 1) return true
  if (get_heights(red_node.right) >= get_heights(red_node.left) + 1) return true

  return false
}
