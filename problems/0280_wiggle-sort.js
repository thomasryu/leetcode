/*

Given an integer array nums,
reorder it such that nums[0] <= nums[1] >= nums[2] <= nums[3]....

You may assume the input array always has a valid answer.

Example 1:
  Input: nums = [3,5,2,1,6,4]
  Output: [3,5,1,6,2,4]
  Explanation: [1,6,2,5,3,4] is also accepted.

Example 2:
  Input: nums = [6,6,5,6,3,8]
  Output: [6,6,5,6,3,8]

Constraints:
- 1 <= nums.length <= 5 * 104
- 0 <= nums[i] <= 104
- It is guaranteed that there will be an answer for the given input nums.

Follow up: Could you solve the problem in O(n) time complexity?

*/

var wiggleSort = function (nums) {
  const sort = [...nums].sort((a, b) => a - b)

  let i = 0
  let j = 0
  while (i < nums.length / 2) {
    nums[j] = sort[i]
    if (j + 1 < sort.length) nums[j + 1] = sort[sort.length - 1 - i]
    i++
    j += 2
  }
}
