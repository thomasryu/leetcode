/*

Given an integer array nums and an integer k,
return the kth largest element in the array.

Note that it is the kth largest element in the sorted order,
not the kth distinct element.

Can you solve it without sorting?

Example 1:
  Input: nums = [3,2,1,5,6,4], k = 2
  Output: 5

Example 2:
  Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
  Output: 4

Constraints:
- 1 <= k <= nums.length <= 105
- -104 <= nums[i] <= 104

*/

// Cheat-y solution
var findKthLargest = function (nums, k) {
  return nums.sort((a, b) => b - a)[k - 1]
}

// O(n) (space and time) solution
var findKthLargest = function (nums, k) {
  // 1. Find the largest element of nums
  let largest = -Infinity
  for (let num of nums) largest = Math.max(largest, num)

  // 2. Build a hash where hash[x] is the amount of
  //    elements of nums where (largest - nums[i]) = x
  const hash = {}
  for (let num of nums) {
    const diff = largest - num
    hash[diff] = (hash[diff] || 0) + 1
  }

  // 3. Find the k-th largest number
  let count = 0
  let diff = 0
  while (count < k) {
    count += hash[diff] || 0
    diff++
  }

  return largest - (diff - 1)
}
