/*

Given a set of distinct positive integers nums,
return the largest subset answer such that every pair
(answer[i], answer[j]) of elements in this subset satisfies:

- answer[i] % answer[j] == 0, or
- answer[j] % answer[i] == 0

If there are multiple solutions, return any of them.

Example 1:
  Input: nums = [1,2,3]
  Output: [1,2]
  Explanation: [1,3] is also accepted.

Example 2:
  Input: nums = [1,2,4,8]
  Output: [1,2,4,8]

Constraints:
- 1 <= nums.length <= 1000
- 1 <= nums[i] <= 2 * 109
- All the integers in nums are unique.

*/

// Suboptimal solution
var largestDivisibleSubset = function (nums) {
  const n = nums.length
  nums.sort((a, b) => a - b)

  let result = []
  const dp = Array(n)

  const add_div = (start, denominator, array) => {
    if (dp[start] && dp[start] > array.length + 1) return
    dp[start] = array.length + 1

    if (array.length > result.length) result = [...array]

    for (let i = start; i >= 0; i--) {
      if (!denominator || denominator % nums[i] == 0) {
        array.unshift(nums[i])
        add_div(i - 1, nums[i], array)
        array.shift()
      }
    }
  }

  add_div(n - 1, null, [])
  return result
}

// Optimized DP solution
var largestDivisibleSubset = function (nums) {
  const n = nums.length
  nums.sort((a, b) => a - b)

  // dp[i] will give me the LDS array starting
  // from the sorted nums[i] (O(nˆ2) memory)
  const dp = Array(n)
  dp[n - 1] = [nums[n - 1]]

  // O(n)
  const add_div = (start) => {
    if (dp[start]) return dp[start]

    let lds = [nums[start]]

    // Calculate the LDS starting from nums[start]
    for (let i = start + 1; i < n; i++) {
      if (nums[i] % nums[start] == 0) {
        const contender = add_div(i)
        if (contender.length + 1 > lds.length) lds = [nums[start], ...contender]
      }
    }

    dp[start] = lds
    return lds
  }

  // O(n)
  let result = []
  for (let i = 0; i < n; i++) {
    const contender = add_div(i)
    if (contender.length > result.length) result = contender
  }

  return result
}
