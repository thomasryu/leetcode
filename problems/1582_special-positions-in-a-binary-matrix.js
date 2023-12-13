/*

Given an m x n binary matrix mat, return the number of special positions in mat.

A position (i, j) is called special if mat[i][j] == 1 and
all other elements in row i and column j are 0 (rows and columns are 0-indexed).

Example 1:
  Input: mat = [[1,0,0],[0,0,1],[1,0,0]]
  Output: 1
  Explanation: (1, 2) is a special position because mat[1][2] == 1
               and all other elements in row 1 and column 2 are 0.

Example 2:
  Input: mat = [[1,0,0],[0,1,0],[0,0,1]]
  Output: 3
  Explanation: (0, 0), (1, 1) and (2, 2) are special positions.

Constraints:
- m == mat.length
- n == mat[i].length
- 1 <= m, n <= 100
- mat[i][j] is either 0 or 1.

*/

// Brute force solution
var numSpecial = function (mat) {
  let result = 0

  const m = mat.length
  const n = mat[0].length

  const checkRowCol = (row, col) => {
    let rowCount = 0
    let colCount = 0
    for (let i = 0; i < Math.max(m, n); i++) {
      if (i < m && mat[i][col] == 1) rowCount++
      if (i < n && mat[row][i] == 1) colCount++
    }
    if (rowCount == 1 && colCount == 1) result++
  }

  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) if (mat[i][j] == 1) checkRowCol(i, j)

  return result
}

// Optimized solution
var numSpecial = function (mat) {
  const checkRow = (row) => {
    let col = -1
    for (let j = 0; j < n; j++) {
      if (mat[row][j] == 1) {
        // If another 1 was already found,
        // we return our falsy value
        if (col >= 0) return -1
        col = j
      }
    }
    return col
  }

  const checkCol = (col) => {
    let row = -1
    for (let i = 0; i < m; i++) {
      if (mat[i][col] == 1) {
        if (row >= 0) return
        row = i
      }
    }
    if (row >= 0) result++
  }

  let result = 0

  const m = mat.length
  const n = mat[0].length

  // We check the entire row first, and only
  // check column if only a single 1 was found on row
  for (let i = 0; i < m; i++) {
    const oneCol = checkRow(i)
    if (oneCol >= 0) checkCol(oneCol)
  }

  return result
}
