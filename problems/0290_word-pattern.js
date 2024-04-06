/*

Given a pattern and a string s, find if s follows the same pattern.

Here follow means a full match, such that there is a
bijection between a letter in pattern and a non-empty word in s.

Example 1:
  Input: pattern = "abba", s = "dog cat cat dog"
  Output: true

Example 2:
  Input: pattern = "abba", s = "dog cat cat fish"
  Output: false

Example 3:
  Input: pattern = "aaaa", s = "dog cat cat dog"
  Output: false

Constraints:
- 1 <= pattern.length <= 300
- pattern contains only lower-case English letters.
- 1 <= s.length <= 3000
-s contains only lowercase English letters and spaces ' '.
- s does not contain any leading or trailing spaces.
- All the words in s are separated by a single space.

*/

var wordPattern = function (pattern, s) {
  const map = new Map()
  const reverseMap = new Map()

  const words = s.split(' ')

  if (pattern.length != words.length) return false

  for (let i = 0; i < words.length; i++) {
    if (map.has(pattern[i]) && map.get(pattern[i]) !== words[i]) {
      return false
    }
    if (reverseMap.has(words[i]) && reverseMap.get(words[i]) !== pattern[i]) {
      return false
    }

    map.set(pattern[i], words[i])
    reverseMap.set(words[i], pattern[i])
  }

  return true
}

// Attempt made at 05/04/2024
var wordPattern = function (pattern, s) {
  const words = s.split(' ')
  if (words.length != pattern.length) return false

  const map = new Map()
  const reverse_map = new Map()

  for (let i = 0; i < words.length; i++) {
    const char = pattern[i]
    const word = words[i]

    if (map.has(char) && map.get(char) != word) return false
    else map.set(char, word)

    if (reverse_map.has(word) && reverse_map.get(word) != char) return false
    else reverse_map.set(word, char)
  }

  return true
}
