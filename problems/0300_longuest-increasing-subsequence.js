/*

Given an integer array nums, return the length
of the longest strictly increasing subsequence

Example 1:
  Input: nums = [10,9,2,5,3,7,101,18]
  Output: 4
  Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

Example 2:
  Input: nums = [0,1,0,3,2,3]
  Output: 4

Example 3:
  Input: nums = [7,7,7,7,7,7,7]
  Output: 1

Constraints:
  1 <= nums.length <= 2500
  -104 <= nums[i] <= 104

Follow up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?

*/

var lengthOfLIS = function (nums) {
  let result = 1

  // dp[x] gives me the longest increasing
  // subsequence until nums[x] (inclusive)
  const dp = Array(nums.length).fill(1)

  for (let i = 0; i < nums.length; i++)
    for (let j = i + 1; j < nums.length; j++)
      if (nums[j] > nums[i]) {
        dp[j] = Math.max(dp[j], dp[i] + 1)
        result = Math.max(result, dp[j])
      }

  return result
}
