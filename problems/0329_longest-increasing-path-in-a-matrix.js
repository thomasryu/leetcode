// Unoptimized BFS solution
var longestIncreasingPath = function (matrix) {
  const m = matrix.length
  const n = matrix[0].length

  const moves = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]

  let queue = []
  let new_queue = []

  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) {
      let is_candidate = true

      for (let [di, dj] of moves) {
        if (i + di < 0 || i + di >= m || j + dj < 0 || j + dj >= n) continue
        if (matrix[i + di][j + dj] < matrix[i][j]) {
          is_candidate = false
          break
        }
      }

      if (is_candidate) queue.push([i, j])
    }

  let result = 1
  while (queue.length) {
    const [i, j] = queue.shift()

    for (let [di, dj] of moves) {
      if (i + di < 0 || i + di >= m || j + dj < 0 || j + dj >= n) continue
      if (matrix[i + di][j + dj] > matrix[i][j]) new_queue.push([i + di, j + dj])
    }

    if (queue.length == 0 && new_queue.length > 0) {
      result++
      queue = new_queue
      new_queue = []
    }
  }

  return result
}

// Optimized DP + DFS solution
var longestIncreasingPath = function (matrix) {
  const m = matrix.length
  const n = matrix[0].length

  const moves = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]

  // dp[i][j] gives me the longest increasing path
  // that starts from matrix[i][j]
  const dp = Array(m)
    .fill()
    .map(() => Array(n).fill(0))

  // Our DFS, which navigates through each adjacent not whose
  // value is lower than matrix[i][j], finds the longest one,
  // and sets dp[i][j] as (longest_adjacent + 1)
  const dfs = (i, j) => {
    let highest_value = true

    for (let [di, dj] of moves) {
      // Invalid tile
      if (i + di < 0 || i + di >= m || j + dj < 0 || j + dj >= n) continue

      // For each adjacent
      if (matrix[i + di][j + dj] > matrix[i][j]) {
        highest_value = false
        if (dp[i + di][j + dj] > 0) dp[i][j] = Math.max(dp[i][j], dp[i + di][j + dj] + 1)
        else dp[i][j] = Math.max(dp[i][j], dfs(i + di, j + dj) + 1)
      }
    }

    if (highest_value) dp[i][j] = 1
    return dp[i][j]
  }

  // Perform a DFS starting from each tile
  let result = 0
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) {
      if (dp[i][j] > 0) result = Math.max(result, dp[i][j])
      else result = Math.max(result, dfs(i, j))
    }

  return result
}
