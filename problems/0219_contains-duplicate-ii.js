/*

Given an integer array nums and an integer k, return true if there are two distinct
indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.

Example 1:
  Input: nums = [1,2,3,1], k = 3
  Output: true

Example 2:
  Input: nums = [1,0,1,1], k = 1
  Output: true

Example 3:
  Input: nums = [1,2,3,1,2,3], k = 2
  Output: false

Constraints:
- 1 <= nums.length <= 105
- -109 <= nums[i] <= 109
- 0 <= k <= 105

*/

// Inefficient solution O(N^2)
var containsNearbyDuplicate = function (nums, k) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] == nums[i] && Math.abs(i - j) <= k) return true
    }
  }

  return false
}

// Inefficient solution O(N * K)
var containsNearbyDuplicate = function (nums, k) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j <= Math.min(nums.length - 1, i + k); j++) {
      if (nums[j] == nums[i] && Math.abs(i - j) <= k) return true
    }
  }
  return false
}

// Faster solution using map
var containsNearbyDuplicate = function (nums, k) {
  const map = new Map()

  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) map.get(nums[i]).push(i)
    else map.set(nums[i], [i])
  }

  for (array of map.values()) {
    for (i = 1; i < array.length; i++) {
      if (array[i] - array[i - 1] <= k) return true
    }
  }

  return false
}

// Equally efficient solution
var containsNearbyDuplicate = function (nums, k) {
  const lastFound = {}

  for (let i = 0; i < nums.length; i++) {
    if (lastFound[nums[i]] != undefined) {
      if (i - lastFound[nums[i]] <= k) return true
    }

    lastFound[nums[i]] = i
  }

  return false
}
