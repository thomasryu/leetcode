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

// Unoptimized brute force solution
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

const wordsTyping = (sentence, rows, cols) => {
  const sentence_length = sentence.length
  const next_row_word = Array(sentence_length)
  const fit_times = Array(sentence_length)

  for (let i = 0; i < sentence_length; i++) {
    let curr_word = i
    let curr_length = 0
    let curr_fit_times = 0

    // While there is space in the row, add our words
    while (curr_length + sentence[curr_word].length <= cols) {
      curr_length += sentence[curr_word].length + 1
      curr_word++

      // If we reached the end of the sentence, we add up
      // our "times the sentence fit" counter
      if (curr_word == sentence_length) {
        curr_fit_times++
        curr_word = 0
      }
    }

    // Beginning a row with word i, the word that
    // starts the next row is curr_word
    next_row_word[i] = curr_word

    // Beginning a row with word i, the number of times
    // the sentence fits a row is curr_fit_time
    fit_times[i] = curr_fit_times
  }

  let starting_word = 0
  let total_times = 0

  for (let i = 0; i < rows; i++) {
    total_times += fit_times[starting_word]
    starting_word = next_row_word[starting_word]
  }

  return total_times
}
