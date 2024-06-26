/*

You are a professional robber planning to rob houses along a street.
Each house has a certain amount of money stashed, the only constraint stopping you
from robbing each of them is that adjacent houses have security systems connected
and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house,
return the maximum amount of money you can rob tonight without alerting the police.

Example 1:
  Input: nums = [1,2,3,1]
  Output: 4
  Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
               Total amount you can rob = 1 + 3 = 4.

Example 2:
  Input: nums = [2,7,9,3,1]
  Output: 12
  Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
               Total amount you can rob = 2 + 9 + 1 = 12.

Constraints:
- 1 <= nums.length <= 100
- 0 <= nums[i] <= 400

*/

// Acceptable solution
var rob = function (nums) {
  let result = Math.max(nums[0], nums[1] || 0)

  // dp[x] will store the maximum profit
  // that can beachieved by reaching house x
  const dp = [...nums]

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 2; j < nums.length; j++) {
      dp[j] || (dp[j] = nums[i])
      dp[j] = Math.max(dp[j], dp[i] + nums[j])
      result = Math.max(result, dp[j])
    }
  }

  return result
}

// Shorter solution
var rob = function (nums) {
  let x = nums[0]
  let y = nums[1] || 0
  let z = x + (nums[2] || 0)

  for (let i = 3; i < nums.length; i++) {
    ;[x, y, z] = [y, z, Math.max(x, y) + nums[i]]
  }

  return Math.max(y, z)
}

// Attempt made at 08/04/2024
var rob = function (nums) {
  if (nums.length == 1) return nums[0]
  // dp[i] is the current maximum profit of reaching nums[i]
  // (without robbing nums[i])
  const dp = Array(nums.length).fill(0)
  dp[0] = nums[0]
  dp[1] = nums[1]

  for (let i = 0; i < nums.length; i++)
    for (let j = i + 2; j < nums.length && j <= i + 3; j++) {
      dp[j] = Math.max(dp[j], dp[i] + nums[j])
    }

  return Math.max(...dp)
}
