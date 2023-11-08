/*

Given two strings s and t of lengths m and n respectively, return the minimum window substring
of s such that every character in t (including duplicates) is included in the window.
If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

Example 1:
  Input: s = "ADOBECODEBANC", t = "ABC"
  Output: "BANC"
  Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.

Example 2:
  Input: s = "a", t = "a"
  Output: "a"
  Explanation: The entire string s is the minimum window.

Example 3:
  Input: s = "a", t = "aa"
  Output: ""
  Explanation: Both 'a's from t must be included in the window.
               Since the largest window of s only has one 'a', return empty string.

Constraints:
- m == s.length
- n == t.length
- 1 <= m, n <= 105
- s and t consist of uppercase and lowercase English letters.

Follow up: Could you find an algorithm that runs in O(m + n) time?

*/

// Mediocre solution, using two maps
var minWindow = function (s, t) {
  let result = s + '_'

  // 1. We create a character map t
  const sMap = new Map()
  const tMap = new Map()

  for (i = 0; i < t.length; i++) {
    tMap.set(t[i], (tMap.get(t[i]) || 0) + 1)
  }

  // 2. We caterpillar search for a window substring
  console.log(sMap, tMap, isWindowSubstring(sMap, tMap))

  let tail = 0
  let head = 0

  while (head <= s.length && tail < s.length) {
    if (isWindowSubstring(sMap, tMap)) {
      if (head - tail < result.length) result = s.substring(tail, head)

      sMap.set(s[tail], sMap.get(s[tail]) - 1)
      tail++
    } else {
      sMap.set(s[head], (sMap.get(s[head]) || 0) + 1)
      head++
    }
  }

  return result.length > s.length ? '' : result
}

var isWindowSubstring = function (sMap, tMap) {
  for ([key, value] of tMap) {
    if (value > (sMap.get(key) || 0)) return false
  }
  return true
}

// Optimal solution using one map
var minWindow = function (s, t) {
  if (t.length > s.length) return ''

  const requiredMap = {}
  for (let char of t) requiredMap[char] = (requiredMap[char] || 0) + 1

  let result = ''
  let tail = 0
  let head = 0
  let requiredLength = Object.keys(requiredMap).length

  while (head < s.length) {
    const headChar = s[head]
    requiredMap[headChar]--

    if (requiredMap[headChar] === 0) requiredLength--

    while (requiredLength === 0) {
      if (!result || result.length > head - tail + 1) {
        result = s.substring(tail, head + 1)
      }

      const tailChar = s[tail]
      if (requiredMap[tailChar] === 0) {
        requiredLength++
      }
      requiredMap[tailChar]++
      tail++
    }

    head++
  }

  return result
}
