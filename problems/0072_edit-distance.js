/*

Given two strings word1 and word2,
return the minimum number of operations required to convert word1 to word2.

You have the following three operations permitted on a word:
- Insert a character
- Delete a character
- Replace a character

Example 1:
  Input: word1 = "horse", word2 = "ros"
  Output: 3
  Explanation:
    horse -> rorse (replace 'h' with 'r')
    rorse -> rose (remove 'r')
    rose -> ros (remove 'e')

Example 2:
  Input: word1 = "intention", word2 = "execution"
  Output: 5
  Explanation:
    intention -> inention (remove 't')
    inention -> enention (replace 'i' with 'e')
    enention -> exention (replace 'n' with 'x')
    exention -> exection (replace 'n' with 'c')
    exection -> execution (insert 'u')

Constraints:
- 0 <= word1.length, word2.length <= 500
- word1 and word2 consist of lowercase English letters.

*/

var minDistance = function (word1, word2) {
  // For optimization, we keep the larger word on word1
  if (word1.length < word2.length) [word1, word2] = [word2, word1]

  const m = word1.length
  const n = word2.length

  if (n == 0) return m

  // dp[i][j] returns me the minimum edits required to
  // go from word1.slice(0, i) to word2.slice(0, j)
  const dp = Array(m + 1)
    .fill()
    .map(() => Array(n + 1).fill(0))

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      // If at least one of the words is empty, we will
      // need to insert the other word entirely
      if (i == 0 || j == 0) {
        dp[i][j] = i + j
        continue
      }

      // If the current characters are equal
      // there is no need for edits
      if (word1[i - 1] == word2[j - 1]) dp[i][j] = dp[i - 1][j - 1]
      // Else we choose between top,
      // left and top left, and add one
      else dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1])
    }
  }

  return dp[m][n]
}
