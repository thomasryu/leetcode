/*

Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

Example 1:
  Input: nums = [-1,0,1,2,-1,-4]
  Output: [[-1,-1,2],[-1,0,1]]
  Explanation:
    nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
    nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
    nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
  The distinct triplets are [-1,0,1] and [-1,-1,2].
  Notice that the order of the output and the order of the triplets does not matter.

Example 2:
  Input: nums = [0,1,1]
  Output: []
  Explanation: The only possible triplet does not sum up to 0.

Example 3:
  Input: nums = [0,0,0]
  Output: [[0,0,0]]
  Explanation: The only possible triplet sums up to 0.

Constraints:
- 3 <= nums.length <= 3000
- -105 <= nums[i] <= 105

*/

// Inefficient solution
var threeSum = function (nums) {
  nums.sort((a, b) => a - b)
  const result = []
  const set = new Set()

  for (let i = 0; i < nums.length - 2; i++) {
    let j = i + 1
    let k = nums.length - 1

    while (j < k) {
      if (nums[i] + nums[j] + nums[k] === 0) {
        // Check if triplet isn't already in array
        if (!set.has([nums[i], nums[j], nums[k]].toString())) {
          set.add([nums[i], nums[j], nums[k]].toString())
          result.push([nums[i], nums[j], nums[k]])
        }
      }
      if (nums[i] + nums[j] + nums[k] > 0) k--
      else j++ // (nums[i] + nums[j] + nums[k] <= 0)
    }
  }

  return result
}

// Efficient duplicate skipping
var threeSum = function (nums) {
  nums.sort((a, b) => a - b)
  const result = []

  for (let i = 0; i < nums.length - 2; i++) {
    // Stops us from getting i duplicates
    if (i > 0 && nums[i] === nums[i - 1]) continue

    let j = i + 1
    let k = nums.length - 1

    while (j < k) {
      if (nums[i] + nums[j] + nums[k] === 0) {
        result.push([nums[i], nums[j], nums[k]])

        while (nums[j] === nums[j + 1]) j++ // Stops us from getting j duplicates
        while (nums[k] === nums[j - 1]) k-- // Stops us from getting k duplicates
        j++
        k--
      } else if (nums[i] + nums[j] + nums[k] < 0) j++
      else k-- // (nums[i] + nums[j] + nums[k] > 0)
    }
  }

  return result
}
