/*

Given two strings s and t, return true if t is an anagram of s, and false otherwise.
An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
typically using all the original letters exactly once.

Example 1:
  Input: s = "anagram", t = "nagaram"
  Output: true

Example 2:
  Input: s = "rat", t = "car"
  Output: false

Constraints:
  1 <= s.length, t.length <= 5 * 104
  s and t consist of lowercase English letters.

Follow up: What if the inputs contain Unicode characters?
           How would you adapt your solution to such a case?

*/

var isAnagram = function (s, t) {
  // 1. Create a map of s and keep track of its size
  const map = new Map()
  for (char of s) {
    map.set(char, (map.get(char) || 0) + 1)
  }
  let required = map.size

  // 2. Use the map of s as a "requirement" and subtrack the
  //    characters of t from it, decreasing the size counter
  //    every time a character's count has reached zero
  for (char of t) {
    const value = map.get(char) || 0
    if (value > 0) {
      map.set(char, value - 1)
      if (map.get(char) == 0) required--
    } else return false
  }

  return required == 0
}
