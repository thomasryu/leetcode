/*

Given a string s, find the length of the longest
substring without repeating characters.

Example 1:
  Input: s = "abcabcbb"
  Output: 3
  Explanation: The answer is "abc", with the length of 3.

Example 2:
  Input: s = "bbbbb"
  Output: 1
  Explanation: The answer is "b", with the length of 1.
  Example 3:

Example 3:
  Input: s = "pwwkew"
  Output: 3
  Explanation: The answer is "wke", with the length of 3.
  Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

Constraints:
- 0 <= s.length <= 5 * 104
- s consists of English letters, digits, symbols and spaces.

*/

var lengthOfLongestSubstring = function (s) {
  const n = s.length
  const set = new Set()

  let result = 0
  let head = 0

  // Standard caterpillar to find the optimal substring
  for (let tail = 0; tail < n; tail++) {
    while (!set.has(s[head]) && head < n) {
      set.add(s[head])
      head++
    }
    result = Math.max(result, set.size)
    set.delete(s[tail])
  }

  return result
}

// Attempt made at 16/02/2024
var lengthOfLongestSubstring = function (s) {
  if (s.length < 2) return s.length

  let result = 0

  let tail = 0
  let head = 1
  const set = new Set(s[tail])

  while (head < s.length) {
    while (set.has(s[head])) {
      set.delete(s[tail])
      tail++
    }

    set.add(s[head])
    result = Math.max(result, head - tail + 1)
    head++
  }

  return result
}
