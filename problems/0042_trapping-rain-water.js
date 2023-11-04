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
