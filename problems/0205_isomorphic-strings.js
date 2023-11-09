/*

Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters.
No two characters may map to the same character, but a character may map to itself.

Example 1:
  Input: s = "egg", t = "add"
  Output: true

Example 2:
  Input: s = "foo", t = "bar"
  Output: false

Example 3:
Input: s = "paper", t = "title"
Output: true

Constraints:
- 1 <= s.length <= 5 * 104
- t.length == s.length
- s and t consist of any valid ascii character.

*/

// Simple solution with two-way mapping
var isIsomorphic = function (s, t) {
  const map = {}
  const reverseMap = {}

  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] !== undefined && map[s[i]] !== t[i]) {
      return false
    }
    if (reverseMap[t[i]] !== undefined && reverseMap[t[i]] !== s[i]) {
      return false
    }

    map[s[i]] = t[i]
    reverseMap[t[i]] = s[i]
  }

  return true
}
