/*

Given a string s, sort it in decreasing order based on the frequency of the characters.
The frequency of a character is the number of times it appears in the string.

Return the sorted string. If there are multiple answers, return any of them.

Example 1:
  Input: s = "tree"
  Output: "eert"
  Explanation: 'e' appears twice while 'r' and 't' both appear once.
    So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.

Example 2:
  Input: s = "cccaaa"
  Output: "aaaccc"
  Explanation: Both 'c' and 'a' appear three times, so both "cccaaa" and "aaaccc" are valid answers.
    Note that "cacaca" is incorrect, as the same characters must be together.

Example 3:
  Input: s = "Aabb"
  Output: "bbAa"
  Explanation: "bbaA" is also a valid answer, but "Aabb" is incorrect.
    Note that 'A' and 'a' are treated as two different characters.

Constraints:
- 1 <= s.length <= 5 * 105
- s consists of uppercase and lowercase English letters and digits.

*/

var frequencySort = function (s) {
  const map = {}
  for (let c of s) {
    map[c] || (map[c] = 0)
    map[c]++
  }

  const result = []

  const binary_insert = (char) => {
    let tail = 0
    let head = result.length

    const char_freq = map[char]

    while (tail < head) {
      const mid = Math.floor((tail + head) / 2)
      const mid_freq = result[mid].length

      if (mid_freq > char_freq) tail = mid + 1
      else head = mid
    }

    result.splice(tail, 0, char.repeat(char_freq))
  }

  for (let c in map) binary_insert(c)
  return result.join('')
}
