/*

Given an integer array nums, return an array answer such that answer[i]
is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

Example 1:
  Input: nums = [1,2,3,4]
  Output: [24,12,8,6]

Example 2:
  Input: nums = [-1,1,0,-3,3]
  Output: [0,0,9,0,0]

Constraints:
- 2 <= nums.length <= 105
- -30 <= nums[i] <= 30

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

Follow up: Can you solve the problem in O(1) extra space complexity?
           (The output array does not count as extra space for space complexity analysis.)

*/

// Original solution
var productExceptSelf = function (nums) {
  const n = nums.length
  const productEndingAt = Array(n)
  const productStartingAt = Array(n)

  productEndingAt[0] = nums[0]
  productStartingAt[n - 1] = nums[n - 1]

  for (let i = 1; i < n; i++) {
    productEndingAt[i] = productEndingAt[i - 1] * nums[i]
    productStartingAt[n - 1 - i] = productStartingAt[n - i] * nums[n - 1 - i]
  }

  const result = Array(n)
  result[0] = productStartingAt[1]
  result[n - 1] = productEndingAt[n - 2]

  for (i = 1; i < n - 1; i++) {
    result[i] = productEndingAt[i - 1] * productStartingAt[i + 1]
  }

  return result
}

// Solution with O(1) extra space (aside from result array)
var productExceptSelf = function (nums) {
  const n = nums.length

  let zeroCount = 0
  let zeroIndex = -1

  const result = Array(n).fill(0)

  for (let i = 0; i < n; i++) {
    if (nums[i] == 0) {
      zeroCount++
      zeroIndex = i
    }
  }

  // Edge case: more than 1 zeroes
  if (zeroCount > 1) {
    return result
  }
  // Edge case: exactly 1 zero
  else if (zeroCount == 1) {
    result[zeroIndex] = 1
    for (i = 0; i < zeroIndex; i++) {
      result[zeroIndex] *= nums[i]
    }
    for (i = zeroIndex + 1; i < n; i++) {
      result[zeroIndex] *= nums[i]
    }
  }
  // Normal case: all numbers different than zero
  else {
    let leftProduct = 1
    let rightProduct = 1
    for (num of nums) {
      rightProduct *= num
    }

    for (let i = 0; i < n; i++) {
      rightProduct /= nums[i]
      result[i] = leftProduct * rightProduct
      leftProduct *= nums[i]
    }
  }

  return result
}

// Solution with O(1) extra space AND no division
var productExceptSelf = function (nums) {
  const n = nums.length
  const result = []

  // We first fill the result array with
  // the product of all elements to the left
  let prefix = 1
  for (let i = 0; i < n; i++) {
    result[i] = prefix
    prefix *= nums[i]
  }

  // Now multiply each element of the result array with
  // the product of all elements to the right
  let suffix = 1
  for (i = n - 1; i >= 0; i--) {
    result[i] *= suffix
    suffix *= nums[i]
  }

  return result
}

// Attempt made at 15/03/2024
// (not optimal due to push and unshift)
var productExceptSelf = function (nums) {
  const n = nums.length
  const left_to_right = [1]
  const right_to_left = [1]

  for (let i = 0; i < n; i++) {
    const left_to_right_prod = left_to_right[left_to_right.length - 1]
    const right_to_left_prod = right_to_left[0]

    left_to_right.push(left_to_right_prod * nums[i])
    right_to_left.unshift(right_to_left_prod * nums[n - 1 - i])
  }

  for (let i = 0; i < n; i++) nums[i] = left_to_right[i] * right_to_left[i + 1]

  return nums
}
