/*

Given an integer n,
return the number of trailing zeroes in n!.

Note that n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1.

Example 1:
  Input: n = 3
  Output: 0
  Explanation: 3! = 6, no trailing zero.

Example 2:
  Input: n = 5
  Output: 1
  Explanation: 5! = 120, one trailing zero.

Example 3:
  Input: n = 0
  Output: 0

Constraints:
- 0 <= n <= 104

Follow up: Could you write a solution that works in logarithmic time complexity?

*/

// Basic solution (fails for big numbers because of "e" notation)
var trailingZeroes = function (n) {
  let factorial = 1

  while (n > 1) {
    factorial *= n
    n--
  }

  let result = 0
  while (factorial > 0 && factorial % 10 == 0) {
    factorial = Math.floor(factorial / 10)
    result++
  }

  return result
}

var trailingZeroes = function (n) {
  // The trick here is to realize the number of 0s increase
  // every time we pass through a multiple of 5

  // Every multiple of 5 we go through increases the number
  // of trailing 0s by 1. However, every multiple of 25
  // increase it by 2, and 125 by 3 and so on...

  // So we just go through each power of 5, divide n by it
  // (to obtain how many multiples of said power there are),
  // and increase the count accordingly
  let result = 0
  for (let i = 1; 5 ** i <= n; i++) {
    result += Math.floor(n / 5 ** i)
  }

  return result
}
