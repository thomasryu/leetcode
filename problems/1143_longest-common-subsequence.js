/*

Given two strings text1 and text2,
return the length of their longest common subsequence.
If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the
original string with some characters (can be none) deleted without
changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.

Example 1:
  Input: text1 = "abcde", text2 = "ace"
  Output: 3
  Explanation: The longest common subsequence is "ace" and its length is 3.

Example 2:
  Input: text1 = "abc", text2 = "abc"
  Output: 3
  Explanation: The longest common subsequence is "abc" and its length is 3.

Example 3:
  Input: text1 = "abc", text2 = "def"
  Output: 0
  Explanation: There is no such common subsequence, so the result is 0.

Constraints:
- 1 <= text1.length, text2.length <= 1000
- text1 and text2 consist of only lowercase English characters.

*/

var longestCommonSubsequence = function (text1, text2) {
  const m = text1.length
  const n = text2.length

  // dp[x][y] gives me the longest common substring between
  // text1.slice(0, x) amd text2.slice(0, y)
  dp = Array(m + 1)
    .fill()
    .map(() => Array(n + 1))

  for (let i = 0; i <= m; i++)
    for (let j = 0; j <= n; j++) {
      if (i == 0 || j == 0) dp[i][j] = 0
      // We check whether the highest LCS comes from:
      else
        dp[i][j] = Math.max(
          // 1. text1.slice(0, i - 1) and text2.slice(0, j), or
          dp[i - 1][j],
          // 2. text1.slice(0, i) and text2.slice(0, j - 1), or
          dp[i][j - 1],
          // 3. text1[i - 1] + text2[j - 1] + the new pair text1[i] == text2[j]
          dp[i - 1][j - 1] + (text1[i - 1] == text2[j - 1] ? 1 : 0),
        )
    }

  return dp[m][n]
}
