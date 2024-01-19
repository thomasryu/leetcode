/*

Given an n x n array of integers matrix,
return the minimum sum of any falling path through matrix.

A falling path starts at any element in the first row and chooses the element
in the next row that is either directly below or diagonally left/right.
Specifically, the next element from position (row, col) will be
(row + 1, col - 1), (row + 1, col), or (row + 1, col + 1).

Example 1:
  Input: matrix = [[2,1,3],[6,5,4],[7,8,9]]
  Output: 13
  Explanation: There are two falling paths with a minimum sum as shown.

Example 2:
  Input: matrix = [[-19,57],[-40,-5]]
  Output: -59
  Explanation: The falling path with a minimum sum is shown.

Constraints:
- n == matrix.length == matrix[i].length
- 1 <= n <= 100
- -100 <= matrix[i][j] <= 100

*/

var minFallingPathSum = function (matrix) {
  const m = matrix.length
  const n = matrix[0].length
  const previous = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ]

  const dp = Array(m)
    .fill()
    .map(() => Array(n).fill(Infinity))

  for (let j = 0; j < n; j++) dp[0][j] = matrix[0][j]

  for (let i = 1; i < m; i++)
    for (let j = 0; j < n; j++) {
      for (let [di, dj] of previous) {
        if (j + dj < 0 || j + dj >= n) continue
        dp[i][j] = Math.min(dp[i][j], matrix[i][j] + dp[i + di][j + dj])
      }
    }

  return Math.min(...dp[m - 1])
}
