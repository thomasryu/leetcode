/*

On an alphabet board, we start at position (0, 0),
corresponding to character board[0][0].

Here, board = ["abcde", "fghij", "klmno", "pqrst", "uvwxy", "z"],
as shown in the diagram below.

We may make the following moves:

- 'U' moves our position up one row, if the position exists on the board;
- 'D' moves our position down one row, if the position exists on the board;
- 'L' moves our position left one column, if the position exists on the board;
- 'R' moves our position right one column, if the position exists on the board;
-  '!' adds the character board[r][c] at our current position (r, c) to the answer.

(Here, the only positions that exist on the board are positions with letters on them.)
Return a sequence of moves that makes our answer equal to target in the minimum number of moves.
You may return any path that does so.

Example 1:
  Input: target = "leet"
  Output: "DDR!UURRR!!DDD!"

Example 2:
  Input: target = "code"
  Output: "RR!DDRR!UUL!R!"

Constraints:
- 1 <= target.length <= 100
- target consists only of English lowercase letters.

*/

var alphabetBoardPath = function (target) {
  const board = ['abcde', 'fghij', 'klmno', 'pqrst', 'uvwxy', 'z']
  const letter_coords = {}

  let result = ''

  for (let i = 0; i < board.length; i++)
    for (let j = 0; j < board[0].length; j++) if (board[i] && board[i][j]) letter_coords[board[i][j]] = [i, j]

  let current = [0, 0]
  for (let letter of target) {
    const [curr_row, curr_col] = current
    const [next_row, next_col] = letter_coords[letter]

    const delta_row = curr_row - next_row
    const delta_col = curr_col - next_col

    if (delta_col > 0) result += 'L'.repeat(delta_col)
    if (delta_row > 0) result += 'U'.repeat(delta_row)
    if (delta_col < 0) result += 'R'.repeat(-delta_col)
    if (delta_row < 0) result += 'D'.repeat(-delta_row)

    current = [next_row, next_col]
    result += '!'
  }

  return result
}
