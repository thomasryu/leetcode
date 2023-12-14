/*

For two strings s and t, we say "t divides s" if and only if s = t + ... + t
(i.e., t is concatenated with itself one or more times).

Given two strings str1 and str2,
return the largest string x such that x divides both str1 and str2.

Example 1:
  Input: str1 = "ABCABC", str2 = "ABC"
  Output: "ABC"

Example 2:
  Input: str1 = "ABABAB", str2 = "ABAB"
  Output: "AB"

Example 3:
  Input: str1 = "LEET", str2 = "CODE"
  Output: ""

Constraints:
- 1 <= str1.length, str2.length <= 1000
- str1 and str2 consist of English uppercase letters.

*/

// Iteractive solution
var gcdOfStrings = function (str1, str2) {
  const m = str1.length
  const n = str2.length

  const getGCD = (a, b) => {
    if (a < b) [a, b] = [b, a]
    while (a % b != 0) [a, b] = [b, a % b]
    return b
  }

  // We calculate the GDC
  // (the maximum length of our divisor)
  const gcd = getGCD(m, n)

  // We combine both strings to make the divisor
  // validation a little bit cleaner
  const proof = str1 + str2

  for (let i = gcd; i > 0; i--) {
    // We only test viable divisor sizes
    if (gcd % i != 0) continue

    const pattern = str1.slice(0, i)
    let j = 0
    while (
      proof.slice(i * j, i * (j + 1)) == pattern &&
      i * (j + 1) <= proof.length
    )
      j++
    if (j == proof.length / i) return pattern
  }

  return ''
}

// Recursive solution
var gcdOfStrings = function (str1, str2) {
  if (str1.length < str2.length) [str1, str2] = [str2, str1]

  if (str1 + str2 != str2 + str1) return ''
  if (str1 == str2) return str1
  else return gcdOfStrings(str2, str1.slice(str2.length))
}
