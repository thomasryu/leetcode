/*

Given an integer array nums of length n and an integer target,
find three integers in nums such that the sum is closest to target.

Return the sum of the three integers.

You may assume that each input would have exactly one solution.

Example 1:
  Input: nums = [-1,2,1,-4], target = 1
  Output: 2
  Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

Example 2:
  Input: nums = [0,0,0], target = 1
  Output: 0
  Explanation: The sum that is closest to the target is 0. (0 + 0 + 0 = 0).

Constraints:
- 3 <= nums.length <= 500
- -1000 <= nums[i] <= 1000
- -104 <= target <= 104

*/

// Standard solution
var threeSumClosest = function (nums, target) {
  let result = Infinity
  nums.sort((a, b) => a - b)

  for (let i = 0; i < nums.length; i++) {
    // Duplicate skipping for performance improvement
    if (i > 0 && nums[i] == nums[i - 1]) continue

    let j = i + 1
    let k = nums.length - 1

    while (j < k) {
      const sum = nums[i] + nums[j] + nums[k]
      if (Math.abs(target - sum) < Math.abs(target - result)) result = sum
      if (target - sum == 0) return sum

      if (sum < target) {
        while (nums[j] == nums[j + 1]) j++
        j++
      } else {
        while (nums[k] == nums[k - 1]) k--
        k--
      }
    }
  }

  return result
}

// Optimized solution
var threeSumClosest = function (nums, target) {
  let result = Infinity
  nums.sort((a, b) => a - b)

  for (let i = 0; i < nums.length; i++) {
    let j = i + 1
    let k = nums.length - 1

    // Here, there is no need for duplicate skipping
    // (unlike 0015_3sum.js) so we just proceed normally
    while (j < k) {
      const sum = nums[i] + nums[j] + nums[k]
      if (Math.abs(target - sum) < Math.abs(target - result)) result = sum
      if (sum <= target) j++
      else k--
    }
  }

  return result
}
