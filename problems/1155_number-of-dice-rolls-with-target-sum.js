/*

You have n dice, and each die has k faces numbered from 1 to k.

Given three integers n, k, and target,
return the number of possible ways (out of the kn total ways) to roll the dice,
so the sum of the face-up numbers equals target. Since the answer may be too large,
return it modulo 109 + 7.

Example 1:
  Input: n = 1, k = 6, target = 3
  Output: 1
  Explanation: You throw one die with 6 faces.
               There is only one way to get a sum of 3.

Example 2:
  Input: n = 2, k = 6, target = 7
  Output: 6
  Explanation: You throw two dice, each with 6 faces.
               There are 6 ways to get a sum of 7: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1.

Example 3:
  Input: n = 30, k = 30, target = 500
  Output: 222616187
  Explanation: The answer must be returned modulo 109 + 7.

Constraints:
- 1 <= n, k <= 30
- 1 <= target <= 1000

*/

// Recursive solution (time limit exceeded)
var numRollsToTarget = function (n, k, target) {
  if (target < n || target > n * k) return -1

  let result = 0
  const roll = (remainingDice, currentTotal) => {
    if (remainingDice == 0) {
      if (currentTotal == target) result++
      return
    }

    // Current sum already surpassed target
    if (currentTotal >= target) return

    // If target is unreachable
    if (remainingDice * k < target - currentTotal) return

    for (let i = 1; i <= k; i++) roll(remainingDice - 1, currentTotal + i)
  }

  roll(n, 0)
  return result
}

// Recursive solution (time limit exceeded)
var numRollsToTarget = function (n, k, target) {
  const dp = Array(n + 1)
    .fill()
    .map(() => Array(target + 1).fill(-1))

  // 1. There is only one way to arrange 0 dice with target 0
  dp[0][0] = 1

  // 2. There is no way to array 0 dice or reach a 0 target otherwise
  for (let i = 1; i <= n; i++) dp[i][0] = 0
  for (let i = 1; i <= target; i++) dp[0][i] = 0

  return recursion(dp, n, k, target)
}

const recursion = (dp, n, k, target) => {
  // If the value was already calculated, return it
  if (dp[n][target] !== -1) return dp[n][target]

  let count = 0
  for (let i = 1; i <= k; i++) {
    // For each possible value i of the current dice:
    // 1. We check if there a previous variations with one less die
    //    which allow us to reach target (i.e. target - i >= 0)
    // 2. We add said previous variations (dp[n - 1][target - i]) to the current count
    if (target - i >= 0)
      count = (count + recursion(dp, n - 1, k, target - i)) % (10 ** 9 + 7)
  }

  dp[n][target] = count % (10 ** 9 + 7)
  return dp[n][target]
}
