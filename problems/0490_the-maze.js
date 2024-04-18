/*

There is a ball in a maze with empty spaces (represented as 0) and walls (represented as 1).
The ball can go through the empty spaces by rolling up, down, left or right,
but it won't stop rolling until hitting a wall. When the ball stops, it could choose the next direction.

Given the m x n maze, the ball's start position and the destination, where start = [startrow, startcol]
and destination = [destinationrow, destinationcol], return true if the ball can stop at the destination,
otherwise return false.

You may assume that the borders of the maze are all walls (see examples).

Example 1:
  Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [4,4]
  Output: true
  Explanation: One possible way is : left -> down -> left -> down -> right -> down -> right.

Example 2:
  Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [3,2]
  Output: false
  Explanation: There is no way for the ball to stop at the destination.
    Notice that you can pass through the destination but you cannot stop there.

Example 3:
  Input: maze = [[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], start = [4,3], destination = [0,1]
  Output: false

Constraints:
- m == maze.length
- n == maze[i].length
- 1 <= m, n <= 100
- maze[i][j] is 0 or 1.
- start.length == 2
- destination.length == 2
- 0 <= startrow, destinationrow <= m
- 0 <= startcol, destinationcol <= n
- Both the ball and the destination exist in an empty space,
    and they will not be in the same position initially.
- The maze contains at least 2 empty spaces.

*/

var hasPath = function (maze, start, destination) {
  const m = maze.length
  const n = maze[0].length

  const directions = ['up', 'right', 'down', 'left']
  const rollBall = (start, direction) => {
    const map = {
      up: [-1, 0],
      right: [0, 1],
      down: [1, 0],
      left: [0, -1],
    }
    let [i, j] = start
    const [di, dj] = map[direction]

    while (
      i + di >= 0 &&
      i + di < m &&
      j + dj >= 0 &&
      j + dj < n &&
      maze[i + di][j + dj] != 1
    )
      [i, j] = [i + di, j + dj]

    return [i, j]
  }

  const queue = [start]
  maze[start[0]][start[1]] = -1
  while (queue.length) {
    const [i, j] = queue.shift()
    if (i == destination[0] && j == destination[1]) return true

    for (const direction of directions) {
      const [ni, nj] = rollBall([i, j], direction)

      if (maze[ni][nj] == -1) continue
      maze[ni][nj] = -1

      queue.push([ni, nj])
    }
  }

  return false
}
