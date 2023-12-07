/*

Given a triangle array, return the minimum path sum from top to bottom.

For each step, you may move to an adjacent number of the row below.
More formally, if you are on index i on the current row,
you may move to either index i or index i + 1 on the next row.

Example 1:
  Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
  Output: 11
  Explanation: The triangle looks like:
                   2
                  3 4
                 6 5 7
                4 1 8 3
               The minimum path sum from top to bottom
               is 2 + 3 + 5 + 1 = 11 (underlined above).

Example 2:
  Input: triangle = [[-10]]
  Output: -10

Constraints:
- 1 <= triangle.length <= 200
- triangle[0].length == 1
- triangle[i].length == triangle[i - 1].length + 1
- -104 <= triangle[i][j] <= 104

Follow up: Could you do this using only O(n) extra space,
           where n is the total number of rows in the triangle?

*/

var minimumTotal = function (triangle) {
  // We use a dp array with the length
  // of the base of the triangle
  const n = triangle.length
  const dp = [...triangle[n - 1]]

  // From bottom to top, we simply follow
  // the logic imposed by the problem
  for (let i = 1; i < n; i++)
    for (let j = 0; j < n - i; j++)
      dp[j] = triangle[n - 1 - i][j] + Math.min(dp[j], dp[j + 1])

  return dp[0]
}
