/*

You are given an m x n grid where each cell can have one of three values:

- 0 representing an empty cell,
- 1 representing a fresh orange, or
- 2 representing a rotten orange.

Every minute, any fresh orange that is 4-directionally adjacent
to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until
no cell has a fresh orange. If this is impossible, return -1.

Example 1:
  Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
  Output: 4

Example 2:
  Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
  Output: -1
  Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten,
               because rotting only happens 4-directionally.

Example 3:
  Input: grid = [[0,2]]
  Output: 0
  Explanation: Since there are already no fresh oranges at minute 0,
               the answer is just 0.

Constraints:
- m == grid.length
- n == grid[i].length
- 1 <= m, n <= 10
- grid[i][j] is 0, 1, or 2.

*/

var orangesRotting = function (grid) {
  const m = grid.length
  const n = grid[0].length

  let queue = []
  let nextQueue = []

  let remaining = 0
  let result = 0

  const steps = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ]

  // Add all initially rotten oranges to the queue
  // and count the remaining fresh oranges
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == 1) remaining++
      else if (grid[i][j] == 2) queue.push([i, j])
    }

  while (queue.length && remaining > 0) {
    const [x, y] = queue.shift()

    for (let step of steps) {
      const [dx, dy] = step

      // If valid tile and its a fresh orange,
      // rot it and add it to the queue
      if (
        x + dx >= 0 &&
        x + dx < m &&
        y + dy >= 0 &&
        y + dy < n &&
        grid[x + dx][y + dy] == 1
      ) {
        grid[x + dx][y + dy] = 2
        nextQueue.push([x + dx, y + dy])
        remaining--
      }
    }

    if (queue.length == 0) {
      result++
      queue = nextQueue
      nextQueue = []
    }
  }

  // nextQueue.length is used just in case our loop is cut
  // without reaching the last result++ (because remaining reaches 0
  // before covering the entire current step)
  if (remaining == 0) return result + (nextQueue.length ? 1 : 0)
  return -1
}
