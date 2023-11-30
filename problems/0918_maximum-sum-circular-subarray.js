/*

Given a circular integer array nums of length n,
return the maximum possible sum of a non-empty subarray of nums.

A circular array means the end of the array connects to the beginning of the array.
Formally, the next element of nums[i] is nums[(i + 1) % n] and the previous element of nums[i] is nums[(i - 1 + n) % n].

A subarray may only include each element of the fixed buffer nums at most once.
Formally, for a subarray nums[i], nums[i + 1], ..., nums[j], there does not exist i <= k1, k2 <= j with k1 % n == k2 % n.

Example 1:
  Input: nums = [1,-2,3,-2]
  Output: 3
  Explanation: Subarray [3] has maximum sum 3.

Example 2:
  Input: nums = [5,-3,5]
  Output: 10
  Explanation: Subarray [5,5] has maximum sum 5 + 5 = 10.

Example 3:
  Input: nums = [-3,-2,-3]
  Output: -2
  Explanation: Subarray [-2] has maximum sum -2.

Constraints:
- n == nums.length
- 1 <= n <= 3 * 104
- -3 * 104 <= nums[i] <= 3 * 104

*/

// Inefficient solution
var maxSubarraySumCircular = function (nums) {
  let result = nums[0]

  // We test every permutation of nums
  for (let num of nums) {
    nums.push(nums.shift())
    let sum = nums[0]

    for (let i = 1; i < nums.length; i++) {
      if (sum + nums[i] < nums[i]) {
        sum = nums[i]
        start = i
      } else sum += nums[i]
      result = Math.max(result, sum)
    }
  }

  return result
}

// Efficient solution
var maxSubarraySumCircular = function (nums) {
  let total = nums[0]

  let localMax = nums[0]
  let globalMax = nums[0]

  let localMin = nums[0]
  let globalMin = nums[0]

  // globalMin gives me the lowest sum of the elements of a subarray of nums

  // The logic here is, if the highest sums subarray utilizes the circularity of the array,
  // then it its the gap of the globalMin subarray that splits its end on the left from its start on the right

  // The exception here is, of course if all elements of nums are negative,
  // in which case total - globalMin = 0, since both will be the sum of all elements of nums
  // so we immediately choose globalMax

  for (let i = 1; i < nums.length; i++) {
    const current = nums[i]
    total += current

    localMax = Math.max(localMax + current, current)
    globalMax = Math.max(globalMax, localMax)

    localMin = Math.min(localMin + current, current)
    globalMin = Math.min(globalMin, localMin)
  }

  return globalMax < 0 ? globalMax : Math.max(globalMax, total - globalMin)
}
