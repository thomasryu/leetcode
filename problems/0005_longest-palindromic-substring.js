/*

Given a string s, return the longest palindromic substring in s.

Example 1:
  Input: s = "babad"
  Output: "bab"
  Explanation: "aba" is also a valid answer.

Example 2:
  Input: s = "cbbd"
  Output: "bb"

Constraints:
- 1 <= s.length <= 1000
- s consist of only digits and English letters.

*/

// O(Nˆ2)
var longestPalindrome = function (s) {
  let result = []
  const array = [...s]

  for (let i = 0; i < s.length; i++) {
    let j = 1
    let current = [s[i]]

    while (i - j >= 0 && i + j < s.length) {
      if (s[i - j] != s[i + j]) {
        break
      }
      current.unshift(s[i - j])
      current.push(s[i + j])
      j++
    }
    if (current.length > result.length) {
      result = [...current]
    }

    if (i + 1 < s.length && s[i] == s[i + 1]) {
      j = 0
      current = []

      while (i - j >= 0 && i + 1 + j < s.length) {
        if (s[i - j] != s[i + 1 + j]) {
          break
        }
        current.unshift(s[i - j])
        current.push(s[i + 1 + j])
        j++
      }
      if (current.length > result.length) {
        result = [...current]
      }
    }
  }

  return result.join('')
}

// Just a cleaner version of the above, O(Nˆ2) but O(1) storage
var longestPalindrome = function (s) {
  const n = s.length
  let longestStart = 0
  let longestEnd = 0

  const expandSearch = (start, end) => {
    let i = 0
    while (start - i >= 0 && end + i < n) {
      if (s[start - i] != s[end + i]) {
        return
      }
      if (end + i - (start - i) > longestEnd - longestStart) {
        longestStart = start - i
        longestEnd = end + i
      }
      i++
    }
  }

  for (let i = 0; i < n; i++) {
    expandSearch(i, i)
    expandSearch(i, i + 1)
  }

  return s.substring(longestStart, longestEnd + 1)
}
