/*

Given a binary array nums and an integer k,
return the maximum number of consecutive 1's
in the array if you can flip at most k 0's.

Example 1:
  Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
  Output: 6
  Explanation: [1,1,1,0,0,1,1,1,1,1,1]
               Bolded numbers were flipped from 0 to 1.
               The longest subarray is underlined.

Example 2:
  Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
  Output: 10
  Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
               Bolded numbers were flipped from 0 to 1.
               The longest subarray is underlined.

Constraints:

1 <= nums.length <= 105
nums[i] is either 0 or 1.
0 <= k <= nums.length

*/

var longestOnes = function (nums, k) {
  let result = 0
  let flips = []

  let start = -1
  let end = 0

  while (end < nums.length) {
    if (nums[end] == 0) {
      // Edge case: There are no flips
      if (k == 0) start = end
      else {
        if (flips.length < k) flips.push(end)
        else {
          start = flips.shift()
          flips.push(end)
        }
      }
    }
    result = Math.max(result, end - start)
    end++
  }

  return result
}
