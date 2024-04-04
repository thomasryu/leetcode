/*

Given an array of strings words and a width maxWidth,
format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.

You should pack your words in a greedy approach; that is, pack as many words as you can in each line.
Pad extra spaces ' ' when necessary so that each line has exactly maxWidth characters.

Extra spaces between words should be distributed as evenly as possible.
If the number of spaces on a line does not divide evenly between words,
the empty slots on the left will be assigned more spaces than the slots on the right.

For the last line of text, it should be left-justified, and no extra space is inserted between words.

Note:
- A word is defined as a character sequence consisting of non-space characters only.
- Each word's length is guaranteed to be greater than 0 and not exceed maxWidth.
- The input array words contains at least one word.


Example 1:
  Input: words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
  Output:
  [
    "This    is    an",
    "example  of text",
    "justification.  "
  ]

Example 2:
  Input: words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
  Output:
  [
    "What   must   be",
    "acknowledgment  ",
    "shall be        "
  ]
  Explanation: Note that the last line is "shall be    " instead of "shall     be",
               because the last line must be left-justified instead of fully-justified.
  Note that the second line is also left-justified because it contains only one word.

Example 3:
  Input: words = ["Science","is","what","we","understand","well","enough","to","explain",
                  "to","a","computer.","Art","is","everything","else","we","do"], maxWidth = 20
  Output:
  [
    "Science  is  what we",
    "understand      well",
    "enough to explain to",
    "a  computer.  Art is",
    "everything  else  we",
    "do                  "
  ]

Constraints:
- 1 <= words.length <= 300
- 1 <= words[i].length <= 20
- words[i] consists of only English letters and symbols.
- 1 <= maxWidth <= 100
- words[i].length <= maxWidth

*/

var fullJustify = function (words, maxWidth) {
  let currentLine = 0
  const lines = [[]]

  // Split words among lines
  let charCount = 0
  for (word of words) {
    const requiresSpace = lines[currentLine].length > 0 ? 1 : 0
    if (charCount + word.length + requiresSpace <= maxWidth) {
      charCount += word.length + requiresSpace
    } else {
      currentLine++
      charCount = word.length
      lines[currentLine] = []
    }
    lines[currentLine].push(word)
  }

  // Fill the remaining space with spaces
  for (let i = 0; i < lines.length; i++) {
    // If the line only has one word or we are at the last line,
    // we justify it to the left
    if (i == lines.length - 1 || lines[i].length == 1) {
      lines[i] = lines[i].join(' ').padEnd(maxWidth, ' ')
    }

    // Else, we split the remaining space as evenly as possible
    else {
      charCount = lines[i].join('').length
      let spaceExcess = (maxWidth - charCount) % (lines[i].length - 1)
      const spaceLength =
        (maxWidth - charCount - spaceExcess) / (lines[i].length - 1)

      let concat = ''
      for (let j = 0; j < lines[i].length; j++) {
        concat += lines[i][j]
        if (j < lines[i].length - 1) {
          concat += ' '.repeat(spaceLength)

          if (spaceExcess > 0) {
            concat += ' '
            spaceExcess--
          }
        }
      }

      lines[i] = concat
    }
  }

  return lines
}

// Optimized solution
var fullJustify = function (words, max_width) {
  let result = []
  let curr_line_start = 0

  while (curr_line_start < words.length) {
    let curr_index = curr_line_start

    let curr_line_length = 0
    let curr_line_string = ''

    for (; curr_index < words.length; curr_index++) {
      // If the current word fits in the current line, add it
      // (curr_index - curr_line_start) gives me the single spaces between the words
      if (
        curr_line_length +
          words[curr_index].length +
          (curr_index - curr_line_start) <=
        max_width
      )
        curr_line_length += words[curr_index].length
      // Else, stop the loop
      else break
    }

    // If our line only has one word or we are at the last line
    // we use single spaces (for last line) and pad the right with spaces
    if (curr_index == words.length || curr_index - curr_line_start == 1) {
      for (let i = curr_line_start; i < curr_index; i++) {
        curr_line_string += words[i]
        if (i != curr_index - 1) curr_line_string += ' '
      }
      result.push(curr_line_string.padEnd(max_width, ' '))
    }

    // The default situation, where we must space the words out
    else {
      const space_slots = curr_index - curr_line_start - 1
      const space_size = Math.floor(
        (max_width - curr_line_length) / space_slots
      )
      let leftover_space = (max_width - curr_line_length) % space_slots

      for (let i = curr_line_start; i < curr_index; i++) {
        curr_line_string += words[i]
        if (i < curr_index - 1) {
          curr_line_string += ' '.repeat(space_size)
          if (leftover_space) {
            curr_line_string += ' '
            leftover_space--
          }
        }
      }

      result.push(curr_line_string)
    }

    curr_line_start = curr_index
  }

  return result
}

// Attempt made at 04/04/2024
var fullJustify = function (words, max_width) {
  let result = []
  let curr_line_start = 0

  while (curr_line_start < words.length) {
    let curr_index = curr_line_start

    let curr_line_length = 0
    let curr_line_string = ''

    for (; curr_index < words.length; curr_index++) {
      // If the current word fits in the current line, add it
      // (curr_index - curr_line_start) gives me the single spaces between the words
      if (
        curr_line_length +
          words[curr_index].length +
          (curr_index - curr_line_start) <=
        max_width
      )
        curr_line_length += words[curr_index].length
      // Else, stop the loop
      else break
    }

    // If our line only has one word or we are at the last line
    // we use single spaces (for last line) and pad the right with spaces
    if (curr_index == words.length || curr_index - curr_line_start == 1) {
      for (let i = curr_line_start; i < curr_index; i++) {
        curr_line_string += words[i]
        if (i != curr_index - 1) curr_line_string += ' '
      }
      result.push(curr_line_string.padEnd(max_width, ' '))
    }

    // The default situation, where we must space the words out
    else {
      const space_slots = curr_index - curr_line_start - 1
      const space_size = Math.floor(
        (max_width - curr_line_length) / space_slots
      )
      let leftover_space = (max_width - curr_line_length) % space_slots

      for (let i = curr_line_start; i < curr_index; i++) {
        curr_line_string += words[i]
        if (i < curr_index - 1) {
          curr_line_string += ' '.repeat(space_size)
          if (leftover_space) {
            curr_line_string += ' '
            leftover_space--
          }
        }
      }

      result.push(curr_line_string)
    }

    curr_line_start = curr_index
  }

  return result
}
