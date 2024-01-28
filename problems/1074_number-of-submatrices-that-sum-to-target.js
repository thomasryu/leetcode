/*

Given a matrix and a target,
return the number of non-empty submatrices that sum to target.

A submatrix x1, y1, x2, y2 is the set of all cells matrix[x][y]
with x1 <= x <= x2 and y1 <= y <= y2.

Two submatrices (x1, y1, x2, y2) and (x1', y1', x2', y2') are different
if they have some coordinate that is different: for example, if x1 != x1'.

Example 1:
  Input: matrix = [[0,1,0],[1,1,1],[0,1,0]], target = 0
  Output: 4
  Explanation: The four 1x1 submatrices that only contain 0.

Example 2:
  Input: matrix = [[1,-1],[-1,1]], target = 0
  Output: 5
  Explanation: The two 1x2 submatrices, plus the two 2x1 submatrices, plus the 2x2 submatrix.

Example 3:
  Input: matrix = [[904]], target = 0
  Output: 0

Constraints:
- 1 <= matrix.length <= 100
- 1 <= matrix[0].length <= 100
- -1000 <= matrix[i] <= 1000
- -10^8 <= target <= 10^8

*/

var numSubmatrixSumTarget = function (matrix, target) {
  const m = matrix.length
  const n = matrix[0].length

  // Alter matrix to turn it into a prefix matrix,
  // where matrix[i][j] gives me the sum of all elements in matrix[i][0...j]
  // (i.e., the sum of all elements in the row)
  for (let i = 0; i < m; i++) for (let j = 1; j < n; j++) matrix[i][j] += matrix[i][j - 1]

  let result = 0

  // We test every combination pair of columns
  for (let j1 = 0; j1 < n; j1++) {
    for (let j2 = j1; j2 < n; j2++) {
      // This is a difficult concept to grasp, but for a row i:
      // - sum_count's keys give me all the previous prefix sums of all values
      //   from matrix[0][j1] to matrix[i-1][j2]
      // - sum_count's values give me the count of each of these sums

      // It works as a log of the previous sums in the current [j1, j2] loop
      const sum_count = {}

      // We consider a matrix with no rows as having a sum of 0,
      // so we initiallize our sum_count[0] with 1
      sum_count[0] = 1

      let curr_sum = 0
      for (let i = 0; i < m; i++) {
        // Add the current row sum to curr_sum
        curr_sum += matrix[i][j2] - (j1 > 0 ? matrix[i][j1 - 1] : 0)

        // Here is this solution's catch:
        // We're calculating the cumulative sum of rows from 0 to i, which means
        // we're skipping submatrices which doesn't start at row 0

        // This is where sum_count comes in:
        // - If curr_sum - target = 0, we obviously reached our target
        // - However, for cases where curr_sum - target != 0, we can use sum_count
        //   to check if there are previous submatrices going from row 0 to x, x < i
        //   which we can subtract from our current submatrix to reach target

        //   (and this is also why we initiallize curr_sum[0] = 1,
        //   for the curr_sum - target = 0 case)

        // Thus, we are basically using sum_count as a prefix array of sorts,
        // but in this case for rows instead of columns

        // And of course, if there are no previous row sum that allows us to reach
        // our target, we do not increment our result count
        result += sum_count[curr_sum - target] || 0

        // We regiter our current row prefix sum to sum_count
        sum_count[curr_sum] || (sum_count[curr_sum] = 0)
        sum_count[curr_sum]++
      }
    }
  }

  return result
}
