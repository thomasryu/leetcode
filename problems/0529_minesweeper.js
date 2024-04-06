/*

Let's play the minesweeper game (Wikipedia, online game)!

You are given an m x n char matrix board representing the game board where:

- 'M' represents an unrevealed mine,
- 'E' represents an unrevealed empty square,
- 'B' represents a revealed blank square that has no adjacent mines (i.e., above, below, left, right, and all 4 diagonals),
- digit ('1' to '8') represents how many mines are adjacent to this revealed square, and
- 'X' represents a revealed mine.

You are also given an integer array click where click = [clickr, clickc]
represents the next click position among all the unrevealed squares ('M' or 'E').

Return the board after revealing this position according to the following rules:

- If a mine 'M' is revealed, then the game is over. You should change it to 'X'.
- If an empty square 'E' with no adjacent mines is revealed, then change it to a revealed blank 'B' and
  all of its adjacent unrevealed squares should be revealed recursively.
- If an empty square 'E' with at least one adjacent mine is revealed, then change it to a digit ('1' to '8')
  representing the number of adjacent mines.

Return the board when no more squares will be revealed.

Example 1:
  Input: board = [["E","E","E","E","E"],["E","E","M","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]], click = [3,0]
  Output: [["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]

Example 2:
  Input: board = [["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]], click = [1,2]
  Output: [["B","1","E","1","B"],["B","1","X","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]

Constraints:
- m == board.length
- n == board[i].length
- 1 <= m, n <= 50
- board[i][j] is either 'M', 'E', 'B', or a digit from '1' to '8'.
- click.length == 2
- 0 <= clickr < m
- 0 <= clickc < n
- board[clickr][clickc] is either 'M' or 'E'.

*/

var updateBoard = function (board, click) {
  const m = board.length
  const n = board[0].length

  function countAdjMines(i, j) {
    let mines = 0
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        if (di == 0 && dj == 0) continue
        const [ni, nj] = [i + di, j + dj]

        if (ni < 0 || ni >= m || nj < 0 || nj >= n) continue
        mines += board[ni][nj] == 'M' ? 1 : 0
      }
    }

    return mines
  }

  function reveal(i, j, propagate) {
    if (board[i][j] != 'E') return
    board[i][j] = 'P'

    let mines = countAdjMines(i, j)
    if (mines) {
      board[i][j] = mines + ''
      return
    }

    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        if (di == 0 && dj == 0) continue

        const [ni, nj] = [i + di, j + dj]
        if (ni < 0 || ni >= m || nj < 0 || nj >= n) continue
        reveal(ni, nj)
      }
    }

    board[i][j] = 'B'
    return 0
  }

  const [i, j] = click
  if (board[i][j] == 'M') board[i][j] = 'X'
  else reveal(i, j)

  return board
}
