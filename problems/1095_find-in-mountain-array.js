/*

(This problem is an interactive problem.)

You may recall that an array arr is a mountain array if and only if:

- arr.length >= 3
- There exists some i with 0 < i < arr.length - 1 such that:
- arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
- arr[i] > arr[i + 1] > ... > arr[arr.length - 1]

Given a mountain array mountainArr, return the minimum index
such that mountainArr.get(index) == target.
If such an index does not exist, return -1.

You cannot access the mountain array directly.
You may only access the array using a MountainArray interface:

- MountainArray.get(k) returns the element of the array at index k (0-indexed).
- MountainArray.length() returns the length of the array.

Submissions making more than 100 calls to MountainArray.get will be judged Wrong Answer.
Also, any solutions that attempt to circumvent the judge will result in disqualification.

Example 1:
  Input: array = [1,2,3,4,5,3,1], target = 3
  Output: 2
  Explanation: 3 exists in the array, at index=2 and index=5.
               Return the minimum index, which is 2.

Example 2:
  Input: array = [0,1,2,4,2,1], target = 3
  Output: -1
  Explanation: 3 does not exist in the array, so we return -1.

Constraints:
- 3 <= mountain_arr.length() <= 104
- 0 <= target <= 109
- 0 <= mountain_arr.get(index) <= 109

*/

/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * function MountainArray() {
 *     @param {number} index
 *     @return {number}
 *     this.get = function(index) {
 *         ...
 *     };
 *
 *     @return {number}
 *     this.length = function() {
 *         ...
 *     };
 * };
 */

const binary_search = (left, right, target, side, mountainArr) => {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    if (mountainArr.get(mid) == target) return mid
    if (mountainArr.get(mid) > target) {
      if (side == 'left') right = mid - 1
      else left = mid + 1
    } else {
      if (side == 'left') left = mid + 1
      else right = mid - 1
    }
  }

  return -1
}

const find_peak = (mountainArr) => {
  let left = 0
  let right = mountainArr.length() - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    const mid_val = mountainArr.get(mid)
    const left_val = mountainArr.get(mid - 1)
    const right_val = mountainArr.get(mid + 1)

    if (mid_val > left_val && mid_val > right_val) return mid
    if (mid_val < right_val) left = mid + 1
    else right = mid - 1
  }

  return -1
}

var findInMountainArray = function (target, mountainArr) {
  const peak_index = find_peak(mountainArr)
  if (mountainArr.get(peak_index) == target) return peak_index

  const left_index = binary_search(0, peak_index - 1, target, 'left', mountainArr)
  const right_index = binary_search(peak_index + 1, mountainArr.length(), target, 'right', mountainArr)

  return left_index > -1 ? left_index : right_index
}
