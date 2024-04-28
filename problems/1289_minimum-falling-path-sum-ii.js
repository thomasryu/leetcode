/*

Given an n x n integer matrix grid,
return the minimum sum of a falling path with non-zero shifts.

A falling path with non-zero shifts is a choice of exactly one element from each row of grid
such that no two elements chosen in adjacent rows are in the same column.

Example 1:
  Input: grid = [[1,2,3],[4,5,6],[7,8,9]]
  Output: 13
  Explanation:
    The possible falling paths are:
    [1,5,9], [1,5,7], [1,6,7], [1,6,8],
    [2,4,8], [2,4,9], [2,6,7], [2,6,8],
    [3,4,8], [3,4,9], [3,5,7], [3,5,9]
    The falling path with the smallest sum is [1,5,7], so the answer is 13.

Example 2:
  Input: grid = [[7]]
  Output: 7

Constraints:
- n == grid.length == grid[i].length
- 1 <= n <= 200
- -99 <= grid[i][j] <= 99

*/

var minFallingPathSum = function (grid) {
  const n = grid.length
  if (n == 1) return grid[0][0]

  // sum: The sum of the current min path
  // lastIndex: The index where the min patj ended
  let curr_min = { sum: 0, lastIndex: -1 }
  let curr_sec_min = { sum: 0, lastIndex: -1 }

  // For each row, we keep track of where the current min path ends
  // AND where the second minimum min path ends

  // That is because, for each column j, the min path that ends on grid[i][j]
  // is either:

  // 1. The min path sum + grid[i][j] if the min path DOESN'T end on j
  // 2. The second min path sum + grid[i][j] if it DOES

  // So for each row, we just need to keep track of these 2 values
  for (let i = 0; i < n; i++) {
    let next_min = { sum: Infinity, lastIndex: -1 }
    let next_sec_min = { sum: Infinity, lastIndex: -1 }

    for (let j = 0; j < n; j++) {
      const sum =
        j != curr_min.lastIndex
          ? curr_min.sum + grid[i][j]
          : curr_sec_min.sum + grid[i][j]
      if (sum < next_min.sum) {
        next_sec_min = next_min
        next_min = { sum, lastIndex: j }
      } else if (sum < next_sec_min.sum) next_sec_min = { sum, lastIndex: j }
    }
    curr_min = next_min
    curr_sec_min = next_sec_min
  }
  return curr_min.sum
}
