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
