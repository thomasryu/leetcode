/*

There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot
index k (1 <= k < nums.length) such that the resulting array is
[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed).
For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target,
return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

Example 1:
  Input: nums = [4,5,6,7,0,1,2], target = 0
  Output: 4

Example 2:
  Input: nums = [4,5,6,7,0,1,2], target = 3
  Output: -1

Example 3:
  Input: nums = [1], target = 0
  Output: -1

Constraints:
- 1 <= nums.length <= 5000
- -104 <= nums[i] <= 104
- All values of nums are unique.
- nums is an ascending array that is possibly rotated.
- -104 <= target <= 104

*/

var search = function (nums, target) {
  let start = 0
  let end = nums.length - 1

  while (start <= end) {
    const mid = Math.floor((start + end) / 2)

    if (nums[mid] == target) return mid
    // In this scenario, it doesn't matter if the array is rotated or not,
    // it matters if the rotated array reaches the middle element
    // e.g. [4,5,6,7,0,1,2]

    // 1. middle > target
    if (nums[mid] > target) {
      // If the rotation reached the middle element AND the start
      // of the rotation is bigger than the target, we go right
      if (nums[mid] >= nums[start] && nums[start] > target) start = mid + 1
      // Else, we follow standard approach and go to the left
      else end = mid - 1
    }

    // 2. middle < target
    else {
      // The only situation we possibly go to the left is if the
      // rotation has NOT reached the middle element AND the last
      // element of the current array is lower than target
      if (nums[mid] <= nums[start] && nums[end] < target) end = mid - 1
      // Else we follow standard approach and go to the right
      else start = mid + 1
    }
  }

  return -1
}
