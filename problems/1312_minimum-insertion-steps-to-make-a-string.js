/*

Given a string s. In one step you can insert any character at any index of the string.

Return the minimum number of steps to make s palindrome.

A Palindrome String is one that reads the same backward as well as forward.

Example 1:
  Input: s = "zzazz"
  Output: 0
  Explanation: The string "zzazz" is already palindrome we do not need any insertions.

Example 2:
  Input: s = "mbadm"
  Output: 2
  Explanation: String can be "mbdadbm" or "mdbabdm".

Example 3:
  Input: s = "leetcode"
  Output: 5
  Explanation: Inserting 5 characters the string becomes "leetcodocteel".

Constraints:
- 1 <= s.length <= 500
- s consists of lowercase English letters.

*/

var minInsertions = function (s) {
  const n = s.length
  const dp = Array(n)
    .fill()
    .map(() => Array(n))

  // See 516. Longest Palindromic subsequence
  const getLCS = (i, j) => {
    if (i > j) return 0

    if (i == j) return 1
    if (dp[i][j]) return dp[i][j]

    let result = 0

    if (s[i] == s[j]) result = 2 + getLCS(i + 1, j - 1)
    else result = Math.max(getLCS(i, j - 1), getLCS(i + 1, j))

    return (dp[i][j] = result)
  }

  // To create a palindrome, we just need to add a copy of each character
  // not belonging to the longest palindromic subsequence
  return n - getLCS(0, n - 1)
}
