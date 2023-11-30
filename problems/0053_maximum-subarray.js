// Solution that also keeps the subarray
var maxSubArray = function (nums) {
  let maxValue = nums[0]
  let maxStart = 0
  let maxEnd = 0

  let currValue = nums[0]
  let currStart = 0

  // Imagine we have an array where, for each index i,
  // we store the maximum sum of a subarray that ends at i

  // We do that by either by either
  // 1. Adding the nums[i] to the previous sum if the sum is higher than nums[i]
  // 2. Using nums[i] directly if otherwise

  // Here are just doing this logic, but without using an auxiliary array
  for (let i = 1; i < nums.length; i++) {
    if (currValue + nums[i] > nums[i]) {
      currValue += nums[i]
    } else {
      currValue = nums[i]
      currStart = i
    }

    if (currValue > maxValue) {
      maxValue = currValue
      maxStart = currStart
      maxEnd = i
    }
  }

  return nums.slice(maxStart, maxEnd + 1).reduce((a, c) => a + c)
}

// Optimized solution
var maxSubArray = function (nums) {
  let result = nums[0]
  let sum = nums[0]
  for (let i = 1; i < nums.length; i++) {
    sum = Math.max(sum + nums[i], nums[i])
    result = Math.max(resul, sum)
  }
  return result
}
