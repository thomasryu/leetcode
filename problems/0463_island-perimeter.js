/*

You are given row x col grid representing a map where grid[i][j] = 1
represents land and grid[i][j] = 0 represents water.

Grid cells are connected horizontally/vertically (not diagonally).
The grid is completely surrounded by water, and there is exactly one island\
(i.e., one or more connected land cells).

The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island.
One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100.
Determine the perimeter of the island.

Example 1:
  Input: grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
  Output: 16
  Explanation: The perimeter is the 16 yellow stripes in the image above.

Example 2:
  Input: grid = [[1]]
  Output: 4

Example 3:
  Input: grid = [[1,0]]
  Output: 4

Constraints:
- row == grid.length
- col == grid[i].length
- 1 <= row, col <= 100
- grid[i][j] is 0 or 1.
- There is exactly one island in grid.

*/

var islandPerimeter = function (grid) {
  const m = grid.length
  const n = grid[0].length

  const getPerimeter = (i, j) => {
    let result = 4
    const steps = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]
    for (const [di, dj] of steps) {
      const [ni, nj] = [i + di, j + dj]
      if (ni < 0 || ni >= m || nj < 0 || nj >= n) continue
      if (grid[ni][nj]) result--
    }
    return result
  }

  let result = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j]) result += getPerimeter(i, j)
    }
  }

  return result
}
