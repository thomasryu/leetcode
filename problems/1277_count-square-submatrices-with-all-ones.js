/*

Given a m * n matrix of ones and zeros,
return how many square submatrices have all ones.

Example 1:
  Input: matrix =
    [
      [0,1,1,1],
      [1,1,1,1],
      [0,1,1,1]
    ]
  Output: 15
  Explanation:
    There are 10 squares of side 1.
    There are 4 squares of side 2.
    There is  1 square of side 3.
    Total number of squares = 10 + 4 + 1 = 15.

Example 2:
  Input: matrix =
    [
      [1,0,1],
      [1,1,0],
      [1,1,0]
    ]
  Output: 7
  Explanation:
    There are 6 squares of side 1.
    There is 1 square of side 2.
    Total number of squares = 6 + 1 = 7.

Constraints:
- 1 <= arr.length <= 300
- 1 <= arr[0].length <= 300
- 0 <= arr[i][j] <= 1

*/

var countSquares = function (matrix) {
  const m = matrix.length
  const n = matrix[0].length
  const dp = Array(m)
    .fill()
    .map(() => Array(n).fill(0))

  let result = 0

  for (let i = 0; i < m; i++) {
    dp[i][0] = matrix[i][0]
    result += dp[i][0]
  }
  for (let j = 1; j < n; j++) {
    dp[0][j] = matrix[0][j]
    result += dp[0][j]
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] == 0) continue
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
      result += dp[i][j]
    }
  }
  return result
}
