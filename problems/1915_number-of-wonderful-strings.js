/*

A wonderful string is a string where at most one letter appears an odd number of times.

For example, "ccjjc" and "abab" are wonderful, but "ab" is not.
Given a string word that consists of the first ten lowercase English letters ('a' through 'j'),
return the number of wonderful non-empty substrings in word.
If the same substring appears multiple times in word, then count each occurrence separately.

A substring is a contiguous sequence of characters in a string.

Example 1:
  Input: word = "aba"
  Output: 4
  Explanation: The four wonderful substrings are underlined below:
    - "aba" -> "a"
    - "aba" -> "b"
    - "aba" -> "a"
    - "aba" -> "aba"

Example 2:
  Input: word = "aabb"
  Output: 9
  Explanation: The nine wonderful substrings are underlined below:
    - "aabb" -> "a"
    - "aabb" -> "aa"
    - "aabb" -> "aab"
    - "aabb" -> "aabb"
    - "aabb" -> "a"
    - "aabb" -> "abb"
    - "aabb" -> "b"
    - "aabb" -> "bb"
    - "aabb" -> "b"

Example 3:
  Input: word = "he"
  Output: 2
  Explanation: The two wonderful substrings are underlined below:
    - "he" -> "h"
    - "he" -> "e"

Constraints:
- 1 <= word.length <= 105
- word consists of lowercase English letters from 'a' to 'j'.

*/

var wonderfulSubstrings = function (word) {
  let result = 0

  const n = word.length

  // We will have a 10-bit binary number where each bit represents whether
  // a character from a to j appeared an even (0) number of times or an odd (1) one.
  // a will be 2^0 and j will be 2^9
  // the technical term here for the 10-bit binary is bitmask.
  let bitmask = 0

  // We will also be counting the frequency that each bitmask appears.
  // Since we have a 10-bit binary, there are 1024 possible numbers (from 0 to 1023)
  const bitmask_freq = Array(1024).fill(0)

  // Since we will be working in a prefix array style, we initialize bitmask with
  // an empty string, meaning all frequencies are 0.
  bitmask_freq[0] = 1

  for (let i = 0; i < n; i++) {
    const k = word[i].charCodeAt(0) - 'a'.charCodeAt(0)
    bitmask ^= 1 << k // We toggle the k-th bit (the one representing our character)

    // If bitmask_freq[bitmask] is not 0, then there are one or more indexes h where
    // word[h - 1 ... i] results in a bitmask = 0. This means word[h - 1 ... i] has no
    // odd-occurring characters, so we add frequency to our resulting count.
    result += bitmask_freq[bitmask]

    for (let j = 0; j < 10; j++) {
      // For each character from a to j, we create a new bitmasks where the count
      // of the j-th character differs by 1 from our current bitmask.
      const new_bitmask = bitmask ^ (1 << j)

      // This means that a substring between this bitmask's index h (or indexes if it occurred
      // more than once in the past) and our current one generates a string word[h - 1 ... i]
      // where ONLY the j-th character appears an odd number of times.
      result += bitmask_freq[new_bitmask]
    }

    // Since we couldn't update the frequency of our current bitmask as to not affect
    // the counting calculations, we update it at the end.
    bitmask_freq[bitmask]++
  }

  return result
}
