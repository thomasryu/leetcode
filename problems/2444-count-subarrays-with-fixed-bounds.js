/*

You are given an integer array nums and two integers minK and maxK.

A fixed-bound subarray of nums is a subarray that satisfies the following conditions:

- The minimum value in the subarray is equal to minK.
- The maximum value in the subarray is equal to maxK.

Return the number of fixed-bound subarrays.
A subarray is a contiguous part of an array.

Example 1:
  Input: nums = [1,3,5,2,7,5], minK = 1, maxK = 5
  Output: 2
  Explanation: The fixed-bound subarrays are [1,3,5] and [1,3,5,2].

Example 2:
  Input: nums = [1,1,1,1], minK = 1, maxK = 1
  Output: 10
  Explanation: Every subarray of nums is a fixed-bound subarray. There are 10 possible subarrays.

Constraints:
- 2 <= nums.length <= 105
- 1 <= nums[i], minK, maxK <= 106

*/

var countSubarrays = function (nums, minK, maxK) {
  const n = nums.length
  let result = 0

  let left = 0
  while (left < n) {
    const left_num = nums[left]

    if (left_num < minK || left_num > maxK) {
      left++
      continue
    }

    // map[0] will have the indexes of minK,
    // map[1] will have the indexes of maxK
    const map = [[], []]
    let right = left
    while (right < n) {
      const right_num = nums[right]
      if (right_num < minK || right_num > maxK) break

      if (right_num == minK) map[0].push(right)
      else if (right_num == maxK) map[1].push(right)
      right++
    }

    // At this point, [left, right[ gives us a window
    // with elements between minK and maxK
    if (minK == maxK) {
      const length = right - left
      result += (length * (length + 1)) / 2
      break
    }

    // While I have minK and maxK within my window
    while (map[0].length > 0 && map[1].length > 0) {
      const i = Math.min(map[0][0], map[1][0])
      const j = Math.max(map[0][0], map[1][0])

      const left_comb = i - left + 1
      const right_comb = right - j

      result += left_comb * right_comb
      left = i + 1

      i == map[0][0] ? map[0].shift() : map[1].shift()
    }

    left = right
  }

  return result
}

// Optimized solution
var countSubarrays = function (nums, minK, maxK) {
  let minK_index = (maxK_index = left = -1)
  let result = 0

  // At every step, we are adding the amount of subarrays
  // that obey the conditions and end in right to the result
  for (let right = 0; right < nums.length; right++) {
    const num_right = nums[right]

    if (num_right < minK || num_right > maxK) {
      minK_index = maxK_index = left = right
      continue
    }

    if (num_right == minK) minK_index = right
    if (num_right == maxK) maxK_index = right

    // Math.min(minK_index, maxK_index) - left gives us the
    // "leftovers" from the left we can throw away without
    // disobeying the condition minK/maxK conditions

    // Notice how if one of them is still not found, 0 is added
    result += Math.min(minK_index, maxK_index) - left
  }

  return result
}
