/*

Given a m x n grid filled with non-negative numbers,
find a path from top left to bottom right,
which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.

Example 1:
  Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
  Output: 7
  Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.

Example 2:
  Input: grid = [[1,2,3],[4,5,6]]
  Output: 12

Constraints:
- m == grid.length
- n == grid[i].length
- 1 <= m, n <= 200
- 0 <= grid[i][j] <= 200

*/

// BFS + DP solution
var minPathSum = function (grid) {
  const queue = [
    [0, 1],
    [1, 0],
  ]

  while (queue.length) {
    const [i, j] = queue.shift()
    if (i >= grid.length || j >= grid[0].length) continue

    const top = i > 0 ? grid[i - 1][j] : Infinity
    const left = j > 0 ? grid[i][j - 1] : Infinity
    grid[i][j] = grid[i][j] + Math.min(top, left)

    // We avoid duplicate calls by only pushing the
    // right tile when on the first row
    if (i == 0) queue.push([i, j + 1])
    queue.push([i + 1, j])
  }

  return grid[grid.length - 1][grid[0].length - 1]
}

// Iteractive + DP solution
var minPathSum = function (grid) {
  // Since the flow is top left to bottom right,
  // we don't even need to BFS, a simple 2D iteration will do
  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid[0].length; j++) {
      if (i == 0 && j == 0) continue

      const top = i > 0 ? grid[i - 1][j] : Infinity
      const left = j > 0 ? grid[i][j - 1] : Infinity
      grid[i][j] = grid[i][j] + Math.min(top, left)
    }

  return grid[grid.length - 1][grid[0].length - 1]
}

// Attempt made at 24/03/2024
var minPathSum = function (grid) {
  const m = grid.length
  const n = grid[0].length

  const dp = Array(m)
    .fill()
    .map(() => Array(n).fill())
  dp[0][0] = grid[0][0]

  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) {
      if (i == 0 && j == 0) continue

      if (i == 0) dp[i][j] = dp[i][j - 1] + grid[i][j]
      else if (j == 0) dp[i][j] = dp[i - 1][j] + grid[i][j]
      else dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
    }

  return dp[m - 1][n - 1]
}
