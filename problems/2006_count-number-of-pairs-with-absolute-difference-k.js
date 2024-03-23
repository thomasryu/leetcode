/*

Given an integer array nums and an integer k,
return the number of pairs (i, j) where i < j such that |nums[i] - nums[j]| == k.

The value of |x| is defined as:

- x if x >= 0.
- -x if x < 0.

Example 1:
  Input: nums = [1,2,2,1], k = 1
  Output: 4
  Explanation: The pairs with an absolute difference of 1 are:
    - [1,2,2,1]
    - [1,2,2,1]
    - [1,2,2,1]
    - [1,2,2,1]

Example 2:
  Input: nums = [1,3], k = 3
  Output: 0
  Explanation: There are no pairs with an absolute difference of 3.

Example 3:
  Input: nums = [3,2,1,5,4], k = 2
  Output: 3
  Explanation: The pairs with an absolute difference of 2 are:
    - [3,2,1,5,4]
    - [3,2,1,5,4]
    - [3,2,1,5,4]

Constraints:
- 1 <= nums.length <= 200
- 1 <= nums[i] <= 100
- 1 <= k <= 99

*/

var countKDifference = function (nums, k) {
  const count = new Map()
  let result = 0

  for (let num of nums) {
    result += count.get(num - k) || 0
    result += count.get(num + k) || 0
    count.set(num, (count.get(num) || 0) + 1)
  }

  return result
}
