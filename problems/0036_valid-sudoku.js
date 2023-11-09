/*

Determine if a 9 x 9 Sudoku board is valid.
Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.

Note:
A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.

Constraints:
- board.length == 9
- board[i].length == 9
- board[i][j] is a digit 1-9 or '.'.

*/

var isValidSudoku = function (board) {
  const template = Array(9).fill(false)

  // Columns pass
  for (let column = 0; column < 9; column++) {
    const ruler = [...template]

    for (let row = 0; row < 9; row++) {
      if (board[row][column] == '.') continue

      const number = +board[row][column]
      if (ruler[number]) return false
      ruler[number] = true
    }
  }

  // Rows pass
  for (row = 0; row < 9; row++) {
    const ruler = [...template]

    for (column = 0; column < 9; column++) {
      if (board[row][column] == '.') continue

      const number = +board[row][column]
      if (ruler[number]) return false
      ruler[number] = true
    }
  }

  // Sub-box pass
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxColumn = 0; boxColumn < 3; boxColumn++) {
      const ruler = [...template]

      for (let row = boxRow * 3; row < boxRow * 3 + 3; row++) {
        for (let column = boxColumn * 3; column < boxColumn * 3 + 3; column++) {
          if (board[row][column] == '.') continue

          const number = +board[row][column]
          if (ruler[number]) return false
          ruler[number] = true
        }
      }
    }
  }

  return true
}
