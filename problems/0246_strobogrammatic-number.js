/*

Given a string num which represents an integer,
return true if num is a strobogrammatic number.

A strobogrammatic number is a number that looks the same
when rotated 180 degrees (looked at upside down).

Example 1:
  Input: num = "69"
  Output: true

Example 2:
  Input: num = "88"
  Output: true

Example 3:
  Input: num = "962"
  Output: false

Constraints:
- 1 <= num.length <= 50
- num consists of only digits.
- num does not contain any leading zeros except for zero itself.

*/

var isStrobogrammatic = function (num) {
  const mirror = {
    0: 0,
    1: 1,
    6: 9,
    8: 8,
    9: 6,
  }
  const odd_center_candidates = [0, 1, 8]

  const expand_search = (left, right) => {
    let i = 0

    if (left == right) {
      if (!odd_center_candidates.includes(+num[left])) return false
      i++
    }

    while (left - i >= 0 && right + i < num.length) {
      if (mirror[num[left - i]] != num[right + i]) return false
      i++
    }

    return true
  }

  const middle = Math.floor(num.length / 2)
  if (num.length % 2 == 0) return expand_search(middle - 1, middle)
  return expand_search(middle, middle)
}
