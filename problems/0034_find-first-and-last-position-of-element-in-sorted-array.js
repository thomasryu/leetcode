/*

Given an array of integers nums sorted in non-decreasing order,
find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.

Example 1:
  Input: nums = [5,7,7,8,8,10], target = 8
  Output: [3,4]

Example 2:
  Input: nums = [5,7,7,8,8,10], target = 6
  Output: [-1,-1]

Example 3:
  Input: nums = [], target = 0
  Output: [-1,-1]

Constraints:
- 0 <= nums.length <= 105
- -109 <= nums[i] <= 109
- nums is a non-decreasing array.
- -109 <= target <= 109

*/

// O(log n) approach
var searchRange = function (nums, target) {
  const search = (start, end, position) => {
    if (start > end) return position == 'starting' ? nums.length : -1

    const mid = Math.floor((start + end) / 2)

    // If we find the target, we keep looking for a higher or lower position
    // with the target, depending of which position we are searching
    if (nums[mid] == target) {
      if (position == 'starting')
        return Math.min(mid, search(start, mid - 1, position))
      else return Math.max(mid, search(mid + 1, end, position))
    }

    // Else we follow standard binary search procedure
    if (nums[mid] > target) return search(start, mid - 1, position)
    else return search(mid + 1, end, position)
  }

  const starting = search(0, nums.length - 1, 'starting')
  const ending = search(0, nums.length - 1, 'ending')

  return [starting == nums.length ? -1 : starting, ending]
}

// O(n) approach
var searchRange = function (nums, target) {
  let start = -1
  let count = 0

  for (let i = 0; i < nums.length; i++)
    if (nums[i] == target) {
      if (start == -1) start = i
      else count++
    }

  return [start, start + count]
}
