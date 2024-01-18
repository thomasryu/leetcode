/*

On an 2 x 3 board, there are five tiles labeled from 1 to 5, and an empty square represented by 0.
A move consists of choosing 0 and a 4-directionally adjacent number and swapping it.

The state of the board is solved if and only if the board is [[1,2,3],[4,5,0]].

Given the puzzle board board, return the least number of moves required so that the state of the board is solved.
If it is impossible for the state of the board to be solved, return -1.

Example 1:
  Input: board = [[1,2,3],[4,0,5]]
  Output: 1
  Explanation: Swap the 0 and the 5 in one move.

Example 2:
  Input: board = [[1,2,3],[5,4,0]]
  Output: -1
  Explanation: No number of moves will make the board solved.

Example 3:
  Input: board = [[4,1,2],[5,0,3]]
  Output: 5
  Explanation: 5 is the smallest number of moves that solves the board.
    An example path:
    After move 0: [[4,1,2],[5,0,3]]
    After move 1: [[4,1,2],[0,5,3]]
    After move 2: [[0,1,2],[4,5,3]]
    After move 3: [[1,0,2],[4,5,3]]
    After move 4: [[1,2,0],[4,5,3]]
    After move 5: [[1,2,3],[4,5,0]]

Constraints:
- board.length == 2
- board[i].length == 3
- 0 <= board[i][j] <= 5
- Each value board[i][j] is unique.

*/

// Unoptimized DFS + backtracking solution
var slidingPuzzle = function (board) {
  const answer = '123450'
  const moves = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]
  const visited = new Map()

  let zero_i
  let zero_j
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 6; j++)
      if (board[i][j] == 0) {
        zero_i = i
        zero_j = j
      }

  const key = board.flat().join('')
  if (key == answer) return 0
  visited.set(key, 0)

  const test = (curr_board, curr_moves, zero_i, zero_j) => {
    let min_moves = Infinity
    for (let [di, dj] of moves) {
      const new_i = zero_i + di
      const new_j = zero_j + dj

      if (new_i < 0 || new_j < 0 || new_i >= 2 || new_j >= 3) continue

      curr_board[zero_i][zero_j] = curr_board[new_i][new_j]
      curr_board[new_i][new_j] = 0

      const key = curr_board.flat().join('')
      if (!visited.has(key) || visited.get(key) > curr_moves + 1) {
        visited.set(key, curr_moves + 1)
        min_moves = Math.min(min_moves, test(curr_board, curr_moves + 1, new_i, new_j))
      }

      curr_board[new_i][new_j] = curr_board[zero_i][zero_j]
      curr_board[zero_i][zero_j] = 0

      if (key == answer) return curr_moves + 1
    }

    return min_moves
  }

  const result = test(board, 0, zero_i, zero_j)
  return result == Infinity ? -1 : result
}

// Optimized BFS solution
var slidingPuzzle = function (board) {
  const answer = '123450'
  const starting_board = board.map((row) => row.join('')).join('')

  // Imagine our board converted to a 6-character string
  // moves[i] gives me the possible positions where a number 0
  // at index i can go (e.g. '012345' can only convert to '102345' or '312045')
  const moves = {
    0: [1, 3],
    1: [0, 2, 4],
    2: [1, 5],
    3: [0, 4],
    4: [1, 3, 5],
    5: [2, 4],
  }

  const visited = new Set()
  visited.add(starting_board)

  // 0: current board state as a string
  // 1: current index of 0
  // 2: current moves
  let queue = [[starting_board, starting_board.indexOf('0'), 0]]

  while (queue.length) {
    const [curr_board, zero_from, curr_moves] = queue.shift()
    if (curr_board == answer) return curr_moves

    for (let zero_to of moves[zero_from]) {
      const new_board = swap(curr_board, zero_from, zero_to)
      if (visited.has(new_board)) continue
      visited.add(new_board)
      queue.push([new_board, zero_to, curr_moves + 1])
    }
  }

  return -1
}
const swap = (board, from, to) => {
  const array = board.split('')
  ;[array[from], array[to]] = [array[to], array[from]]
  return array.join('')
}
