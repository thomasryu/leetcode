/*

Given a n * n matrix grid of 0's and 1's only.
We want to represent grid with a Quad-Tree.

Return the root of the Quad-Tree representing grid.

A Quad-Tree is a tree data structure in which each internal node has exactly four children.
Besides, each node has two attributes:

- val: True if the node represents a grid of 1's or False if the node represents a grid of 0's.
  Notice that you can assign the val to True or False when isLeaf is False, and both are accepted in the answer.
- isLeaf: True if the node is a leaf node on the tree or False if the node has four children.

class Node {
    public boolean val;
    public boolean isLeaf;
    public Node topLeft;
    public Node topRight;
    public Node bottomLeft;
    public Node bottomRight;
}

We can construct a Quad-Tree from a two-dimensional area using the following steps:

1. If the current grid has the same value (i.e all 1's or all 0's)
   set isLeaf True and set val to the value of the grid and set the four children to Null and stop.
2. If the current grid has different values, set isLeaf to False and set val to any value and
   divide the current grid into four sub-grids as shown in the photo.
3. Recurse for each of the children with the proper sub-grid.

If you want to know more about the Quad-Tree, you can refer to the wiki.

Quad-Tree format:

You don't need to read this section for solving the problem.
This is only if you want to understand the output format here.
The output represents the serialized format of a Quad-Tree using level order traversal,
where null signifies a path terminator where no node exists below.

It is very similar to the serialization of the binary tree.
The only difference is that the node is represented as a list [isLeaf, val].

If the value of isLeaf or val is True we represent it as 1 in the list [isLeaf, val]
and if the value of isLeaf or val is False we represent it as 0.

Example 1:
  Input: grid = [[0,1],[1,0]]
  Output: [[0,1],[1,0],[1,1],[1,1],[1,0]]

Example 2:
  Input: grid = [[1,1,1,1,0,0,0,0],
                 [1,1,1,1,0,0,0,0],
                 [1,1,1,1,1,1,1,1],
                 [1,1,1,1,1,1,1,1],
                 [1,1,1,1,0,0,0,0],
                 [1,1,1,1,0,0,0,0],
                 [1,1,1,1,0,0,0,0],
                 [1,1,1,1,0,0,0,0]]
  Output: [[0,1],[1,1],[0,1],[1,1],[1,0],null,null,null,null,[1,0],[1,0],[1,1],[1,1]]
  Explanation: All values in the grid are not the same. We divide the grid into four sub-grids.
               The topLeft, bottomLeft and bottomRight each has the same value.
               The topRight have different values so we divide it into 4 sub-grids where each has the same value.

Constraints:
- n == grid.length == grid[i].length
- n == 2x where 0 <= x <= 6

*/

var construct = function (grid) {
  const n = grid.length
  const root = new Node()

  const construct = (node, iStart, iEnd, jStart, jEnd) => {
    // Minimal case:
    // We are working with a 1x1 quad
    if (iEnd - iStart == 1) {
      node.val = grid[iStart][jStart] == 1
      node.isLeaf = true
      return grid[iStart][jStart] == 1
    }

    // Get the middle index of the quad
    const iMiddle = (iStart + iEnd) / 2
    const jMiddle = (jStart + jEnd) / 2

    node.topLeft = new Node()
    node.topRight = new Node()
    node.bottomLeft = new Node()
    node.bottomRight = new Node()

    // Calculate the value of the four quads
    const topLeft = construct(node.topLeft, iStart, iMiddle, jStart, jMiddle)
    const topRight = construct(node.topRight, iStart, iMiddle, jMiddle, jEnd)
    const bottomLeft = construct(
      node.bottomLeft,
      iMiddle,
      iEnd,
      jStart,
      jMiddle
    )
    const bottomRight = construct(
      node.bottomRight,
      iMiddle,
      iEnd,
      jMiddle,
      jEnd
    )

    // If all quads have the same value, set it as a leaf,
    // set its values and prune the subnodes
    if (
      topLeft == topRight &&
      topRight == bottomLeft &&
      bottomLeft == bottomRight &&
      bottomRight != -1
    ) {
      node.val = topLeft
      node.isLeaf = true

      node.topLeft = null
      node.topRight = null
      node.bottomLeft = null
      node.bottomRight = null

      return topLeft
    }

    // Else, set it as a non-leaf
    node.val = false
    node.isLeaf = false
    return -1
  }

  construct(root, 0, n, 0, n)
  return root
}

// Attempt 04/04/2024
var construct = function (grid) {
  const n = grid.length

  // 0: isLeaf, 1: val
  const createNode = (start_row, start_col, size) => {
    // If current quad is of size 1, return leaf
    if (size == 1)
      return new Node(grid[start_row][start_col], true, null, null, null, null)

    const half = size / 2
    let children = [
      createNode(start_row, start_col, half),
      createNode(start_row, start_col + half, half),
      createNode(start_row + half, start_col, half),
      createNode(start_row + half, start_col + half, half),
    ]
    const [topLeft, topRight, bottomLeft, bottomRight] = children

    let isLeaf = false
    let value = true

    if (
      topLeft.isLeaf &&
      topRight.isLeaf &&
      bottomLeft.isLeaf &&
      bottomRight.isLeaf
    ) {
      if (
        topLeft.val == topRight.val &&
        topRight.val == bottomLeft.val &&
        bottomLeft.val == bottomRight.val
      ) {
        isLeaf = true
        value = topLeft.val
      }
    }

    if (isLeaf) children.fill(null)
    return new Node(value, isLeaf, ...children)
  }

  return createNode(0, 0, n)
}
