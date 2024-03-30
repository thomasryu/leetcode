/*

Given an integer array nums and an integer k, return the number of good subarrays of nums.
A good array is an array where the number of different integers in that array is exactly k.

For example, [1,2,3,1,2] has 3 different integers: 1, 2, and 3.
A subarray is a contiguous part of an array.

Example 1:
  Input: nums = [1,2,1,2,3], k = 2
  Output: 7
  Explanation: Subarrays formed with exactly 2 different integers:
    [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]

Example 2:
  Input: nums = [1,2,1,3,4], k = 3
  Output: 3
  Explanation: Subarrays formed with exactly 3 different integers:
    [1,2,1,3], [2,1,3], [1,3,4].

Constraints:
- 1 <= nums.length <= 2 * 104
- 1 <= nums[i], k <= nums.length

*/

var subarraysWithKDistinct = function (nums, k) {
  return (
    subarraysWithAtMostKDistinct(nums, k) -
    subarraysWithAtMostKDistinct(nums, k - 1)
  )
}

var subarraysWithAtMostKDistinct = function (nums, k) {
  if (k == 0) return 0

  const n = nums.length
  const map = new Map()

  let result = 0

  let left = 0
  for (let right = 0; right < n; right++) {
    const num = nums[right]
    map.set(num, (map.get(num) || 0) + 1)

    while (map.size > k) {
      const del_num = nums[left++]
      const del_count = map.get(del_num)
      if (del_count == 1) map.delete(del_num)
      else map.set(del_num, del_count - 1)
    }

    // At this point, we have a window starting at left and ending in right
    // for this window, there exist (right - left + 1) subarrays that end in right
    // with AT MOST k elements
    result += right - left + 1
  }

  return result
}
