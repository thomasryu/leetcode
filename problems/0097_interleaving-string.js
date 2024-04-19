/*

Given strings s1, s2, and s3,
find whether s3 is formed by an interleaving of s1 and s2.

An interleaving of two strings s and t is a configuration
where s and t are divided into n and m substrings respectively, such that:
- s = s1 + s2 + ... + sn
- t = t1 + t2 + ... + tm
- |n - m| <= 1
- The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 + t3 + s3 + ...

Note: a + b is the concatenation of strings a and b.

Example 1:
  Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
  Output: true
  Explanation: One way to obtain s3 is:
               Split s1 into s1 = "aa" + "bc" + "c", and s2 into s2 = "dbbc" + "a".
               Interleaving the two splits, we get "aa" + "dbbc" + "bc" + "a" + "c" = "aadbbcbcac".
               Since s3 can be obtained by interleaving s1 and s2, we return true.

Example 2:
  Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
  Output: false
  Explanation: Notice how it is impossible to interleave s2 with any other string to obtain s3.

Example 3:
  Input: s1 = "", s2 = "", s3 = ""
  Output: true

Constraints:
- 0 <= s1.length, s2.length <= 100
- 0 <= s3.length <= 200
- s1, s2, and s3 consist of lowercase English letters.

Follow up: Could you solve it using only O(s2.length) additional memory space?

*/

// Iteractive + recursion hybrid (time limit exceeded)
var isInterleave = function (s1, s2, s3, c1 = 0, c2 = 0, c3 = 0) {
  if (s1.length + s2.length != s3.length) return false

  for (_; c3 < s3.length; c3++) {
    if (s1[c1] == s3[c3] && s2[c2] == s3[c3])
      return (
        isInterleave(s1, s2, s3, c1 + 1, c2, c3 + 1) ||
        isInterleave(s1, s2, s3, c1, c2 + 1, c3 + 1)
      )
    else if (s1[c1] == s3[c3]) c1++
    else if (s2[c2] == s3[c3]) c2++
    else return false
  }

  return c1 == s1.length && c2 == s2.length && c1 + c2 == s3.length
}

// Efficient solution (2D DP)
var isInterleave = function (s1, s2, s3) {
  const m = s1.length
  const n = s2.length
  if (m + n !== s3.length) return false

  // dp[i][j] gets me whether s1.slice(0, i) and s2(0, j)
  // can interleave into s3.slice(0, i + j)
  const dp = Array(m + 1)
    .fill()
    .map(() => Array(s2.length + 1).fill(false))

  for (let i = 0; i <= s1.length; i++) {
    for (let j = 0; j <= s2.length; j++) {
      // 1. Two empty strings can interleave into an empty string
      if (i == 0 && j == 0) dp[i][j] = true
      // 2. Only chararacters from s1 are used (first row)
      else if (j === 0) dp[i][j] = dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]
      // 3. Only characters from s2 are used (first column)
      else if (i === 0) dp[i][j] = dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]
      // 4. We attempt to use characters from both strings
      else {
        dp[i][j] =
          (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) ||
          (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1])
      }
    }
  }
  return dp[s1.length][s2.length]
}

// Attempt made at 19/04/2024
var isInterleave = function (s1, s2, s3) {
  const m = s1.length
  const n = s2.length
  const o = s3.length

  if (m + n != o) return false

  // dp[i][j][k] gives me whether I can complete s3[k ... o-1]
  // using s1[i ... m-1] and s2[j ... n-1]
  const tried = new Set()

  const check = (i, j, k) => {
    console.log(i, j, k, tried)
    if (i == m && j == n && k == o) return true

    const key = `${i},${j},${k}`
    if (s1[i] != s3[k] && s2[j] != s3[k]) tried.add(key)

    let result = false
    if (i < m && s1[i] == s3[k]) {
      const next_key = `${i + 1},${j},${k + 1}`
      if (!tried.has(next_key)) result = result || check(i + 1, j, k + 1)
    }
    if (j < n && s2[j] == s3[k]) {
      const next_key = `${i},${j + 1},${k + 1}`
      if (!tried.has(next_key)) result = result || check(i, j + 1, k + 1)
    }

    tried.add(key)
    return result
  }

  return check(0, 0, 0)
}
