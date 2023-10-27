/*

The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this:
(you may want to display this pattern in a fixed font for better legibility)

P   A   H   N
A P L S I I G
Y   I   R

And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:
  string convert(string s, int numRows);

Example 1:
  Input: s = "PAYPALISHIRING", numRows = 3
  Output: "PAHNAPLSIIGYIR"

Example 2:
  Input: s = "PAYPALISHIRING", numRows = 4
  Output: "PINALSIGYAHRPI"

Explanation:

P     I    N
A   L S  I G
Y A   H R
P     I

Example 3:
  Input: s = "A", numRows = 1
  Output: "A"

Constraints:
- 1 <= s.length <= 1000
- s consists of English letters (lower-case and upper-case), ',' and '.'.
- 1 <= numRows <= 1000

*/

// Very inneficient in performance and space
var convert = function (s, numRows) {
  if (numRows == 1) return s

  const columns = []
  const array = [...s]

  // We build a structure similar to the visual representation of the zigzag
  let currentColumn = 0
  while (array.length > 0) {
    const column = Array(numRows).fill('')

    // The column with numRows elements
    if (currentColumn % (numRows - 1) == 0) {
      for (let i = 0; i < numRows; i++) {
        if (array.length == 0) break
        column[i] = array.shift()
      }
    }
    // The diagonal leading to the vertical line
    else {
      column[numRows - (currentColumn % (numRows - 1)) - 1] = array.shift()
    }

    columns.push(column)
    currentColumn++
  }

  const result = []
  for (let i = 0; i < numRows * columns.length; i++) {
    result.push(columns[i % columns.length][Math.floor(i / columns.length)])
  }

  return result.join('')
}

// Cleaner code, worse runtime
var convert = function (s, numRows) {
  if (numRows == 1 || s.length < numRows) return s

  // Instead of a row representation, we do a row one and
  // flatten and join them at the end.
  let result = Array(numRows)
    .fill()
    .map((_) => Array())

  let row = 0
  let step = -1

  s.split('').forEach((c, i) => {
    result[row]?.push(c)
    if (i % (numRows - 1) == 0) {
      step *= -1
    }
    row += step
  })

  return result.flat().join('')
}
