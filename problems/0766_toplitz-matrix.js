/*

Given an m x n matrix, return true if the matrix is Toeplitz. Otherwise, return false.

A matrix is Toeplitz if every diagonal from top-left to bottom-right has the same elements.

Example 1:
  Input: matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]
  Output: true
  Explanation:
    In the above grid, the diagonals are:
    "[9]", "[5, 5]", "[1, 1, 1]", "[2, 2, 2]", "[3, 3]", "[4]".
    In each diagonal all elements are the same, so the answer is True.

Example 2:
  Input: matrix = [[1,2],[2,2]]
  Output: false
  Explanation:
    The diagonal "[1, 2]" has different elements.

Constraints:
- m == matrix.length
- n == matrix[i].length
- 1 <= m, n <= 20
- 0 <= matrix[i][j] <= 99

Follow up:
- What if the matrix is stored on disk, and the memory is limited such that you can only load
  at most one row of the matrix into the memory at once?
- What if the matrix is so large that you can only load up a partial row into the memory at once?

*/

var isToeplitzMatrix = function (matrix) {
  const m = matrix.length
  const n = matrix[0].length

  const dp = Array(m)
    .fill()
    .map(() => Array(n).fill(false))
  for (let i = 0; i < m; i++) dp[i][0] = true
  for (let j = 1; j < n; j++) dp[0][j] = true

  for (let i = 1; i < m; i++)
    for (let j = 1; j < n; j++) {
      dp[i][j] =
        dp[i][j - 1] && dp[i - 1][j] && matrix[i][j] == matrix[i - 1][j - 1]
      if (!dp[i][j]) return false
    }

  return dp[m - 1][n - 1]
}
