/*

Given a binary array nums and an integer goal,
return the number of non-empty subarrays with a sum goal.

A subarray is a contiguous part of the array.

Example 1:
  Input: nums = [1,0,1,0,1], goal = 2
  Output: 4
  Explanation: The 4 subarrays are bolded and underlined below:
    [1,0,1,0,1]
    [1,0,1,0,1]
    [1,0,1,0,1]
    [1,0,1,0,1]

Example 2:
  Input: nums = [0,0,0,0,0], goal = 0
  Output: 15

Constraints:
- 1 <= nums.length <= 3 * 104
- nums[i] is either 0 or 1.
- 0 <= goal <= nums.length

*/

// Time limit exceeded O(N^2) solution
var numSubarraysWithSum = function (nums, goal) {
  let result = 0

  for (let i = 0; i <= nums.length - goal; i++) {
    let count = 0

    for (let j = i; j < nums.length; j++) {
      if (nums[j] == 1) count++
      if (count == goal) {
        console.log(i, j)
        result++
      }
      if (count > goal) break
    }
  }

  return result
}

// O(N) solution with prefix map
var numSubarraysWithSum = function (nums, goal) {
  let result = 0

  const prefix = new Map() // Store all previously occurring prefixes
  prefix.set(0, 1)

  let curr_prefix = 0
  for (let num of nums) {
    curr_prefix += num

    // Search prefix map if there is any previous prefix whose difference
    // to the current one allows us to reach a sum equals to goal
    result += prefix.get(curr_prefix - goal) || 0

    // Update count for the current prefix
    prefix.set(curr_prefix, (prefix.get(curr_prefix) || 0) + 1)
  }

  return result
}
