/*

Given an array of integers nums and an integer k,
return the number of contiguous subarrays where the product of all the elements
in the subarray is strictly less than k.

Example 1:
  Input: nums = [10,5,2,6], k = 100
  Output: 8
  Explanation: The 8 subarrays that have product less than 100 are:
    [10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]
    Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.

Example 2:
  Input: nums = [1,2,3], k = 0
  Output: 0

Constraints:
- 1 <= nums.length <= 3 * 104
- 1 <= nums[i] <= 1000
- 0 <= k <= 106

*/

var numSubarrayProductLessThanK = function (nums, k) {
  nums.unshift(1)

  let curr_prod = 1 // Empty array has a product 1
  let result = 0

  // i is the first element whose product from ]i, j]
  // has a product less than k
  let i = 0

  // For each j, we check how many subarrays that end
  // in nums[j] have a product less than k
  for (let j = 1; j < nums.length; j++) {
    curr_prod *= nums[j]
    while (i < j && curr_prod >= k) curr_prod /= nums[++i]

    // Since every variation of the array between ]i, j]
    // (i.e. ]i + 1, j], ]i + 2, j], etc) also has a product less than k,
    // we also add them to the result count
    if (i < j) result += j - i
  }

  return result
}
