/*

You are given an n x n grid representing a field of cherries,
each cell is one of three possible integers.

-0 means the cell is empty, so you can pass through,
-1 means the cell contains a cherry that you can pick up and pass through, or
- -1 means the cell contains a thorn that blocks your way.

Return the maximum number of cherries you can collect by following the rules below:

Starting at the position (0, 0) and reaching (n - 1, n - 1) by moving right
or down through valid path cells (cells with value 0 or 1).
After reaching (n - 1, n - 1), returning to (0, 0) by moving left or up through valid path cells.
When passing through a path cell containing a cherry, you pick it up, and the cell becomes an empty cell 0.
If there is no valid path between (0, 0) and (n - 1, n - 1), then no cherries can be collected.

Example 1:
  Input: grid = [[0,1,-1],[1,0,-1],[1,1,1]]
  Output: 5
  Explanation:
    The player started at (0, 0) and went down, down, right right to reach (2, 2).
    4 cherries were picked up during this single trip, and the matrix becomes [[0,1,-1],[0,0,-1],[0,0,0]].
    Then, the player went left, up, up, left to return home, picking up one more cherry.
    The total number of cherries picked up is 5, and this is the maximum possible.

Example 2:
  Input: grid = [[1,1,-1],[1,-1,1],[-1,1,1]]
  Output: 0

Constraints:
- n == grid.length
- n == grid[i].length
- 1 <= n <= 50
- grid[i][j] is -1, 0, or 1.
- grid[0][0] != -1
- grid[n - 1][n - 1] != -1

*/

// Unoptimized top down DP solution
var cherryPickup = function (grid) {
  const n = grid.length

  // Counting cherries from top left to bottom right them bottom right
  // to top left is the same as counting two different people going top to
  // bottom at the same time through different paths but the same board.

  // Notice at a certain step t, the number of times you go down i and
  // right j sum up to t, i.e. t = i + j

  // So if we want to keep track of the coordinates of two people going
  // through the cherry board we don't need 4 coordinates such as
  // i1, j1, i2, j2, but only 3, because i1 + j1 = i2 + j2, so for example,
  // we can infer i2 by calculating i2 = i1 + j1 - j2

  // This saves us from using a 4D dp data structure to a 3D one.

  // dp[i1][j1][j2] gives me the highest amount of cherries picked by
  // two people, starting from positions [i1, j1] and [i2, j2] ending at
  // positions [n - 1, n - 1] where i2 = i1 + j1 - j2.
  const dp = Array(n)
    .fill()
    .map(() =>
      Array(n)
        .fill()
        .map(() => Array(n).fill(-1))
    )

  const pick = (i1, j1, j2) => {
    const i2 = i1 + j1 - j2

    // Out of boundaries or unreachable tile
    if (i1 == n || i2 == n || j1 == n || j2 == n || grid[i1][j1] == -1 || grid[i2][j2] == -1) return -Infinity
    // Our default state, both reached the final tile
    if (i1 == n - 1 && j1 == n - 1) return grid[i1][j1]
    // Already calculated value before
    else if (dp[i1][j1][j2] > -1) return dp[i1][j1][j2]
    else {
      // 1. Add the cherry from the current tile for each person
      let picked = grid[i1][j1]
      if (j1 != j2) picked += grid[i2][j2] // They cannot pick cherries from the same tile

      // 2. Add the maximum picked from the possible next states
      picked += Math.max(
        pick(i1 + 1, j1, j2), // Person 1 goes down, person 2 goes down
        pick(i1, j1 + 1, j2), // Person 1 goes right, person 2 goes down
        pick(i1 + 1, j1, j2 + 1), // Person 1 goes down, person 2 goes right
        pick(i1, j1 + 1, j2 + 1) // Person 2 goes right, person 2 goes right
      )

      dp[i1][j1][j2] = picked
      return picked
    }
  }

  return Math.max(pick(0, 0, 0), 0)
}

// Unoptimized space bottom up DP solution
var cherryPickup = function (grid) {
  const n = grid.length

  // The trick here is realizing, from a step t, we can calculate both
  // i1 and i2 from j1 and j1, using i1 = t - c1 and i2 = t - j2

  // So, at a time t, dp[j1][d2] gives me the most cherries picked by two
  // people going from [0, 0] to [i1, j1] and [i2, j2]

  // Notice we won't be using the whole of dp_curr_step and dp_next_step,
  // just from and to the tiles both people can reach at time t

  let dp_curr_step = Array(n)
    .fill()
    .map(() => Array(n).fill(-1))
  dp_curr_step[0][0] = grid[0][0]

  const max_steps = 2 * (n - 1)
  for (let t = 1; t <= max_steps; t++) {
    const dp_next_step = Array(n)
      .fill()
      .map(() => Array(n).fill(-Infinity))

    const from = Math.max(0, t - (n - 1))
    const to = Math.min(t, n - 1)

    for (let j1 = from; j1 <= to; j1++) {
      for (let j2 = from; j2 <= to; j2++) {
        const i1 = t - j1
        const i2 = t - j2

        if (grid[i1][j1] == -1 || grid[i2][j2] == -1) continue

        let picked = grid[i1][j1]
        if (j1 != j2) picked += grid[i2][j2]

        // Since t moving up, even dp at the same current position
        // is considered a movement due to i = t + j
        const steps = [
          [-1, -1], // Person 1 moved right, person 2 moved right
          [-1, 0], // Person 1 moved right, person 2 moved down
          [0, -1], // Person 1 moved down, person 2 moved right
          [0, 0], // Person 1 moved down, person 2 moved down
        ]

        for (let [dj1, dj2] of steps) {
          if (j1 + dj1 < 0 || j2 + dj2 < 0) continue
          dp_next_step[j1][j2] = Math.max(dp_next_step[j1][j2], dp_curr_step[j1 + dj1][j2 + dj2] + picked)
        }
      }
    }

    dp_curr_step = dp_next_step
  }
  return Math.max(0, dp_curr_step[n - 1][n - 1])
}
