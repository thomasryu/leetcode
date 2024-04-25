/*

You are given a string s consisting of lowercase letters and an integer k.
We call a string t ideal if the following conditions are satisfied:

- t is a subsequence of the string s.
- The absolute difference in the alphabet order of every
  two adjacent letters in t is less than or equal to k.

Return the length of the longest ideal string.

A subsequence is a string that can be derived from another string by deleting some
or no characters without changing the order of the remaining characters.

Note that the alphabet order is not cyclic.
For example, the absolute difference in the alphabet order of 'a' and 'z' is 25, not 1.

Example 1:
  Input: s = "acfgbd", k = 2
  Output: 4
  Explanation: The longest ideal string is "acbd". The length of this string is 4, so 4 is returned.
    Note that "acfgbd" is not ideal because 'c' and 'f' have a difference of 3 in alphabet order.

Example 2:
  Input: s = "abcd", k = 3
  Output: 4
  Explanation: The longest ideal string is "abcd". The length of this string is 4, so 4 is returned.

Constraints:
- 1 <= s.length <= 105
- 0 <= k <= 25
- s consists of lowercase English letters.

*/

// O(N^2) DP solution (time limit exceeded)
var longestIdealString = function (s, k) {
  const n = s.length
  const dp = Array(n).fill(1) // dp[i] the length of the LIS that ends in i

  let result = 0
  const getDiff = (a, b) => Math.abs(a.charCodeAt(0) - b.charCodeAt(0))

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (getDiff(s[i], s[j]) > k) continue
      dp[j] = Math.max(dp[j], dp[i] + 1)
      result = Math.max(result, dp[j])
    }
  }

  return result
}

// O(N * K) performance, O(26) = O(1) space
var longestIdealString = function (s, k) {
  // dp[i] will give me the current LIS that ends in s[i]
  // We initialize it with 0s because before we start all LIS's are empty
  const dp = Array(26).fill(0)

  for (let c of s) {
    const char_index = c.charCodeAt(0) - 'a'.charCodeAt(0)

    // We check every character within k range, and check their achieved LIS
    // during previous iterations, getting the maximum value + 1 for dp[char_index]
    let curr_max = 0
    for (
      let i = Math.max(char_index - k, 0);
      i <= Math.min(char_index + k, 25);
      i++
    )
      curr_max = Math.max(curr_max, dp[i] + 1)
    dp[char_index] = curr_max
  }

  // Get the maximum length achieved by a character
  return Math.max(...dp)
}
