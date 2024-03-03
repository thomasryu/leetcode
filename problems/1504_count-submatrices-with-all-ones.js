/*

Given an m x n binary matrix mat,
return the number of submatrices that have all ones.

Example 1:
  Input: mat = [[1,0,1],[1,1,0],[1,1,0]]
  Output: 13
  Explanation:
      There are 6 rectangles of side 1x1.
      There are 2 rectangles of side 1x2.
      There are 3 rectangles of side 2x1.
      There is 1 rectangle of side 2x2.
      There is 1 rectangle of side 3x1.
      Total number of rectangles = 6 + 2 + 3 + 1 + 1 = 13.

Example 2:
  Input: mat = [[0,1,1,0],[0,1,1,1],[1,1,1,0]]
  Output: 24
  Explanation:
    There are 8 rectangles of side 1x1.
    There are 5 rectangles of side 1x2.
    There are 2 rectangles of side 1x3.
    There are 4 rectangles of side 2x1.
    There are 2 rectangles of side 2x2.
    There are 2 rectangles of side 3x1.
    There is 1 rectangle of side 3x2.
    Total number of rectangles = 8 + 5 + 2 + 4 + 2 + 2 + 1 = 24.

Constraints:
- 1 <= m, n <= 150
- mat[i][j] is either 0 or 1.

*/

var numSubmat = function (mat) {
  let submatrices = 0

  // Store the cumulative number of consecutive 1's of each row
  // in the matrix itself (e.g. a [0, 1, 1, 0, 1] becomes [0, 1, 2, 0, 1])
  for (let i = 0; i < mat.length; i++)
    for (let j = 0; j < mat[0].length; j++) mat[i][j] += mat[i][j] ? mat[i][j - 1] || 0 : 0

  // From the element upwards, count the submatrices that end in the element
  for (let i = 0; i < mat.length; i++)
    for (let j = 0; j < mat[0].length; j++) {
      let max_submatrix_width = Infinity
      for (let k = i; k >= 0 && max_submatrix_width > 0; k--) {
        len = Math.min(max_submatrix_width, mat[k][j])
        submatrices += max_submatrix_width
      }
    }

  return submatrices
}
