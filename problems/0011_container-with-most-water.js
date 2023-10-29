/*

You are given an integer array height of length n.
There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
Find two lines that together with the x-axis form a container, such that the container contains the most water.
Return the maximum amount of water a container can store.

NOTICE that you may not slant the container.

Example 1:
  Input: height = [1,8,6,2,5,4,8,3,7]
  Output: 49
  Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

Example 2:
  Input: height = [1,1]
  Output: 1

Constraints:
  n == height.length
  2 <= n <= 105
  0 <= height[i] <= 104

*/

// O(N^2)
var maxArea = function (height) {
  const n = height.length
  let result = 0

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const w = j - i
      const h = Math.min(height[i], height[j])
      result = Math.max(h * w, result)
    }
  }

  return result
}

// O(N)
var maxArea = function (height) {
  const n = height.length

  let result = 0
  let head = n - 1
  let tail = 0

  while (head > tail) {
    const w = head - tail
    const h = Math.min(height[head], height[tail])
    result = Math.max(h * w, result)

    if (height[head] > height[tail]) {
      tail++
    } else {
      head--
    }
  }

  return result
}
