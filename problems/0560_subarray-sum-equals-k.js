/*

Given an array of integers nums and an integer k,
return the total number of subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.

Example 1:
  Input: nums = [1,1,1], k = 2
  Output: 2

Example 2:
  Input: nums = [1,2,3], k = 3
  Output: 2

Constraints:
- 1 <= nums.length <= 2 * 104
- -1000 <= nums[i] <= 1000
- -107 <= k <= 107

*/

var subarraySum = function (nums, k) {
  const prev_prefix = new Map()
  prev_prefix.set(0, 1)

  let curr_prefix = 0
  let result = 0

  for (let num of nums) {
    curr_prefix += num

    if (prev_prefix.has(curr_prefix - k)) result += prev_prefix.get(curr_prefix - k)
    prev_prefix.set(curr_prefix, (prev_prefix.get(curr_prefix) || 0) + 1)
  }

  return result
}

// Atempt made at 14/03/2024
var subarraySum = function (nums, k) {
  let result = 0

  // prev_prefix gives me previously occurring prefixes in nums
  // i.e. the sum of all elements between nums[0] and nums[i]
  const prev_prefix = new Map()
  prev_prefix.set(0, 1) // The default prefix is 0, so 0 occurs 1 by default

  // Gives me the current nums[0] to nums[i] sum
  let curr_prefix = 0

  for (let num of nums) {
    curr_prefix += num

    // If there are any previous prefixes whose difference to curr_prefix
    // makes us reach our goal (i.e. the sum of all nums elements between them is equal to goal),
    // increment our count for each
    result += prev_prefix.get(curr_prefix - k) || 0

    // Increments the count for curr_prefix
    prev_prefix.set(curr_prefix, (prev_prefix.get(curr_prefix) || 0) + 1)
  }

  return result
}
