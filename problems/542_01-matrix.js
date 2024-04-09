/*

Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.
The distance between two adjacent cells is 1.

Example 1:
  Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
  Output: [[0,0,0],[0,1,0],[0,0,0]]

Example 2:
  Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
  Output: [[0,0,0],[0,1,0],[1,2,1]]

Constraints:
- m == mat.length
- n == mat[i].length
- 1 <= m, n <= 104
- 1 <= m * n <= 104
- mat[i][j] is either 0 or 1.
- There is at least one 0 in mat.

*/

// Failed BFS attempts (it doesn't work)
var updateMatrix = function (mat) {
  const m = mat.length
  const n = mat[0].length

  const dp = Array(m)
    .fill()
    .map(() => Array(n).fill(Infinity))
  const moves = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]

  const visited = new Set()

  const dfs = (i, j) => {
    if (dp[i][j] < Infinity) return dp[i][j]

    if (mat[i][j] == 0) {
      dp[i][j] = 0
      return 0
    }

    let min = Infinity
    for (let [di, dj] of moves) {
      const [ni, nj] = [i + di, j + dj]
      const key = `${ni},${nj}`

      if (ni < 0 || ni >= m || nj < 0 || nj >= n) continue
      if (visited.has(key)) continue

      visited.add(key)
      min = Math.min(min, dfs(ni, nj))
      visited.delete(key)
    }

    dp[i][j] = min + 1
    return dp[i][j]
  }

  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) {
      const key = `${i},${j}`
      visited.add(key)
      dfs(i, j)
      visited.delete(key)
    }

  return dp
}

// BFS solution
var updateMatrix = function (mat) {
  const m = mat.length
  const n = mat[0].length

  const moves = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]
  const queue = []

  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) {
      if (mat[i][j] == 0) {
        queue.push([i, j])
        mat[i][j] = 0
      } else mat[i][j] = Infinity
    }

  while (queue.length) {
    const [i, j] = queue.shift()

    for (let [di, dj] of moves) {
      const [ni, nj] = [i + di, j + dj]
      if (
        ni < 0 ||
        ni >= m ||
        nj < 0 ||
        nj >= n ||
        mat[ni][nj] <= mat[i][j] + 1
      )
        continue
      mat[ni][nj] = mat[i][j] + 1
      queue.push([ni, nj])
    }
  }

  return mat
}

// Attempt made at 09/04/2024
var updateMatrix = function (mat) {
  const m = mat.length
  const n = mat[0].length

  const max_distance = m * n
  const queue = []

  const steps = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]

  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) {
      if (mat[i][j]) mat[i][j] = max_distance
      else queue.push([i, j])
    }

  while (queue.length) {
    const [i, j] = queue.shift()
    const val = mat[i][j]

    for (let [di, dj] of steps) {
      const [ni, nj] = [i + di, j + dj]

      if (ni < 0 || ni >= m || nj < 0 || nj >= n) continue
      if (val + 1 >= mat[ni][nj]) continue

      mat[ni][nj] = val + 1
      queue.push([ni, nj])
    }
  }

  return mat
}
