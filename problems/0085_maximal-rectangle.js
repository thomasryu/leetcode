/*

Given a rows x cols binary matrix filled with 0's and 1's,
find the largest rectangle containing only 1's and return its area.

Example 1:
  Input: matrix =
    [["1","0","1","0","0"],
     ["1","0","1","1","1"],
     ["1","1","1","1","1"]
     ["1","0","0","1","0"]]
  Output: 6
  Explanation: The maximal rectangle is shown in the above picture.

Example 2:
  Input: matrix = [["0"]]
  Output: 0

Example 3:
  Input: matrix = [["1"]]
  Output: 1

Constraints:
- rows == matrix.length
- cols == matrix[i].length
- 1 <= row, cols <= 200
- matrix[i][j] is '0' or '1'.

*/

// O(N * M * N) solution
var maximalRectangle = function (matrix) {
  const m = matrix.length
  const n = matrix[0].length

  let result = 0

  // vert_streak[j] gives me the current height of
  // consecutive 1s at column j
  const vert_streak = Array(n).fill(0)

  for (let i = 0; i < m; i++) {
    // hori_streak gives me the current streak of
    // consecutive 1s in the current row
    let hori_streak = 0

    for (let j = 0; j < n; j++) {
      if (matrix[i][j] == '0') {
        hori_streak = 0
        vert_streak[j] = 0
        continue
      }

      hori_streak++
      vert_streak[j]++

      // if (j + 1 == n || matrix[i][j + 1] == '0') {
      let height = Infinity
      for (let k = j; k >= 0; k--) {
        height = Math.min(height, vert_streak[k])
        const width = j - k + 1
        result = Math.max(result, height * width)
      }
    }
  }

  return result
}
