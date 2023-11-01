/*

You are given an integer array nums.
You are initially positioned at the array's first index,
and each element in the array represents your maximum jump length at that position.

Return true if you can reach the last index, or false otherwise.

Example 1:
  Input: nums = [2,3,1,1,4]
  Output: true
  Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

Example 2:
  Input: nums = [3,2,1,0,4]
  Output: false
Explanation: You will always arrive at index 3 no matter what.
             Its maximum jump length is 0, which makes it impossible to reach the last index.

Constraints:
- 1 <= nums.length <= 104
- 0 <= nums[i] <= 105

*/

// O(Nˆ2) solution
var canJump = function (nums) {
  const reachable = Array(nums.length).fill(false)
  reachable[0] = true

  // Simple dynamic programming array
  for (let i = 0; i < nums.length; i++) {
    if (reachable[i]) {
      for (let j = 1; j <= nums[i] && j + i < nums.length; j++) {
        reachable[i + j] = true
      }
    }
  }

  return reachable[nums.length - 1]
}

// O(N) solution
var canJump = function (nums) {
  let maxReach = 0

  // While we are within jumps' length we keep checking how far we can go
  for (let i = 0; i < nums.length && i <= maxReach; i++) {
    maxReach = Math.max(maxReach, i + nums[i])
    if (maxReach >= nums.length - 1) {
      return true
    }
  }

  return false
}
