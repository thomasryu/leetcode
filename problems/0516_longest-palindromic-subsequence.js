/*

Given a string s, find the longest palindromic subsequence's length in s.

A subsequence is a sequence that can be derived from another sequence by deleting some or
no elements without changing the order of the remaining elements.

Example 1:
  Input: s = "bbbab"
  Output: 4
  Explanation: One possible longest palindromic subsequence is "bbbb".

Example 2:
  Input: s = "cbbd"
  Output: 2
  Explanation: One possible longest palindromic subsequence is "bb".

Constraints:
- 1 <= s.length <= 1000
- s consists only of lowercase English letters.

*/

var longestPalindromeSubseq = function (s) {
  const n = s.length

  // dp[i][j] gives me the LPS from s[i] to s[j]
  const dp = Array(n)
    .fill()
    .map(() => Array(n))

  const getLCS = (i, j) => {
    if (i > j) return 0

    if (i == j) return 1 // A character is a palindrome
    if (dp[i][j]) return dp[i][j]

    let result = 0

    // If both first and last character are equal,
    // add them both to the LCS and test both inner characters
    if (s[i] == s[j]) result = 2 + getLCS(i + 1, j - 1)
    // If they are not equal, we test the possibility of
    // 1. Testing s[i] against s[j - 1]
    // 2. Testing s[i + 1] against s[j]
    else result = Math.max(getLCS(i, j - 1), getLCS(i + 1, j))

    return (dp[i][j] = result)
  }

  return getLCS(0, n - 1)
}
