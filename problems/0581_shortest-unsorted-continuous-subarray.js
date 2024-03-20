/*

Given an integer array nums, you need to find one continuous subarray
such that if you only sort this subarray in non-decreasing order,
then the whole array will be sorted in non-decreasing order.

Return the shortest such subarray and output its length.

Example 1:
  Input: nums = [2,6,4,8,10,9,15]
  Output: 5
  Explanation: You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array
    sorted in ascending order.

Example 2:
  Input: nums = [1,2,3,4]
  Output: 0
  Example 3:

Example 3:
  Input: nums = [1]
  Output: 0

Constraints:
- 1 <= nums.length <= 104
- -105 <= nums[i] <= 105

Follow up: Can you solve it in O(n) time complexity?

*/

// Unoptimal sort O(N * log(N)) solution
var findUnsortedSubarray = function (nums) {
  nums = nums.map((n, i) => [n, i])
  nums.sort((a, b) => a[0] - b[0])

  let start = -1
  let end = -1
  for (let i = 0; i < nums.length; i++) {
    if (i != nums[i][1]) {
      if (start < 0) start = i
      end = i
    }
  }

  return end - start == 0 ? 0 : end - start + 1
}

// Optimized O(N) solution
var findUnsortedSubarray = function (nums) {
  let start, end
  let max = -Infinity

  for (let i = 0; i < nums.length; i++) {
    max = Math.max(max, nums[i])

    // If the current number is a decrease from a previous one
    if (nums[i] != max) {
      // If there are no previous starts set, set start
      if (start == undefined) start = i - 1

      // Check where the current element must be places
      // (if it's smaller than the current smallest)
      while (start >= 0 && nums[i] < nums[start]) start--

      // Expand end to the current element
      end = i
    }
  }

  if (!(start || end)) return 0
  return end - start
}
