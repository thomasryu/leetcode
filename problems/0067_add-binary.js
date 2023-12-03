/*

Given two binary strings a and b,
return their sum as a binary string.

Example 1:
  Input: a = "11", b = "1"
  Output: "100"

Example 2:
  Input: a = "1010", b = "1011"
  Output: "10101"

Constraints:
- 1 <= a.length, b.length <= 104
- a and b consist only of '0' or '1' characters.
- Each string does not contain leading zeros except for the zero itself.

*/

var addBinary = function (a, b) {
  const m = a.length
  const n = b.length

  let overflow = 0
  let result = ''

  let i = 1
  while (i <= m || i <= n) {
    const aBit = +a[m - i] || 0
    const bBit = +b[n - i] || 0

    const sum = aBit + bBit + overflow
    overflow = sum > 1 ? 1 : 0
    result = (sum % 2) + result

    i++
  }

  if (overflow == 1) result = '1' + result

  return `${result}`
}
