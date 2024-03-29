/*

You are given an integer array nums and a positive integer k.

Return the number of subarrays where the maximum element
of nums appears at least k times in that subarray.

A subarray is a contiguous sequence of elements within an array.

Example 1:
  Input: nums = [1,3,2,3,3], k = 2
  Output: 6
  Explanation: The subarrays that contain the element 3 at least 2 times are:
    [1,3,2,3], [1,3,2,3,3], [3,2,3], [3,2,3,3], [2,3,3] and [3,3].

Example 2:
  Input: nums = [1,4,2,1], k = 3
  Output: 0
  Explanation: No subarray contains the element 4 at least 3 times.

Constraints:
- 1 <= nums.length <= 105
- 1 <= nums[i] <= 106
- 1 <= k <= 105

*/

var countSubarrays = function (nums, k) {
  const n = nums.length
  let max = -1
  let map = new Map()

  // Map each element to their positions
  for (let i = 0; i < n; i++) {
    const num = nums[i]
    max = Math.max(max, num)
    if (!map.has(num)) map.set(num, [])
    map.get(num).push(i)
  }

  // Get the positions of the max element
  const max_array = map.get(max)
  if (max_array.length < k) return 0

  let left = -1
  let right = n

  // Get the first minimal window that
  // contains k max elements
  let i = 0
  let j = k - 1

  let result = 0

  // For each window, we can add every combinatorial permutation to the result,
  // considering the leftover numbers to the left and right of it

  // (For example, for nums = [1, 2, 4, 3], k = 1), we have 2 elements to the left
  // and 1 element to the right of 4. Considering 4 alone is a possibility, we have
  // 3 combinations to the left and 2 to the right, 6 in total)

  // In order for the possibilities of each window to not overlap, a following window
  // only takes into account an array starting from the previous max (non inclusive)
  // (For example, for nums = [1, 2, 4, 3, 4, 1], k = 1), for the first 4 we take into
  // account the entire array in order to calculate the combinations. However for the
  // second one, we take into account the subarray [3, 4, 1], else their combinations
  // would overlap)
  while (j < max_array.length) {
    const first_max = max_array[i]
    const last_max = max_array[j]

    result += (first_max - left) * (right - last_max)
    left = first_max
    i++
    j++
  }

  return result
}
