/*

Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
The overall run time complexity should be O(log (m+n)).

Example 1:
  Input: nums1 = [1,3], nums2 = [2]
  Output: 2.00000
  Explanation: merged array = [1,2,3] and median is 2.

Example 2:
  Input: nums1 = [1,2], nums2 = [3,4]
  Output: 2.50000
  Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

Constraints:
- nums1.length == m
- nums2.length == n
- 0 <= m <= 1000
- 0 <= n <= 1000
- 1 <= m + n <= 2000
- -106 <= nums1[i], nums2[i] <= 106

*/

// O(n) solution
var findMedianSortedArrays = function (nums1, nums2) {
  const m = nums1.length
  const n = nums2.length

  const merge = []

  for (let i = 0; i <= Math.floor((m + n) / 2); i++) {
    if (nums1[0] <= nums2[0] || nums2.length == 0) {
      merge[i] = nums1.shift()
    } else {
      merge[i] = nums2.shift()
    }
  }

  if ((m + n) % 2 == 0) {
    return (merge[merge.length - 1] + merge[merge.length - 2]) / 2
  } else {
    return merge[merge.length - 1]
  }
}
