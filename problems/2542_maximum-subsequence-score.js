/*

You are given two 0-indexed integer arrays nums1 and nums2
of equal length n and a positive integer k.
You must choose a subsequence of indices from nums1 of length k.

For chosen indices i0, i1, ..., ik - 1, your score is defined as:

- The sum of the selected elements from nums1 multiplied
  with the minimum of the selected elements from nums2.
- It can defined simply as:
  (nums1[i0] + nums1[i1] +...+ nums1[ik - 1]) * min(nums2[i0] , nums2[i1], ... ,nums2[ik - 1]).

Return the maximum possible score.

A subsequence of indices of an array is a set that can be derived from the set
{0, 1, ..., n-1} by deleting some or no elements.

Example 1:
  Input: nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3
  Output: 12
  Explanation:
    The four possible subsequence scores are:
    - We choose the indices 0, 1, and 2 with score = (1+3+3) * min(2,1,3) = 7.
    - We choose the indices 0, 1, and 3 with score = (1+3+2) * min(2,1,4) = 6.
    - We choose the indices 0, 2, and 3 with score = (1+3+2) * min(2,3,4) = 12.
    - We choose the indices 1, 2, and 3 with score = (3+3+2) * min(1,3,4) = 8.
    Therefore, we return the max score, which is 12.

Example 2:
  Input: nums1 = [4,2,3,1,1], nums2 = [7,5,10,9,6], k = 1
  Output: 30
  Explanation:
    Choosing index 2 is optimal: nums1[2] * nums2[2] = 3 * 10 = 30
    is the maximum possible score.


Constraints:
- n == nums1.length == nums2.length
- 1 <= n <= 105
- 0 <= nums1[i], nums2[j] <= 105
- 1 <= k <= n

*/

// Unoptimal solution (time limit exceeded)
var maxScore = function (nums1, nums2, k) {
  let result = 0

  // We keep a history of all nums2 values used
  // so we pop them using a backtrack after they're used
  let multiplier = [Infinity]

  const addScore = (start, size, sum) => {
    if (size == k) {
      result = Math.max(result, sum * multiplier[0])
      return
    }

    for (let i = start; i <= nums1.length - (k - size); i++) {
      // We only add and backtrack a nums2 value
      // if its smaller than current smallest
      const added = nums2[i] < multiplier[0]
      added && multiplier.unshift(nums2[i])
      addScore(i + 1, size + 1, sum + nums1[i])
      added && multiplier.shift()
    }
  }

  addScore(0, 0, 0)
  return result
}

// Optimized solution
var maxScore = function (nums1, nums2, k) {
  let result = 0

  let sum = 0
  let heap = new MinPriorityQueue({ priority: (element) => element })

  const merged = nums1.map((nums1Val, i) => [nums1Val, nums2[i]])
  merged.sort((a, b) => b[1] - a[1])

  // Since we sort merged by nums2, currNum2 holds the
  // current maximum value of nums2 for merged[0] ... merged[i]
  for (const [currNum1, currNum2] of merged) {
    if (heap.size() === k) sum -= heap.dequeue().element

    sum += currNum1
    heap.enqueue(currNum1)

    if (heap.size() === k) result = Math.max(result, sum * currNum2)
  }

  return result
}
