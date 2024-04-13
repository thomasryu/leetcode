/*

Given n non-negative integers representing an elevation map where the width of each bar is 1,
compute how much water it can trap after raining.

Example 1:
  Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
  Output: 6
  Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1].
               In this case, 6 units of rain water (blue section) are being trapped.

Example 2:
  Input: height = [4,2,0,3,2,5]
  Output: 9

Constraints:
- n == height.length
- 1 <= n <= 2 * 104
- 0 <= height[i] <= 105

*/

// O(N^2) solution
var trap = function (height) {
  let result = 0

  let i = 1
  let peak = height[0]

  // Find the first peak
  while (height[i] >= peak) {
    peak = height[i]
    i++
  }

  // The idea is, after the first peak, to backtrack after every peak we find
  // until the previous peak and 1. Add the trapped water to the result and
  // 2. "fill the hole" so that following tracks do not consider it again
  for (i; i < height.length; i++) {
    if (height[i] <= height[i - 1]) {
      continue
    }

    // height[i] > height[i - 1]
    else {
      // In case the current height is suddenly higher than the previous peak
      // we don't want to consider the units above the peak in our trap calculations
      const adjustedHeight = Math.min(height[i], peak)
      for (let j = i - 1; j >= 0 && height[j] < adjustedHeight; j--) {
        result += adjustedHeight - height[j]
        height[j] = adjustedHeight
      }
      peak = Math.max(height[i], peak)
    }
  }

  return result
}

// Beautiful O(1) solution
var trap = function (height) {
  let result = 0

  // A decreasing caterpillar method
  let left = 0
  let right = height.length - 1

  // The maximum heights found
  // on the left and right sides
  let maxLeft = 0
  let maxRight = 0

  while (left <= right) {
    // There is a wall to the right that can at least
    // trap all the water that the left wall can
    if (height[left] <= height[right]) {
      if (maxLeft < height[left]) {
        maxLeft = height[left]
      } else {
        result += maxLeft - height[left]
      }

      left++
    }

    // There is a wall to the left that can at least
    // trap all the water that the right wall can
    else {
      if (maxRight < height[right]) {
        maxRight = height[right]
      } else {
        result += maxRight - height[right]
      }

      right--
    }
  }

  return result
}

// Attempt made at 12/04/2024
var trap = function (height) {
  const n = height.length
  const max_to_left = [0] // highest element to the left of i (not including i)
  const max_to_right = [0] // highest element to the right of i (not including i)

  for (let i = 0; i < n - 1; i++) {
    const j = n - 1 - i

    const curr_max_left = max_to_left[max_to_left.length - 1]
    max_to_left.push(Math.max(curr_max_left, height[i]))

    const curr_max_right = max_to_right[0]
    max_to_right.unshift(Math.max(curr_max_right, height[j]))
  }

  let sum = 0
  for (let i = 0; i < n; i++) {
    const borders = Math.min(max_to_left[i], max_to_right[i])
    sum += Math.max(borders - height[i], 0)
  }

  return sum
}
