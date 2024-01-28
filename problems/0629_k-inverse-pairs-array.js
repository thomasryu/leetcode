/*

For an integer array nums, an inverse pair is a pair of integers [i, j]
where 0 <= i < j < nums.length and nums[i] > nums[j].

Given two integers n and k, return the number of different arrays consist
of numbers from 1 to n such that there are exactly k inverse pairs.
Since the answer can be huge, return it modulo 109 + 7.

Example 1:
  Input: n = 3, k = 0
  Output: 1
  Explanation: Only the array [1,2,3] which consists of numbers from 1 to 3 has exactly 0 inverse pairs.

Example 2:
  Input: n = 3, k = 1
  Output: 2
  Explanation: The array [1,3,2] and [2,1,3] have exactly 1 inverse pair.

Constraints:
- 1 <= n <= 1000
- 0 <= k <= 1000

*/

var kInversePairs = function (n, k) {
  // The trick here is to realize an array with k inverse pairs can be obtained
  // by shifting numbers on the right to the left a total of k spaces

  // For example: [2, 4, 1, 3] has three inverse pairs, because:

  // 1. The number 2 was shift 1 space to the left
  // 2. The number 4 was shift 2 spaces to the left

  // So for parameters n and k, we can calculate their inverse pairs by
  // obtaining the sum of the following:

  // dp[n - 1][k], since we can just add n to the end of [1...n-1] to keep the number of inverse pairs
  // dp[n - 1][k - 1], since we can add n shifted one to the left to create k inverse pairs
  // ...
  // dp[n - 1][k - n] (only if k - n >= 0), again to make the number of inverse pairs k

  // The sum of all these values give me dp[n][k]

  const mod = 10 ** 9 + 7
  const dp = Array(n + 1)
    .fill()
    .map(() => Array(k + 1).fill(0))
  for (let i = 1; i <= n; i++) dp[i][0] = 1 // There is only one arrangement with 0 inverse pairs

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= k; j++) {
      let total = 0

      // For an array of i elements,
      // we can only have, at max i-1 shifts
      for (let x = 0; x < i; x++) {
        if (j - x < 0) break // We can't have negative inverse pairs
        total += dp[i - 1][j - x]
      }

      dp[i][j] = total % mod
    }
  }

  return dp[n][k]
}
