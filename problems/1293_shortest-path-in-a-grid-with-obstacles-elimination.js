/*

You are given an m x n integer matrix grid where each cell is either 0 (empty) or 1 (obstacle).
You can move up, down, left, or right from and to an empty cell in one step.

Return the minimum number of steps to walk from the upper left corner (0, 0)
to the lower right corner (m - 1, n - 1) given that you can eliminate at most k obstacles.
If it is not possible to find such walk return -1.

Example 1:
  Input: grid = [[0,0,0],[1,1,0],[0,0,0],[0,1,1],[0,0,0]], k = 1
  Output: 6
  Explanation:
    The shortest path without eliminating any obstacle is 10.
    The shortest path with one obstacle elimination at position (3,2) is 6.
      Such path is (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2) -> (3,2) -> (4,2).

Example 2:
  Input: grid = [[0,1,1],[1,1,1],[1,0,0]], k = 1
  Output: -1
  Explanation: We need to eliminate at least two obstacles to find such a walk.

Constraints:
- m == grid.length
- n == grid[i].length
- 1 <= m, n <= 40
- 1 <= k <= m * n
- grid[i][j] is either 0 or 1.
- grid[0][0] == grid[m - 1][n - 1] == 0

*/

var shortestPath = function (grid, breaks) {
  const m = grid.length
  const n = grid[0].length

  const moves = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]
  const visited = new Set()

  let queue = [[0, 0, breaks]]
  let new_queue = []

  visited.add(`0,0,${breaks}`)

  let result = 0
  let reached = false

  while (queue.length) {
    const [i, j, k] = queue.shift()
    if (i == m - 1 && j == n - 1) {
      reached = true
      break
    }

    for (let [di, dj] of moves) {
      const row = i + di
      const col = j + dj
      const key = `${row},${col},${k}`

      if (row < 0 || col < 0 || row >= m || col >= n || visited.has(key)) continue
      visited.add(key)

      if (grid[row][col] == 1 && k > 0) new_queue.push([row, col, k - 1])
      else if (grid[row][col] == 0) new_queue.push([row, col, k])
    }

    if (queue.length == 0) {
      result++
      queue = new_queue
      new_queue = []
    }
  }

  return reached ? result : -1
}
