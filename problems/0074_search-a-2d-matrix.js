/*

You are given an m x n integer matrix matrix with the following two properties:
- Each row is sorted in non-decreasing order.
- The first integer of each row is greater than the last integer of the previous row.

Given an integer target, return true if target is in matrix or false otherwise.
You must write a solution in O(log(m * n)) time complexity.

Example 1:
  Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
  Output: true

Example 2:
  Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
  Output: false

Constraints:
- m == matrix.length
- n == matrix[i].length
- 1 <= m, n <= 100
- -104 <= matrix[i][j], target <= 104

*/

var searchMatrix = function (matrix, target) {
  const m = matrix.length
  const n = matrix[0].length

  // Row binary search
  let rStart = 0
  let rEnd = m - 1

  while (rStart <= rEnd) {
    const rMid = Math.floor((rStart + rEnd) / 2)
    if (target < matrix[rMid][0]) rEnd = rMid - 1
    else if (target > matrix[rMid][n - 1]) rStart = rMid + 1
    else {
      // Column binary search
      let cStart = 0
      let cEnd = n - 1

      while (cStart <= cEnd) {
        const cMid = Math.floor((cStart + cEnd) / 2)
        if (target < matrix[rMid][cMid]) cEnd = cMid - 1
        else if (target > matrix[rMid][cMid]) cStart = cMid + 1
        else return true
      }

      break
    }
  }

  return false
}
