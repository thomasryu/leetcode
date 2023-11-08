/*

Given two strings ransomNote and magazine, return true if ransomNote can be
constructed byusing the letters from magazine and false otherwise.

Each letter in magazine can only be used once in ransomNote.

Example 1:
  Input: ransomNote = "a", magazine = "b"
  Output: false

Example 2:
  Input: ransomNote = "aa", magazine = "ab"
  Output: false

Example 3:
  Input: ransomNote = "aa", magazine = "aab"
  Output: true

Constraints:
- 1 <= ransomNote.length, magazine.length <= 105
- ransomNote and magazine consist of lowercase English letters.

*/

// Standard solution
var canConstruct = function (ransomNote, magazine) {
  const map = new Map()

  for (letter of magazine) {
    if (map.has(letter)) {
      map.set(letter, map.get(letter) + 1)
    } else map.set(letter, 1)
  }

  for (letter of ransomNote) {
    if (map.has(letter)) {
      if (map.get(letter) > 0) {
        map.set(letter, map.get(letter) - 1)
        continue
      }
    }
    return false
  }

  return true
}

// O(1) space solution
// (this seems wrong because the problem states "Each letter of the magazine can only be used once")
var canConstruct = function (ransomNote, magazine) {
  for (letter of magazine) {
    ransomNote = ransomNote.replace(letter, '')
    if (ransomNote.length == 0) return true
  }

  return false
}
