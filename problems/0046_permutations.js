/*

Given an array nums of distinct integers, return all the possible permutations.
You can return the answer in any order.

Example 1:
  Input: nums = [1,2,3]
  Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

Example 2:
  Input: nums = [0,1]
  Output: [[0,1],[1,0]]

Example 3:
  Input: nums = [1]
  Output: [[1]]

Constraints:
- 1 <= nums.length <= 6
- -10 <= nums[i] <= 10
- All the integers of nums are unique.

*/

var permute = function (nums) {
  const n = nums.length
  const result = []

  const permutation = (current) => {
    if (current.length == n) result.push([...current])

    // For each element x of nums
    // 1. Add x to the current permutation array
    // 2. Remove x from the nums array
    // 3. Recursively call permutation() with the remaining nums
    // 4. Remove x from the permutation array and add it back
    //    to nums when completing the permutation
    for (let i = 0; i < nums.length; i++) {
      current.push(nums.splice(i, 1)[0])
      permutation(current)
      nums.splice(i, 0, current.pop())
    }
  }

  permutation([])
  return result
}
