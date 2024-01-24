/*


Given a rows x cols screen and a sentence represented as a list of strings,
return the number of times the given sentence can be fitted on the screen.

The order of words in the sentence must remain unchanged, and a word cannot be split into two lines.
A single space must separate two consecutive words in a line.

Example 1:
  Input: sentence = ["hello","world"], rows = 2, cols = 8
  Output: 1
  Explanation:
    hello---
    world---
    The character '-' signifies an empty space on the screen.

Example 2:
  Input: sentence = ["a", "bcd", "e"], rows = 3, cols = 6
  Output: 2
  Explanation:
    a-bcd-
    e-a---
    bcd-e-
    The character '-' signifies an empty space on the screen.

Example 3:
  Input: sentence = ["i","had","apple","pie"], rows = 4, cols = 5
  Output: 1
  Explanation:
    i-had
    apple
    pie-i
    had--
    The character '-' signifies an empty space on the screen.

Constraints:
- 1 <= sentence.length <= 100
- 1 <= sentence[i].length <= 10
- sentence[i] consists of lowercase English letters.
- 1 <= rows, cols <= 2 * 104

*/

var wordsTyping = function (sentence, rows, cols) {
  let k = 0
  let result = 0

  if (sentence.length == 1) {
    const length = sentence[0].length

    let words_in_row = 0
    for (let j = 0; j < cols; ) {
      const remaining = cols - j
      if (remaining < length + (words_in_row == 0 ? 0 : 1)) break
      j += length + (words_in_row == 0 ? 0 : 1)
      words_in_row++

      if (j == cols - 1) break
    }

    return words_in_row * rows
  }

  for (let i = 0; i < rows; i++) {
    let words_in_row = 0

    for (let j = 0; j < cols; ) {
      const remaining = cols - j

      // Our current word does not fit
      if (sentence[k].length + (words_in_row == 0 ? 0 : 1) > remaining) break

      j += sentence[k].length + (words_in_row == 0 ? 0 : 1)
      words_in_row++
      k++

      if (k == sentence.length) {
        result++
        k = 0
      }
    }
  }

  return result
}
