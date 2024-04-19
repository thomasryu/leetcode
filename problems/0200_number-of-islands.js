/*

Given an m x n 2D binary grid grid which represents a map of
'1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
You may assume all four edges of the grid are all surrounded by water.

Example 1:
  Input: grid = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
  ]
  Output: 1

Example 2:
  Input: grid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
  ]
  Output: 3

Constraints:
- m == grid.length
- n == grid[i].length
- 1 <= m, n <= 300
- grid[i][j] is '0' or '1'.


Reference:

[i-1, j-1] [i-1, j] [i-1, j+1]
[i,   j-1] [i,   j] [i,   j+1]
[i+1, j-1] [i+1, j] [i+1, j+1]

*/

// Stack solution
var numIslands = function (grid) {
  let result = 0
  const stack = []

  const m = grid.length // Rows
  const n = grid[0].length // Columns

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 1. For each island tile
      if (grid[i][j] == '1') {
        result++
        stack.push([i, j])

        // 2. We save all iteractively save all adjacent
        //    island tiles in the stack and mark it entirely
        //    as already visited
        while (stack.length > 0) {
          const [i, j] = stack.pop()
          grid[i][j] = 'x'

          // North
          if (i - 1 >= 0) {
            if (grid[i - 1][j] == '1') stack.push([i - 1, j])
          }
          // South
          if (i + 1 < m) {
            if (grid[i + 1][j] == '1') stack.push([i + 1, j])
          }
          // West
          if (j - 1 >= 0) {
            if (grid[i][j - 1] == '1') stack.push([i, j - 1])
          }
          // East
          if (j + 1 < n) {
            if (grid[i][j + 1] == '1') stack.push([i, j + 1])
          }
        }
      }
    }
  }

  return result
}

// Recursive solution (Depth-first Search)
var numIslands = function (grid) {
  let result = 0

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == '1') {
        dfs(i, j, grid)
        result++
      }
    }
  }

  return result
}
var dfs = function (i, j, grid) {
  if (
    i < 0 ||
    j < 0 ||
    i >= grid.length ||
    j >= grid[0].length ||
    grid[i][j] == 0
  )
    return // Out of bounds or ocean tile

  grid[i][j] = '0'
  dfs(i - 1, j, grid) // North
  dfs(i + 1, j, grid) // South
  dfs(i, j + 1, grid) // East
  dfs(i, j - 1, grid) // West
}

// Attempt made at 19/04/2024
var numIslands = function (grid) {
  const m = grid.length
  const n = grid[0].length

  const sink_island = (i, j) => {
    grid[i][j] = '0'

    const steps = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]
    for (let [di, dj] of steps) {
      const [ni, nj] = [i + di, j + dj]
      if (ni < 0 || ni >= m || nj < 0 || nj >= n || grid[ni][nj] != '1')
        continue
      sink_island(ni, nj)
    }
  }

  let result = 0
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++)
      if (grid[i][j] == '1') {
        result++
        sink_island(i, j)
      }
  return result
}
