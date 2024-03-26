/*

Given an unsorted integer array nums.
Return the smallest positive integer that is not present in nums.

You must implement an algorithm that runs in
O(n) time and uses O(1) auxiliary space.

Example 1:
  Input: nums = [1,2,0]
  Output: 3
  Explanation: The numbers in the range [1,2] are all in the array.

Example 2:
  Input: nums = [3,4,-1,1]
  Output: 2
  Explanation: 1 is in the array but 2 is missing.

Example 3:
  Input: nums = [7,8,9,11,12]
  Output: 1
  Explanation: The smallest positive integer 1 is missing.

Constraints:
- 1 <= nums.length <= 105
- -231 <= nums[i] <= 231 - 1

*/

var firstMissingPositive = function (nums) {
  function swap(i, j, nums) {
    ;[nums[i], nums[j]] = [nums[j], nums[i]]
  }

  // Cycle sort the array
  // If nums[i] == x, place it at position x - 1
  // (if its within the array's indexes)
  let i = 0
  const n = nums.length
  while (i < n) {
    const swap_index = nums[i] - 1
    if (
      swap_index >= 0 &&
      swap_index < nums.length &&
      nums[i] != nums[swap_index]
    )
      swap(i, swap_index, nums)
    else i++
  }

  // Search for the first i where nums[i] != i + 1
  for (let i = 0; i < n; i++) if (nums[i] != i + 1) return i + 1
  return n + 1
}
