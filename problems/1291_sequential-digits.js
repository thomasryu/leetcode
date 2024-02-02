/*

An integer has sequential digits if and only if each digit
in the number is one more than the previous digit.

Return a sorted list of all the integers in the range [low, high]
inclusive that have sequential digits.

Example 1:
  Input: low = 100, high = 300
  Output: [123,234]

Example 2:
  Input: low = 1000, high = 13000
  Output: [1234,2345,3456,4567,5678,6789,12345]

Constraints:
- 10 <= low <= high <= 10^9

*/

var sequentialDigits = function (low, high) {
  const result = []

  const add_digit = (start, old_number) => {
    if (start > 9) return
    let new_number

    if (!old_number) new_number = start
    else new_number = 10 * old_number + start

    if (new_number > high) return
    if (new_number >= low) result.push(new_number)

    add_digit(start + 1, new_number)
  }

  for (let i = 1; i <= 9; i++) add_digit(i)
  return result.sort((a, b) => a - b)
}
