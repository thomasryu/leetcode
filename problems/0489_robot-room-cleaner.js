/*

You are controlling a robot that is located somewhere in a room.
The room is modeled as an m x n binary grid where 0 represents a wall and 1 represents an empty slot.

The robot starts at an unknown location in the room that is guaranteed to be empty,
and you do not have access to the grid, but you can move the robot using the given API Robot.

You are tasked to use the robot to clean the entire room (i.e., clean every empty cell in the room).
The robot with the four given APIs can move forward, turn left, or turn right. Each turn is 90 degrees.

When the robot tries to move into a wall cell, its bumper sensor detects the obstacle,
and it stays on the current cell.

Design an algorithm to clean the entire room using the following APIs:

  interface Robot {
    // returns true if next cell is open and robot moves into the cell.
    // returns false if next cell is obstacle and robot stays on the current cell.
    boolean move();

    // Robot will stay on the same cell after calling turnLeft/turnRight.
    // Each turn will be 90 degrees.
    void turnLeft();
    void turnRight();

    // Clean the current cell.
    void clean();
  }

Note that the initial direction of the robot will be facing up.
You can assume all four edges of the grid are all surrounded by a wall.

Custom testing:
  The input is only given to initialize the room and the robot's position internally.
  You must solve this problem "blindfolded". In other words, you must control the robot using only
  the four mentioned APIs without knowing the room layout and the initial robot's position.

Example 1:
  Input: room = [[1,1,1,1,1,0,1,1],[1,1,1,1,1,0,1,1],[1,0,1,1,1,1,1,1],[0,0,0,1,0,0,0,0],[1,1,1,1,1,1,1,1]],
    row = 1, col = 3
  Output: Robot cleaned all rooms.
  Explanation: All grids in the room are marked by either 0 or 1.
    0 means the cell is blocked, while 1 means the cell is accessible.
    The robot initially starts at the position of row=1, col=3.
    From the top left corner, its position is one row below and three columns right.

Example 2:
  Input: room = [[1]], row = 0, col = 0
  Output: Robot cleaned all rooms.

Constraints:
- m == room.length
- n == room[i].length
- 1 <= m <= 100
- 1 <= n <= 200
- room[i][j] is either 0 or 1.
- 0 <= row < m
- 0 <= col < n
- room[row][col] == 1
- All the empty cells can be visited from the starting position.

*/

var cleanRoom = function (robot) {
  const dp = Array(2 * 100)
    .fill()
    .map(() => Array(2 * 200).fill(0))
  const row_offset = 100
  const col_offset = 200

  // All possible moves, clockwise
  const facing_map = [
    [-1, 0], // top
    [0, 1], // right
    [1, 0], // bottom
    [0, -1], // left
  ]

  const dfs = (curr_row, curr_col, facing) => {
    robot.clean()
    dp[curr_row][curr_col] = 1

    for (let i = facing + 1; i < facing + 5; i++) {
      robot.turnLeft()
      const new_facing = i % 4
      const [delta_row, delta_col] = facing_map[new_facing]
      const [new_row, new_col] = [curr_row + delta_row, curr_col + delta_col]

      if (dp[new_row][new_col]) continue // Skip already visited

      if (robot.move()) {
        // Move to tile
        dfs(new_row, new_col, new_facing)

        // Backtrack
        robot.turnLeft()
        robot.turnLeft()
        robot.move()

        // Turn to previous facing
        robot.turnLeft()
        robot.turnLeft()
      }
    }
  }

  dfs(0 + row_offset, 0 + col_offset, 0)
}

// Saving space using a Set
var cleanRoom = function (robot) {
  const visited = new Set()

  // All possible moves, clockwise
  const facing_map = [
    [-1, 0], // top
    [0, 1], // right
    [1, 0], // bottom
    [0, -1], // left
  ]

  const dfs = (curr_row, curr_col, facing) => {
    robot.clean()
    visited.add(`${curr_row},${curr_col}`)

    for (let i = facing + 1; i < facing + 5; i++) {
      robot.turnLeft()
      const new_facing = i % 4
      const [delta_row, delta_col] = facing_map[new_facing]
      const [new_row, new_col] = [curr_row + delta_row, curr_col + delta_col]

      if (visited.has(`${new_row},${new_col}`)) continue // Skip already visited

      if (robot.move()) {
        // Move to tile
        dfs(new_row, new_col, new_facing)

        // Backtrack
        robot.turnLeft()
        robot.turnLeft()
        robot.move()

        // Turn to previous facing
        robot.turnLeft()
        robot.turnLeft()
      }
    }
  }

  dfs(0, 0, 0)
}
