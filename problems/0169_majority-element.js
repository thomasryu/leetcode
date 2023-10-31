/*

Given an array nums of size n, return the majority element.
The majority element is the element that appears more than ⌊n / 2⌋ times.
You may assume that the majority element always exists in the array.

Example 1:
  Input: nums = [3,2,3]
  Output: 3

Example 2:
  Input: nums = [2,2,1,1,1,2,2]
  Output: 2

Constraints:
- n == nums.length
- 1 <= n <= 5 * 104
- -109 <= nums[i] <= 109

Follow-up: Could you solve the problem in linear time and in O(1) space?

*/

var majorityElement = function (nums) {
  // We simulate a "stack" with two O(1) variables
  let contender = 0
  let count = 0

  nums.forEach((n) => {
    if (n == contender) {
      count++
    } else {
      if (count > 0) {
        count--
      } else {
        contender = n
        count++
      }
    }
  })

  // Normally we would have to verify, but the
  // problem states there is always a majority element
  // count = 0
  // nums.forEach(n => {
  //   if (n == contender) {
  //     count++
  //   }
  // })

  return contender
}
