/*

There is an m x n grid with a ball. The ball is initially at the position [startRow, startColumn].
You are allowed to move the ball to one of the four adjacent cells in the grid
(possibly out of the grid crossing the grid boundary). You can apply at most maxMove moves to the ball.

Given the five integers m, n, maxMove, startRow, startColumn,
return the number of paths to move the ball out of the grid boundary.
Since the answer can be very large, return it modulo 109 + 7.

Example 1:
  Input: m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0
  Output: 6

Example 2:
  Input: m = 1, n = 3, maxMove = 3, startRow = 0, startColumn = 1
  Output: 12

Constraints:
- 1 <= m, n <= 50
- 0 <= maxMove <= 50
- 0 <= startRow < m
- 0 <= startColumn < n

*/

var findPaths = function (m, n, maxMove, startRow, startColumn) {
  // dp[i][j][k] gives me the ways to go out of bounds starting
  // from position [i, j], with k moves left (considering 0 is also a possibility)
  const dp = Array(m)
    .fill()
    .map(() =>
      Array(n)
        .fill()
        .map(() => Array(maxMove).fill(-1))
    )
  const cardinals = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
  ]
  const modulo = Math.pow(10, 9) + 7

  const dfs = (i, j, moves) => {
    if (moves == 0) return 0
    if (dp[i][j][moves - 1] >= 0) return dp[i][j][moves - 1]

    let out_of_bounds = 0
    dp[i][j][moves - 1] = 0

    for (let [di, dj] of cardinals) {
      const [row, col] = [i + di, j + dj]
      if (row < 0 || col < 0 || row >= m || col >= n) {
        out_of_bounds++
        continue
      }

      dp[i][j][moves - 1] += dfs(row, col, moves - 1)
    }
    dp[i][j][moves - 1] += out_of_bounds
    dp[i][j][moves - 1] = dp[i][j][moves - 1] % modulo
    return dp[i][j][moves - 1]
  }

  const result = dfs(startRow, startColumn, maxMove)
  return result
}
