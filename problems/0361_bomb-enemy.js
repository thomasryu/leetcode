/*

Given an m x n matrix grid where each cell is either a wall 'W', an enemy 'E' or empty '0',
return the maximum enemies you can kill using one bomb. You can only place the bomb in an empty cell.

The bomb kills all the enemies in the same row and column from the planted point until
it hits the wall since it is too strong to be destroyed.

Example 1:
  Input: grid = [["0","E","0","0"],["E","0","W","E"],["0","E","0","0"]]
  Output: 3

Example 2:
  Input: grid = [["W","W","W"],["0","0","0"],["E","E","E"]]
  Output: 1

Constraints:
- m == grid.length
- n == grid[i].length
- 1 <= m, n <= 500
- grid[i][j] is either 'W', 'E', or '0'.

*/

// Inneficient O(M * N * 4) DFS solution
var maxKilledEnemies = function (grid) {
  const m = grid.length
  const n = grid[0].length

  // dp[i][j]
  //   0: enemies above
  //   1: enemies to the right
  //   2: enemies to the bottom
  //   3: enemies to the left

  //   (ALl of the above include the enemy on
  //   grid[i][j] if there is one)

  //   4: the sum of all direction
  const dp = Array(m)
    .fill()
    .map(() =>
      Array(n)
        .fill()
        .map(() => Array(5))
    )
  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]

  const dfs = (i, j, dir) => {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == 'W') return 0
    if (dp[i][j][dir]) return dp[i][j][dir]

    let curr_tile = grid[i][j] == 'E' ? 1 : 0

    if (dir < 4) {
      const [di, dj] = dirs[dir]
      const [ni, nj] = [i + di, j + dj]
      const result = dfs(ni, nj, dir)
      return (dp[i][j][dir] = result + curr_tile)
    }

    let sum = 0
    for (let k = 0; k < 4; k++) {
      const [di, dj] = dirs[k]
      const [ni, nj] = [i + di, j + dj]

      const result = dfs(ni, nj, k)

      sum += result
      dp[i][j][dir] = result + curr_tile
    }
    return (dp[i][j][4] = sum + curr_tile)
  }

  let result = 0
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) {
      if (grid[i][j] != '0') continue
      result = Math.max(result, dfs(i, j, 4))
    }
  return result
}

// Optimal O(M * N * 3) DP solution
var maxKilledEnemies = function (grid) {
  const m = grid.length
  const n = grid[0].length

  let row_hits = 0
  let col_hits = Array(n).fill(0)

  let result = 0

  for (let i = 0; i < m; i++) {
    row_hits = 0

    for (let j = 0; j < n; j++) {
      if (grid[i][j] == 'W') {
        row_hits = 0
        col_hits[j] = 0
        continue
      }

      // Check how many enemies are within row i's reach
      if (row_hits == 0) {
        for (let k = j; k < n; k++) {
          if (grid[i][k] == 'W') break
          if (grid[i][k] == 'E') row_hits++
        }
      }

      // Check how many enemies are within col j's reach
      if (col_hits[j] == 0) {
        for (let k = i; k < m; k++) {
          if (grid[k][j] == 'W') break
          if (grid[k][j] == 'E') col_hits[j] += 1
        }
      }

      if (grid[i][j] == '0') result = Math.max(result, row_hits + col_hits[j])
    }
  }

  return result
}
