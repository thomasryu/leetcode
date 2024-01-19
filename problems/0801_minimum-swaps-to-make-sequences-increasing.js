/*

You are given two integer arrays of the same length nums1 and nums2.
In one operation, you are allowed to swap nums1[i] with nums2[i].

- For example, if nums1 = [1,2,3,8], and nums2 = [5,6,7,4],
  you can swap the element at i = 3 to obtain nums1 = [1,2,3,4] and nums2 = [5,6,7,8].

Return the minimum number of needed operations to make nums1 and nums2 strictly increasing.
The test cases are generated so that the given input always makes it possible.

An array arr is strictly increasing if and only if arr[0] < arr[1] < arr[2] < ... < arr[arr.length - 1].

Example 1:
  Input: nums1 = [1,3,5,4], nums2 = [1,2,3,7]
  Output: 1
  Explanation:
    Swap nums1[3] and nums2[3]. Then the sequences are:
    nums1 = [1, 3, 5, 7] and nums2 = [1, 2, 3, 4]
    which are both strictly increasing.

Example 2:
  Input: nums1 = [0,3,5,8,9], nums2 = [2,1,4,6,9]
  Output: 1

Constraints:
- 2 <= nums1.length <= 105
- nums2.length == nums1.length
- 0 <= nums1[i], nums2[i] <= 2 * 105

*/

var minSwap = function (nums1, nums2) {
  const dp = [0, 1] // 0: min cost of not swaping, 1: min cost of swaping

  for (let i = 1; i < nums1.length; i++) {
    // Each swap only depends on the previous element
    // so there are four states we need to compare:
    const options = [Infinity, Infinity, Infinity, Infinity]

    // 1. Not swapping both current and previous element
    if (nums1[i - 1] < nums1[i] && nums2[i - 1] < nums2[i]) options[0] = dp[0]

    // 2. Swapping previous, but not swapping current
    if (nums2[i - 1] < nums1[i] && nums1[i - 1] < nums2[i]) options[1] = dp[1]

    // 3. Not swapping current, but swapping previous element
    if (nums1[i - 1] < nums2[i] && nums2[i - 1] < nums1[i]) options[2] = dp[0] + 1

    // 2. Swapping both current and previous numbers
    if (nums2[i - 1] < nums2[i] && nums1[i - 1] < nums1[i]) options[3] = dp[1] + 1

    dp[0] = Math.min(options[0], options[1])
    dp[1] = Math.min(options[2], options[3])
  }

  return Math.min(dp[0], dp[1])
}
