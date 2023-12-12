/*

Given a string s and an integer k, return the maximum number of
vowel lettersin any substring of s with length k.

Vowel letters in English are 'a', 'e', 'i', 'o', and 'u'.

Example 1:
  Input: s = "abciiidef", k = 3
  Output: 3
  Explanation: The substring "iii" contains 3 vowel letters.

Example 2:
  Input: s = "aeiou", k = 2
  Output: 2
  Explanation: Any substring of length 2 contains 2 vowels.

Example 3:
  Input: s = "leetcode", k = 3
  Output: 2
  Explanation: "lee", "eet" and "ode" contain 2 vowels.

Constraints:
- 1 <= s.length <= 105
- s consists of lowercase English letters.
- 1 <= k <= s.length

*/

// Standard solution
var maxVowels = function (s, k) {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u'])

  let current = 0
  for (let i = 0; i < k; i++) if (vowels.has(s[i])) current++

  let result = current
  for (let i = 1; i <= s.length - k; i++) {
    if (vowels.has(s[i - 1])) current--
    if (vowels.has(s[i + k - 1])) current++
    result = Math.max(result, current)
  }

  return result
}

// With .includes() (faster than .has())
var maxVowels = function (s, k) {
  const vowels = ['a', 'e', 'i', 'o', 'u']

  let current = 0
  for (let i = 0; i < k; i++) if (vowels.includes(s[i])) current++

  let result = current
  for (let i = 1; i <= s.length - k; i++) {
    if (vowels.includes(s[i - 1])) current--
    if (vowels.includes(s[i + k - 1])) current++
    result = Math.max(result, current)
  }

  return result
}
