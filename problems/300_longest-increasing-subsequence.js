/*

Given an integer array nums, return the length of
the longest strictly increasing subsequence.

Example 1:
  Input: nums = [10,9,2,5,3,7,101,18]
  Output: 4
  Explanation: The longest increasing subsequence
               is [2,3,7,101], therefore the length is 4.

Example 2:
  Input: nums = [0,1,0,3,2,3]
  Output: 4
  
Example 3:
  Input: nums = [7,7,7,7,7,7,7]
  Output: 1

Constraints:
- 1 <= nums.length <= 2500
- -104 <= nums[i] <= 104

Follow up: Can you come up with an algorithm
           that runs in O(n log(n)) time complexity?

*/

// Suboptimal solution (time limit exceeded)
var lengthOfLIS = function(nums) {
  let result = 1
  const search = (start, lastNum, currLength) => {
    for (let i = start; i < nums.length; i++) {
      let length = currLength          
      if (nums[i] <= lastNum) length = 0

      search(i + 1, nums[i], length + 1)
      result = Math.max(result, length + 1)
    }
 }

  search(1, nums[0], 1)
  return result
}

// Optimal solution (binary search)
var lengthOfLIS = function(nums) {
  // potato[] is not the LIS itself, but what its import is it stores,
  // at every iteration, the lowest possible last element for the LIS
  // in potato[size - 1], which helps us find LIS
  const potato = Array(nums.length)
  let size = 0

  // For each number of nums[], we will find
  // its position in potato[]
  for (let num of nums) {
    let head = size
    let tails = 0

    // The only way potato's length increases is if
    // num is higher than all elements of it, else 
    // it will only replace one of its elements.
    while (head != tails) {
      const mid = Math.floor((head + tails) / 2)
      if (potato[mid] < num) tails = mid + 1
      else head = mid
    }

    potato[head] = num
    if (head == size) size++
  }

  return size
}
