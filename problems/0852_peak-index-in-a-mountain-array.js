/*

An array arr is a mountain if the following properties hold:

- arr.length >= 3
- There exists some i with 0 < i < arr.length - 1 such that:
- arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
- arr[i] > arr[i + 1] > ... > arr[arr.length - 1]

Given a mountain array arr, return the index i such that
arr[0] < arr[1] < ... < arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1].

You must solve it in O(log(arr.length)) time complexity.

Example 1:
  Input: arr = [0,1,0]
  Output: 1

Example 2:
  Input: arr = [0,2,1,0]
  Output: 1

Example 3:
  Input: arr = [0,10,5,2]
  Output: 1

Constraints:
- 3 <= arr.length <= 105
- 0 <= arr[i] <= 106
- arr is guaranteed to be a mountain array.

*/

var peakIndexInMountainArray = function (arr) {
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    const mid_val = arr[mid]
    const left_val = arr[mid - 1]
    const right_val = arr[mid + 1]

    if (mid_val > left_val && mid_val > right_val) return mid
    if (mid_val < right_val) left = mid + 1
    else right = mid - 1
  }

  return -1
}
