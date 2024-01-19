/*

A confusing number is a number that when rotated 180 degrees
becomes a different number with each digit valid.

We can rotate digits of a number by 180 degrees to form new digits.

- When 0, 1, 6, 8, and 9 are rotated 180 degrees, they become 0, 1, 9, 8, and 6 respectively.
- When 2, 3, 4, 5, and 7 are rotated 180 degrees, they become invalid.
- Note that after rotating a number, we can ignore leading zeros.

For example, after rotating 8000, we have 0008 which is considered as just 8.
Given an integer n, return the number of confusing numbers in the inclusive range [1, n].

Example 1:
  Input: n = 20
  Output: 6
  Explanation: The confusing numbers are [6,9,10,16,18,19].
    6 converts to 9.
    9 converts to 6.
    10 converts to 01 which is just 1.
    16 converts to 91.
    18 converts to 81.
    19 converts to 61.

Example 2:
  Input: n = 100
  Output: 19
  Explanation: The confusing numbers are
               [6,9,10,16,18,19,60,61,66,68,80,81,86,89,90,91,98,99,100].

Constraints:
- 1 <= n <= 109

*/

var confusingNumberII = function (n) {
  const mirrored = {
    0: 0,
    1: 1,
    6: 9,
    8: 8,
    9: 6,
  }

  let result = 0

  // We don't need to traverse every single integer from 1 to n
  // we just need to keep adding our mirror digits to the current number
  const get_mirror = (num_string) => {
    if (+num_string > n) return
    const num_length = num_string.length

    // Check if our number is not the same rotated
    let same_rotated = true
    for (let i = 0; i <= nnum_length - 1 - i; i++)
      if (num_string[i] != mirrored[num_string[num_length - 1 - i]]) same_rotated = false

    // Increment our count if it isn't
    if (!same_rotated) result++

    // Add each mirror digit to our current number
    for (let digit in mirrored) get_mirror(num_string + digit)
  }

  // We skip 0 because its a perfect rotation and
  // it leads to 0, 00, 000, ... which breaks our program
  for (let digit in mirrored) {
    if (digit == 0) continue
    get_mirror(digit)
  }
  return result
}
