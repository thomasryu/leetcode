/*

Alice has n balloons arranged on a rope.
You are given a 0-indexed string colors where colors[i] is the color of the ith balloon.

Alice wants the rope to be colorful. She does not want two consecutive balloons
to be of the same color, so she asks Bob for help. Bob can remove some balloons
from the rope to make it colorful. You are given a 0-indexed integer array neededTime
where neededTime[i] is the time (in seconds) that Bob needs to remove the ith balloon from the rope.

Return the minimum time Bob needs to make the rope colorful.

Example 1:
  Input: colors = "abaac", neededTime = [1,2,3,4,5]
  Output: 3
  Explanation: In the above image, 'a' is blue, 'b' is red, and 'c' is green.
               Bob can remove the blue balloon at index 2. This takes 3 seconds.
               There are no longer two consecutive balloons of the same color. Total time = 3.

Example 2:
  Input: colors = "abc", neededTime = [1,2,3]
  Output: 0
  Explanation: The rope is already colorful. Bob does not need to remove any balloons from the rope.

Example 3:
  Input: colors = "aabaa", neededTime = [1,2,3,4,1]
  Output: 2
  Explanation: Bob will remove the ballons at indices 0 and 4. Each ballon takes 1 second to remove.
  There are no longer two consecutive balloons of the same color. Total time = 1 + 1 = 2.

Constraints:
- n == colors.length == neededTime.length
- 1 <= n <= 105
- 1 <= neededTime[i] <= 104
- colors contains only lowercase English letters.

*/

// Default solution
var minCost = function (colors, neededTime) {
  let result = 0

  let currColor = ''
  let currLength = 0
  let currMax = 0
  let currTotal = 0

  for (let i = 0; i < colors.length; i++) {
    if (colors[i] != currColor) {
      if (currLength > 1) result += currTotal - currMax
      currColor = colors[i]
      currLength = 1
      currMax = currTotal = neededTime[i]
    } else {
      currLength++
      currTotal += neededTime[i]
      currMax = Math.max(currMax, neededTime[i])
    }
  }
  if (currLength > 1) result += currTotal - currMax
  return result
}

// Double pointers solution
var minCost = function (colors, neededTime) {
  let result = 0

  let i = 0
  let j = 0

  let max
  let total

  while (i < colors.length) {
    max = neededTime[i]
    total = neededTime[i]

    j = i + 1
    while (colors[i] == colors[j]) {
      total += neededTime[j]
      max = Math.max(max, neededTime[j])
      j++
    }

    result += total - max
    i = j
  }

  return result
}
