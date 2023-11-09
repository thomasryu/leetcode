/*

You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly.
DO NOT allocate another 2D matrix and do the rotation.

Example 1:
  Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
  Output: [[7,4,1],[8,5,2],[9,6,3]]

Example 2:
  Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
  Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

Constraints:
- n == matrix.length == matrix[i].length
- 1 <= n <= 20
- -1000 <= matrix[i][j] <= 1000

*/

var rotate = function (matrix) {
  const n = matrix.length

  // The logic here is to go through each layer of the matrix and perform layerLength rotation,
  // where layerLength is the size of the layer's side. Each of these rotaions include 4 transformations,
  // done at once (for example, each of the matrix's corners)

  // 1. For each layer of the matrix
  for (let layerLength = n; layerLength > 1; layerLength -= 2) {
    const layerLevel = (n - layerLength) / 2

    // 2. Rotate every element from each side of the 4 sides of the layer, 4 at a time
    for (let i = layerLevel; i < layerLevel + layerLength - 1; i++) {
      const temp = matrix[layerLevel][i]
      matrix[layerLevel][i] = matrix[n - i - 1][layerLevel]
      matrix[n - i - 1][layerLevel] = matrix[n - layerLevel - 1][n - i - 1]
      matrix[n - layerLevel - 1][n - i - 1] = matrix[i][n - layerLevel - 1]
      matrix[i][n - layerLevel - 1] = temp
    }
  }
}
