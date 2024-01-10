/*

You are given an array of integers nums, there is a sliding window of size k
which is moving from the very left of the array to the very right.
You can only see the k numbers in the window.
Each time the sliding window moves right by one position.

Return the max sliding window.

Example 1:
  Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
  Output: [3,3,5,5,6,7]
  Explanation:
    Window position                Max
    ---------------               -----
    [1  3  -1] -3  5  3  6  7       3
    1 [3  -1  -3] 5  3  6  7       3
    1  3 [-1  -3  5] 3  6  7       5
    1  3  -1 [-3  5  3] 6  7       5
    1  3  -1  -3 [5  3  6] 7       6
    1  3  -1  -3  5 [3  6  7]      7

Example 2:
  Input: nums = [1], k = 1
  Output: [1]

Constraints:
- 1 <= nums.length <= 105
- -104 <= nums[i] <= 104
- 1 <= k <= nums.length

*/

// Heap solution (great performance, bad space)
var maxSlidingWindow = function (nums, k) {
  const result = []

  // 0: number itself, 1: the number's index
  const heap = new MaxPriorityQueue({ priority: (el) => el[0] })
  for (let i = 0; i < k - 1; i++) heap.enqueue([nums[i], i])

  for (let i = k - 1; i < nums.length; i++) {
    heap.enqueue([nums[i], i])
    while (heap.front().element[1] + k <= i) heap.dequeue()
    result.push(heap.front().element[0])
  }

  return result
}

// Monotonic queue solution
var maxSlidingWindow = function (nums, k) {
  const result = []
  const mono = []

  for (let i = 0; i < nums.length; i++) {
    while (mono.length && mono[mono.length - 1] < nums[i]) mono.pop()
    mono.push(nums[i])

    // If our window reach size k
    if (i + 1 >= k) {
      result.push(mono[0])

      // If the number that is leaving our window is the
      // top of our monotonic queue, we need to remove it
      if (mono[0] == nums[i + 1 - k]) mono.shift()
    }
  }

  return result
}
