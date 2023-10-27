/*

Given an integer x, return true if x is a palindrome, and false otherwise.

Example 1:
  Input: x = 121
  Output: true
  Explanation: 121 reads as 121 from left to right and from right to left.

Example 2:
  Input: x = -121
  Output: false
  Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

Example 3:
  Input: x = 10
  Output: false
  Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

Constraints:
- -231 <= x <= 231 - 1

*/

// Bad storage solution
var isPalindrome = function (x) {
  if (x < 0) return false

  const n = x.toString().split('')

  let i = 0
  let j = n.length - 1

  while (i <= j) {
    if (n[i] != n[j]) return false
    i++
    j--
  }

  return true
}

// Better O(1) storage solution
var isPalindrome = function (x) {
  if (x < 0) return false

  let copy = x
  let reverse = 0

  while (copy > 0) {
    reverse *= 10
    reverse += copy % 10
    copy = Math.floor(copy / 10)
  }

  return x == reverse
}
