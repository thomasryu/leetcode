/*

You are given a rows x cols matrix grid representing a field of cherries where grid[i][j]
represents the number of cherries that you can collect from the (i, j) cell.

You have two robots that can collect cherries for you:

- Robot #1 is located at the top-left corner (0, 0), and
- Robot #2 is located at the top-right corner (0, cols - 1).

Return the maximum number of cherries collection using both robots by following the rules below:

- From a cell (i, j), robots can move to cell (i + 1, j - 1), (i + 1, j), or (i + 1, j + 1).
- When any robot passes through a cell, It picks up all cherries, and the cell becomes an empty cell.
- When both robots stay in the same cell, only one takes the cherries.
- Both robots cannot move outside of the grid at any moment.
- Both robots should reach the bottom row in grid.

Example 1:
  Input: grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]
  Output: 24
  Explanation: Path of robot #1 and #2 are described in color green and blue respectively.
    Cherries taken by Robot #1, (3 + 2 + 5 + 2) = 12.
    Cherries taken by Robot #2, (1 + 5 + 5 + 1) = 12.
    Total of cherries: 12 + 12 = 24.

Example 2:
  Input: grid = [[1,0,0,0,0,0,1],[2,0,0,0,0,3,0],[2,0,9,0,0,0,0],[0,3,0,5,4,0,0],[1,0,2,3,0,0,6]]
  Output: 28
  Explanation: Path of robot #1 and #2 are described in color green and blue respectively.
    Cherries taken by Robot #1, (1 + 9 + 5 + 2) = 17.
    Cherries taken by Robot #2, (1 + 3 + 4 + 3) = 11.
    Total of cherries: 17 + 11 = 28.

Constraints:
- rows == grid.length
- cols == grid[i].length
- 2 <= rows, cols <= 70
- 0 <= grid[i][j] <= 100

*/

var cherryPickup = function (grid) {
  const m = grid.length
  const n = grid[0].length

  let result = 0

  // For a step t
  // We know that i1 = t and i2 = t

  // So, for a step t, dp[j1][j2] will give me the maximum cherries that
  // can be picked when robot 1 is at grid[t][j1] and robot 2 is at grid[t][j2]
  // (both starting from their respective positions)

  let dp_curr_step = Array(n)
    .fill()
    .map(() => Array(n).fill(-Infinity))

  // Setting the initial dp state
  dp_curr_step[0][n - 1] = grid[0][0] + grid[0][n - 1]

  for (let t = 1; t < m; t++) {
    const dp_next_step = Array(n)
      .fill()
      .map(() => Array(n).fill(-Infinity))

    for (let j1 = 0; j1 < n; j1++) {
      for (let j2 = 0; j2 < n; j2++) {
        let picked = grid[t][j1]
        if (j1 != j2) picked += grid[t][j2]

        for (let dj1 = j1 - 1; dj1 <= j1 + 1; dj1++) {
          for (let dj2 = j2 - 1; dj2 <= j2 + 1; dj2++) {
            if (dj1 < 0 || dj1 >= n || dj2 < 0 || dj2 >= n) continue // Skip out of bounds
            dp_next_step[j1][j2] = Math.max(dp_next_step[j1][j2], dp_curr_step[dj1][dj2] + picked)
            result = Math.max(result, dp_next_step[j1][j2])
          }
        }
      }
    }

    dp_curr_step = dp_next_step
  }

  return result
}
