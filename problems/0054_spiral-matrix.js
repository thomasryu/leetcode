/*

Given an m x n matrix, return all elements of the matrix in spiral order.

Example 1:
  Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
  Output: [1,2,3,6,9,8,7,4,5]

Example 2:
  Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
  Output: [1,2,3,4,8,12,11,10,9,5,6,7]

Constraints:
  m == matrix.length
  n == matrix[i].length
  1 <= m, n <= 10
  -100 <= matrix[i][j] <= 100

*/

var spiralOrder = function (matrix) {
  const result = []

  let step = 0

  // While there are still elements in the matrix
  while (matrix.length > 0) {
    switch (step % 4) {
      case 0:
        // 1. Shift the entire first row of the matrix array and push it to the result
        result.push(matrix.shift())
        break

      case 1:
        // 2. Add the last row of the matrix to the result, which means popping the last element
        //   of each remaining row and pushing them to the result
        for (let i = 0; i < matrix.length; i++) {
          result.push(matrix[i].pop())
        }
        break

      case 2:
        // 3. Pop the entire last row of the matrix array, reverse it and push it to the result
        result.push(matrix.pop().reverse())
        break

      case 3:
        // 4. Add the first row of the matrix to the result, which means shifting the first element
        //    of each remaining row and pushing them to the result
        for (let i = matrix.length - 1; i >= 0; i--) {
          result.push(matrix[i].shift())
        }
        break
    }

    matrix = matrix.filter((row) => row.length > 0)
    step++
  }

  return result.flat()
}
