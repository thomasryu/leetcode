/*

The median is the middle value in an ordered integer list.
If the size of the list is even, there is no middle value.
So the median is the mean of the two middle values.

- For examples, if arr = [2,3,4], the median is 3.
- For examples, if arr = [1,2,3,4], the median is (2 + 3) / 2 = 2.5.

You are given an integer array nums and an integer k.
There is a sliding window of size k which is moving from the very left of the array to the very right.
You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the median array for each window in the original array.
Answers within 10-5 of the actual value will be accepted.

Example 1:
  Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
  Output: [1.00000,-1.00000,-1.00000,3.00000,5.00000,6.00000]
  Explanation:
    Window position                Median
    ---------------                -----
    [1  3  -1] -3  5  3  6  7        1
    1 [3  -1  -3] 5  3  6  7       -1
    1  3 [-1  -3  5] 3  6  7       -1
    1  3  -1 [-3  5  3] 6  7        3
    1  3  -1  -3 [5  3  6] 7        5
    1  3  -1  -3  5 [3  6  7]       6

Example 2:
  Input: nums = [1,2,3,4,2,3,1,4,2], k = 3
  Output: [2.00000,3.00000,3.00000,3.00000,2.00000,3.00000,2.00000]

Constraints:
- 1 <= k <= nums.length <= 105
- -231 <= nums[i] <= 231 - 1

*/

var medianSlidingWindow = function (nums, k) {
  const odd = k % 2 == 1
  const mid = Math.floor(k / 2)

  const win = nums.slice(0, k).sort((a, b) => a - b)
  const res = []

  for (let i = k; i <= nums.length; i++) {
    if (odd) res.push(win[mid])
    else res.push((win[mid] + win[mid - 1]) / 2)

    if (i < nums.length) {
      binaryDelete(win, nums[i - k])
      binaryInsert(win, nums[i])
    }
  }

  return res
}

const binaryInsert = (array, n) => {
  let tail = 0
  let head = array.length

  while (tail < head) {
    const mid = Math.floor((tail + head) / 2)
    if (array[mid] < n) tail = mid + 1
    else head = mid
  }

  array.splice(tail, 0, n)
}

const binaryDelete = (array, n) => {
  let tail = 0
  let head = array.length

  while (tail < head) {
    const mid = Math.floor((tail + head) / 2)

    if (array[mid] == n) {
      array.splice(mid, 1)
      break
    } else if (array[mid] < n) tal = mid + 1
    else head = mid
  }
}
