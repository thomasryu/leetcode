/*

Given an input string s and a pattern p,
implement regular expression matching with support for '.' and '*' where:
- '.' Matches any single character.​​​​
- '*' Matches zero or more of the preceding element.
- The matching should cover the entire input string (not partial).



Example 1:
  Input: s = "aa", p = "a"
  Output: false
  Explanation: "a" does not match the entire string "aa".

Example 2:
  Input: s = "aa", p = "a*"
  Output: true
  Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".

Example 3:
  Input: s = "ab", p = ".*"
  Output: true
  Explanation: ".*" means "zero or more (*) of any character (.)".

Constraints:
- 1 <= s.length <= 20
- 1 <= p.length <= 20
- s contains only lowercase English letters.
- p contains only lowercase English letters, '.', and '*'.
- It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.

*/

// Dirty solution
var isMatch = function (s, p) {
  // Fixing occurrences of patterns like 'a****abc'
  // which aren't really valid in a real scenario
  const fixedPattern = p.replace(/\*+/, '*')
  const regex = new RegExp(`^${fixedPattern}$`)
  return s.match(regex) != null
}

// Dynamic programming solution O(N * M)
// faster than the above solution
var isMatch = function (s, p) {
  const m = s.length
  const n = p.length

  // dp[i][j] represents whether the i-th character of string s
  // matches the j-th character of pattern p
  dp = Array(m + 1)
    .fill()
    .map(() => Array(n + 1).fill(false))

  // An empty array matches an empty pattern
  dp[0][0] = true

  // For convenience, we put a trash character at the beginning of s and p just
  // so their indexes matches that of dp while iterating over them (since dp
  // takes into account an empty string and pattern, dp[0][0] is taken by them)
  p = '#' + p
  s = '#' + s

  // Filling the first column, where the string s is empty the only possible way
  // a pattern can match an empty string is with the presence of asterisks (e.g. 'a*' or 'a*b*')
  // so when we find one, we use whether what came before it (i.e., index (j - 2)) is true or not
  for (let j = 1; j <= n; j++) {
    if (p[j] == '*') {
      dp[0][j] = dp[0][j - 2]
    }
  }

  // Now we fill the rest of the matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // Case 1: if the i-th character of s matches the j-th character of the pattern
      //         or the pattern is a ".", then we copy the result of dp[i][j] (because if the pattern
      //         already failed it will stay that way)
      if (s[i] == p[j] || p[j] == '.') {
        dp[i][j] = dp[i - 1][j - 1]
      }
      // Case 2: If the j-th character of the pattern is "*", then we either match
      //         zero occurences and dp[i][j] = dp[i][j - 2] (just like with the first column), and
      //         one or more occurrences and dp[i][j] = dp[i - 1][j] if the i-th character of s
      //         matches the (j - 1) character of p (i.e., the character before the asterisk) or it's "."
      else if (p[j] == '*') {
        dp[i][j] = dp[i][j - 2]

        if (s[i] == p[j - 1] || p[j - 1] == '.') {
          dp[i][j] = dp[i][j] || dp[i - 1][j] // (see how we check if the zero occurrence already set it as true)
        }
      }
    }
  }

  return dp[m][n]
}
