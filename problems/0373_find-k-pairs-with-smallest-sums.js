/*

You are given two integer arrays nums1 and nums2 sorted in non-decreasing order and an integer k.

Define a pair (u, v) which consists of one element from the first array and one element from the second array.

Return the k pairs (u1, v1), (u2, v2), ..., (uk, vk) with the smallest sums.

Example 1:
  Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
  Output: [[1,2],[1,4],[1,6]]
  Explanation: The first 3 pairs are returned from the sequence:
               [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]

Example 2:
  Input: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
  Output: [[1,1],[1,1]]
  Explanation: The first 2 pairs are returned from the sequence:
               [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]

Example 3:
  Input: nums1 = [1,2], nums2 = [3], k = 3
  Output: [[1,3],[2,3]]
  Explanation: All possible pairs are returned from the sequence: [1,3],[2,3]

Constraints:
- 1 <= nums1.length, nums2.length <= 105
- -109 <= nums1[i], nums2[i] <= 109
- nums1 and nums2 both are sorted in non-decreasing order.
- 1 <= k <= 104

*/

var kSmallestPairs = function (nums1, nums2, k) {
  if (nums1.length == 0 || nums2.length == 0) return []

  const result = []

  // array[i] will have the format [nums1[i] + nums2[j], i, j]
  const heap = new MinPriorityQueue({ priority: (array) => array[0] })

  // We initialize our min heap with every pair of [nums1[i], nums2[0]]
  for (let i = 0; i < nums1.length; i++)
    heap.enqueue([nums1[i] + nums2[0], i, 0])

  // The smallest priority element will always be included in our heap
  while (k-- && !heap.isEmpty()) {
    const [_, i, j] = heap.dequeue().element
    result.push([nums1[i], nums2[j]])

    // But what we do is also add the possibility of [nums1[i], nums2[j + 1]]
    // to also be a contender in our heap's next dequeue
    if (j + 1 < nums2.length) heap.enqueue([nums1[i] + nums2[j + 1], i, j + 1])
  }

  return result
}
