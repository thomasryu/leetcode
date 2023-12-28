/*

Given a string s, check if it can be constructed by taking a substring of it
and appending multiple copies of the substring together. 

Example 1:
  Input: s = "abab"
  Output: true
  Explanation: It is the substring "ab" twice.

Example 2:
  Input: s = "aba"
  Output: false

Example 3:
  Input: s = "abcabcabcabc"
  Output: true
  Explanation: It is the substring "abc" four times or the substring "abcabc" twice.
 
Constraints:
- 1 <= s.length <= 104
= s consists of lowercase English letters.

*/

var repeatedSubstringPattern = function(s) {
  for (let i = 1; i <= s.length / 2; i++) {
    if (s.length % i != 0) continue

    const pattern = s.slice(0, i)
       
    for (let j = i; j <= s.length; j += i) {
      if (j == s.length) return true
      if (s.slice(j, j + i) !== pattern) break
    }
  }

  return false
};
