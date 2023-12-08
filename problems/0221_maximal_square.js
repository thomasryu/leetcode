/*

Given an m x n binary matrix filled with 0's and 1's,
find the largest square containing only 1's and return its area.

Example 1:
  Input: matrix = [["1","0","1","0","0"],
                   ["1","0","1","1","1"],
                   ["1","1","1","1","1"],
                   ["1","0","0","1","0"]]
  Output: 4

Example 2:
  Input: matrix = [["0","1"],
                   ["1","0"]]
  Output: 1

Example 3:
  Input: matrix = [["0"]]
  Output: 0

Constraints:
- m == matrix.length
- n == matrix[i].length
- 1 <= m, n <= 300
- matrix[i][j] is '0' or '1'.

*/

var maximalSquare = function (matrix) {
  const m = matrix.length
  const n = matrix[0].length

  // dp[i][j] returns me maximal square
  // that ends on matrix[i][j]
  const dp = Array(m)
    .fill()
    .map(() => Array(n).fill(0))

  let result = 0

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] == '1') {
        if (i == 0 || j == 0) dp[i][j] = matrix[i][j] == '1' ? 1 : 0
        // We check the maximal size achieved by the tiles above, to the left,
        // and to the top left, choose the smallest and add 1
        // Example of why whe need to check all three:
        // [ 0, 1 ]
        // [ 1, x ]  x = 1
        else
          dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
        result = Math.max(result, dp[i][j])
      }
    }
  }

  return result * result
}
