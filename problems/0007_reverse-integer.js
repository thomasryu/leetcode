/*

Given a signed 32-bit integer x, return x with its digits reversed.
If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.
Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

Example 1:
  Input: x = 123
  Output: 321

Example 2:
  Input: x = -123
  Output: -321

Example 3:
  Input: x = 120
  Output: 21

Constraints:
-  -(2ˆ31) <= x <= 2ˆ31 - 1

*/

// Answer with bad space performance
var reverse = function (x) {
  const MAX_INTEGER = '2147483648'.split('')

  let signal = ''
  if (x < 0) {
    signal = '-'
    x *= -1
  }
  const array = x.toString().split('').reverse()

  if (array.length > MAX_INTEGER.length) return 0
  if (array.length == MAX_INTEGER.length) {
    for (let i = 0; i < array.length; i++) {
      if (+array[i] < +MAX_INTEGER[i]) break
      if (+array[i] > +MAX_INTEGER[i]) return 0
    }
  }

  array.unshift(signal)
  return array.join('')
}

// Optimized solution
var reverse = function (x) {
  let result = 0

  const signal = x < 0 ? -1 : 1
  x *= signal

  while (x > 0) {
    const digit = x % 10
    x = Math.floor(x / 10)
    result = result * 10 + digit
    if (result < -(2 ** 31) || result > 2 ** 31 - 1) return 0
  }

  return signal * result
}
