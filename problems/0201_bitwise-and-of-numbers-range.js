/*

Given two integers left and right that represent the range [left, right],
return the bitwise AND of all numbers in this range, inclusive.

Example 1:
  Input: left = 5, right = 7
  Output: 4

Example 2:
  Input: left = 0, right = 0
  Output: 0

Example 3:
  Input: left = 1, right = 2147483647
  Output: 0

Constraints:
- 0 <= left <= right <= 231 - 1

*/

var rangeBitwiseAnd = function (left, right) {
  let count = 0

  // We basically shift the binary representation
  // of left and right until they are equal
  while (left != right) {
    left = left >> 1
    right = right >> 1
    count++
  }

  // And return the unshifted version, but with
  // leading 0s on the right
  return left << count
}
