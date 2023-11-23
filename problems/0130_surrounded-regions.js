/*

Given an m x n matrix board containing 'X' and 'O',
capture all regions that are 4-directionally surrounded by 'X'.

A region is captured by flipping all 'O's into 'X's in that surrounded region.

Example 1:
  Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
  Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
  Explanation: Notice that an 'O' should not be flipped if:
               - It is on the border, or
               - It is adjacent to an 'O' that should not be flipped.
               The bottom 'O' is on the border, so it is not flipped.
               The other three 'O' form a surrounded region, so they are flipped.

Example 2:
  Input: board = [["X"]]
  Output: [["X"]]

Constraints:
- m == board.length
- n == board[i].length
- 1 <= m, n <= 200
- board[i][j] is 'X' or 'O'.

*/

var solve = function (board) {
  const m = board.length
  const n = board[0].length

  // We do a first pass through the four corners
  // of the board, marking all 'O' corner tiles
  // and connecting ones as 'S' (safe)
  for (let i = 0; i < m; i++) {
    // Checks first and last columns for 'O'
    if (board[i][0] == 'O') dfs(i, 0, board)
    if (n - 1 != 0 && board[i][n - 1] == 'O') dfs(i, n - 1, board)
  }
  for (let j = 1; j < n - 1; j++) {
    // Checks first and last rows for 'O'
    if (board[0][j] == 'O') dfs(0, j, board)
    if (m - 1 > 0 && board[m - 1][j] == 'O') dfs(m - 1, j, board)
  }

  // Then we iterate over the entire board
  // and mark any non safe tile as 'X' and safe
  // tiles back to 'O'
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      board[i][j] = board[i][j] == 'S' ? 'O' : 'X'
    }
  }
}

var dfs = function (i, j, board) {
  if (
    i < 0 ||
    j < 0 ||
    i >= board.length ||
    j >= board[0].length ||
    board[i][j] != 'O'
  )
    return // Out of bounds or non 'O' tile

  board[i][j] = 'S'
  dfs(i - 1, j, board) // North
  dfs(i + 1, j, board) // South
  dfs(i, j + 1, board) // East
  dfs(i, j - 1, board) // West
}
