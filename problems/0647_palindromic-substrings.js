/*

Given a string s, return the number of palindromic substrings in it.

A string is a palindrome when it reads the same backward as forward.

A substring is a contiguous sequence of characters within the string.

Example 1:
  Input: s = "abc"
  Output: 3
  Explanation: Three palindromic strings: "a", "b", "c".

Example 2:
  Input: s = "aaa"
  Output: 6
  Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".

Constraints:
- 1 <= s.length <= 1000
- s consists of lowercase English letters.

*/

var countSubstrings = function (s) {
  let result = 0
  const n = s.length

  const is_palindrome = (left, right) => {
    let i = 0
    while (left - i >= 0 && right + i < n && s[left - i] == s[right + i]) {
      result++
      i++
    }
  }

  for (let i = 0; i < n; i++) {
    is_palindrome(i, i) // Odd-sized palindrome
    is_palindrome(i, i + 1) // Even-sized palindrome
  }

  return result
}

// Attempt made at 04/04/2024
var longestPalindrome = function (s) {
  let result_left = 0
  let result_right = 0

  const expandSearch = (left, right) => {
    if (left < 0 || right >= s.length || s[left] != s[right]) return
    if (right - left > result_right - result_left)
      [result_left, result_right] = [left, right]
    expandSearch(--left, ++right)
  }

  for (let i = 0; i < s.length - 1; i++) {
    expandSearch(i, i)
    expandSearch(i, i + 1)
  }

  return s.slice(result_left, result_right + 1)
}
