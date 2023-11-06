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
