/*

Given an integer array nums, move all 0's to the end of it
while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.

Example 1:
  Input: nums = [0,1,0,3,12]
  Output: [1,3,12,0,0]

Example 2:
  Input: nums = [0]
  Output: [0]

Constraints:
- 1 <= nums.length <= 104
- -231 <= nums[i] <= 231 - 1

Follow up: Could you minimize the total number of operations done?

*/

// Minimal operations solution
var moveZeroes = function (nums) {
  let count = 0
  let total = 0

  for (let i = 0; i <= nums.length; i++) {
    if (i < nums.length && nums[i] == 0) {
      count++
      total++
    } else if (count > 0) {
      nums.splice(i - count, count)
      i -= count
      count = 0
    }
  }
  nums.splice(nums.length, 0, ...Array(total).fill(0))
}

// Two pointer solution
var moveZeroes = function (nums) {
  let z = -1
  for (let i = 0; i < nums.length; i++) {
    if (z < 0 && nums[i] == 0) z = i
    else if (z >= 0 && nums[i] != 0) {
      ;[nums[i], nums[z]] = [nums[z], nums[i]]
      z++
    }
  }
}
