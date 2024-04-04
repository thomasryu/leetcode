/*

Given an m x n grid of characters board and a string word,
return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells,
where adjacent cells are horizontally or vertically neighboring.
The same letter cell may not be used more than once.

Example 1:
  Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
  Output: true

Example 2:
  Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
  Output: true

Example 3:
  Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
  Output: false

Constraints:
- m == board.length
- n = board[i].length
- 1 <= m, n <= 6
- 1 <= word.length <= 15
- board and word consists of only lowercase and uppercase English letters.

Follow up: Could you use search pruning to make your solution faster with a larger board?

*/

var exist = function (board, word) {
  const search = (i, j, start) => {
    if (start == word.length) return true
    if (i < 0 || j < 0 || i >= board.length || j >= board[0].length)
      return false
    if (board[i][j] != word[start]) return false

    // At this point, the current tile has
    // the next letter of word

    const letter = board[i][j]
    board[i][j] = '0' // Mark as visited

    for (let cardinal of [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]) {
      const [x, y] = cardinal
      if (search(i + x, j + y, start + 1)) return true
    }

    board[i][j] = letter // Backtrack
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (search(i, j, 0)) return true
    }
  }

  return false
}

// Attempt made at 03/04/2024
var exist = function (board, word) {
  const m = board.length
  const n = board[0].length
  const steps = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ]

  const visited = new Set()

  const dfs = (i, j, index) => {
    if (index == word.length - 1) return true

    let result = false
    for (let [di, dj] of steps) {
      const ni = i + di
      const nj = j + dj

      if (ni < 0 || ni >= m || nj < 0 || nj >= n) continue
      if (board[ni][nj] != word[index + 1]) continue

      const key = `${ni},${nj}`
      if (visited.has(key)) continue
      visited.add(key)
      result = result || dfs(ni, nj, index + 1)
      visited.delete(key)
    }

    return result
  }

  let result = false
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) {
      if (board[i][j] != word[0]) continue

      const key = `${i},${j}`
      visited.add(key)
      result = result || dfs(i, j, 0)
      visited.delete(key)
    }

  return result
}

// Attempt made at 03/04/2024
var exist = function (board, word) {
  const m = board.length
  const n = board[0].length
  const steps = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ]

  const dfs = (i, j, index) => {
    if (index == word.length) return true
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] != word[index])
      return false

    const letter = board[i][j]
    board[i][j] = '0' // Mark as "visisted"

    let result = false
    for (let [di, dj] of steps) {
      const [ni, nj] = [i + di, j + dj]
      result = result || dfs(ni, nj, index + 1)
    }

    board[i][j] = letter // Backtrack
    return result
  }

  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) if (dfs(i, j, 0)) return true

  return false
}
