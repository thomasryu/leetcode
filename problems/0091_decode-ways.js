/*

A message containing letters from A-Z can be encoded
into numbers using the following mapping:

'A' -> "1"
'B' -> "2"
...
'Z' -> "26"

To decode an encoded message, all the digits must be grouped
then mapped back into letters using the reverse of the mapping above
(there may be multiple ways). For example, "11106" can be mapped into:

- "AAJF" with the grouping (1 1 10 6)
- "KJF" with the grouping (11 10 6)

Note that the grouping (1 11 06) is invalid because "06" cannot be mapped
into 'F' since "6" is different from "06".

Given a string s containing only digits, return the number of ways to decode it.

The test cases are generated so that the answer fits in a 32-bit integer.

Example 1:
  Input: s = "12"
  Output: 2
  Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).

Example 2:
  Input: s = "226"
  Output: 3
  Explanation: "226" could be decoded as "BZ" (2 26),
               "VF" (22 6), or "BBF" (2 2 6).

Example 3:
  Input: s = "06"
  Output: 0
  Explanation: "06" cannot be mapped to "F" because of the
               leading zero ("6" is different from "06").

Constraints:
- 1 <= s.length <= 100
- s contains only digits and may contain leading zero(s).

*/

// Recursive solution (time limit exceeded)
var numDecodings = function (s) {
  if (s[0] == '0') return 0
  let result = 0

  const decode = (i = 0) => {
    // Since our letters start at 1 and double digit numbers
    // start at 10, our current digit being 0 is not a valid option
    if (s[i] == '0') return

    // We reached the end of a valid possible decoding,
    // so we increment our count
    if (i >= s.length - 1) {
      result++
      return
    }

    // Else, given a digit s[i], we can either:

    // 1. Pick it as a single digit, decode it,
    //    and move to the remaining substring (i + 1)
    decode(i + 1)

    // 2. Check the next number, verify whether both form a valid letter,
    //    decode them and move to the remaining substring (i + 2)
    if (i + 1 < s.length) {
      const num = +(s[i] + s[i + 1])
      if (num > 9 && num <= 26) decode(i + 2)
    }
  }

  decode()
  return result
}

// Dynamic programming solution
var numDecodings = function (s) {
  if (s[0] == '0') return 0

  // dp[] will store the number of possible
  // decodings of s,slice[0, i + 1]
  let dp = Array(s.length + 1).fill(0)
  dp[0] = dp[1] = 1

  for (let i = 1; i < s.length; i++) {
    // We test s[i] as a single digit number
    if (s[i] != '0') dp[i + 1] += dp[i]

    // We test `${s[i - 1]}${s[i]}` as a double digit number
    const num = +(s[i - 1] + s[i])
    if (num > 9 && num <= 26) dp[i + 1] += dp[i - 1]
  }

  return dp[s.length]
}
