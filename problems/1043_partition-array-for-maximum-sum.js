/*

Given an integer array arr, partition the array into (contiguous) subarrays of length at most k.
After partitioning, each subarray has their values changed to become the maximum value of that subarray.

Return the largest sum of the given array after partitioning.
Test cases are generated so that the answer fits in a 32-bit integer.

Example 1:
  Input: arr = [1,15,7,9,2,5,10], k = 3
  Output: 84
  Explanation: arr becomes [15,15,15,9,10,10,10]

Example 2:
  Input: arr = [1,4,1,5,7,3,6,1,9,9,3], k = 4
  Output: 83

Example 3:
  Input: arr = [1], k = 1
  Output: 1

Constraints:
- 1 <= arr.length <= 500
- 0 <= arr[i] <= 109
- 1 <= k <= arr.length

*/

var maxSumAfterPartitioning = function (arr, k) {
  const dp = Array(arr.length).fill(-1) // dp[i] gives me the maximum sum for arr[i...(n - 1)]

  // Helper function that gets me the partition sum starting from start and using length elements
  const get_partition_sum = (start, length) => {
    if (length == 1) return arr[start]
    let max = -1
    for (let i = 0; i < length; i++) max = Math.max(max, arr[start + i])
    return max * length
  }

  // Recursive function that tests all k possible partion sizes, starting from start
  const test_partition = (start) => {
    if (start == arr.length) return 0
    if (dp[start] >= 0) return dp[start]

    let max = -1
    for (let i = 1; i <= k && start + i <= arr.length; i++) {
      const partition_sum = get_partition_sum(start, i)
      max = Math.max(max, partition_sum + test_partition(start + i))
    }

    dp[start] = max
    return max
  }

  const result = test_partition(0, 0)
  return result
}
