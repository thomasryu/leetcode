/*

Given an unsorted array of integers nums,
return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

Example 1:
  Input: nums = [100,4,200,1,3,2]
  Output: 4
  Explanation: The longest consecutive elements sequence is [1, 2, 3, 4].
               Therefore its length is 4.

Example 2:
  Input: nums = [0,3,7,2,5,8,4,6,0,1]
  Output: 9

Constraints:
- 0 <= nums.length <= 105
- -109 <= nums[i] <= 109

*/

var longestConsecutive = function (nums) {
  nums.sort((a, b) => a - b)

  let current = 1
  let result = Math.min(nums.length, 1)

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i + 1] == nums[i] + 1) {
      current++
      result = Math.max(result, current)
    } else if (nums[i + 1] == nums[i]) {
      continue
    } else current = 1
  }

  return result
}
