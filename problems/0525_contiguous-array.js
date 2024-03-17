/*

Given a binary array nums, return the maximum length of a
contiguous subarray with an equal number of 0 and 1.

Example 1:
  Input: nums = [0,1]
  Output: 2
  Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.

Example 2:
  Input: nums = [0,1,0]
  Output: 2
  Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.

Constraints:
- 1 <= nums.length <= 105
- nums[i] is either 0 or 1.

*/

// O(N^2) solution (time limit exceeded)
var findMaxLength = function (nums) {
  let sum = 0
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    nums[i] = sum
  }
  nums.unshift(0)

  let result = 0

  for (let i = 1; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      const length = j - i + 1
      if (nums[j] - nums[i - 1] == length / 2) result = Math.max(result, length)
    }
  }

  return result
}

// O(N) prefix + hash table solution
var findMaxLength = function (nums) {
  let result = 0

  // Originally, we can't transpose this problem into the
  // "find the maximum subarray that adds up to K" one, because we rely on the length
  // i.e., we want a subarray were the sum of all elements is equal to the half of the length
  // (because this means only half of them are 0's and the other are 1s)

  // However, if we convert the 0's to -1's, we solve this issue, because we break from the
  // reliance on length, now the problem becomes, "Given the current sum X of 1's and -1's,
  // if X occurred before previously in the prefix array, its oldest occurrence gives me the
  // the longest possible subarray with the same number of 1's and -1's ENDING IN THE CURRENT INDEX"

  // prefix[i] gives me the oldest earliest occurrence of sum i in an prefix array of nums
  let prefix = new Map()
  prefix.set(0, 0) // The empty array has prefix sum 0

  let sum = 0
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i] ? 1 : -1

    // If there exist an index j whose prefix sum is the same as i's,
    // it means the subarray from j to i has the same number of 1's and -1's (0's in the original array)
    // so we test its length against the current maximum
    if (prefix.has(sum)) result = Math.max(result, i + 1 - prefix.get(sum))

    // If there is already a set value, we keep it (else, we won't be finding the longest subarray)
    if (!prefix.has(sum)) prefix.set(sum, i + 1)

    // Keep in mind a prefix array is 1-indexed (the empty array's sum is at 0)
  }

  return result
}
