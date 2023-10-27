/*

Implement the myAtoi(string s) function, which converts a string to a
32-bit signed integer (similar to C/C++'s atoi function).

The algorithm for myAtoi(string s) is as follows:
1. Read in and ignore any leading whitespace.
2. Check if the next character (if not already at the end of the string) is '-' or '+'.
   Read this character in if it is either. This determines if the final result is negative or positive respectively.
   Assume the result is positive if neither is present.
3. Read in next the characters until the next non-digit character or the end of the input is reached.
   The rest of the string is ignored.
4. Convert these digits into an integer (i.e. "123" -> 123, "0032" -> 32). If no digits were read, then the integer is 0.
   Change the sign as necessary (from step 2).
5. If the integer is out of the 32-bit signed integer range [-2ˆ31, 2ˆ31 - 1], then clamp the integer
   so that it remains in the range. Specifically, integers less than -2ˆ31 should be clamped to -2ˆ31,
   and integers greater than 231 - 1 should be clamped to 231 - 1.
6. Return the integer as the final result.

Note:
- Only the space character ' ' is considered a whitespace character.
- Do not ignore any characters other than the leading whitespace or the rest of the string after the digits.


Example 1:
  Input: s = "42"
  Output: 42
  Explanation: The underlined characters are what is read in, the caret is the current reader position.

  Step 1: "42" (no characters read because there is no leading whitespace)
          ^
  Step 2: "42" (no characters read because there is neither a '-' nor '+')
          ^
  Step 3: "42" ("42" is read in)
            ^
  The parsed integer is 42.
  Since 42 is in the range [-2ˆ31, 2ˆ31 - 1], the final result is 42.

Example 2:
  Input: s = "   -42"
  Output: -42

  Explanation:
    Step 1: "   -42" (leading whitespace is read and ignored)
                ^
    Step 2: "   -42" ('-' is read, so the result should be negative)
                ^
    Step 3: "   -42" ("42" is read in)
                  ^
  The parsed integer is -42.
  Since -42 is in the range [-231, 231 - 1], the final result is -42.

Example 3:
  Input: s = "4193 with words"
  Output: 4193

  Explanation:
    Step 1: "4193 with words" (no characters read because there is no leading whitespace)
            ^
    Step 2: "4193 with words" (no characters read because there is neither a '-' nor '+')
            ^
    Step 3: "4193 with words" ("4193" is read in; reading stops because the next character is a non-digit)
                ^
  The parsed integer is 4193.
  Since 4193 is in the range [-231, 231 - 1], the final result is 4193.


Constraints:
- 0 <= s.length <= 200
- s consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'.

*/

var myAtoi = function (s) {
  let signal = 1
  let result = 0

  const digitRegex = /[0-9]/

  // Remove leading spaces
  let i = 0
  while (s[i] == ' ') {
    i++
  }
  // Handle signal
  if (s[i] == '+' || s[i] == '-') {
    if (s[i] == '-') signal *= -1
    i++
  }
  // Parse the number
  for (i; i < s.length; i++) {
    if (s[i].match(digitRegex)) {
      result = result * 10 + +s[i]
    } else break
  }

  result *= signal
  result = Math.max(result, -(2 ** 31))
  result = Math.min(result, 2 ** 31 - 1)
  return result
}

// A little cleaner solution
var myAtoi = function (s) {
  let signal = 1
  let result = 0
  const digitRegex = /[0-9]/

  s = s.trim()
  let i = 0
  if (s[i] == '+') i++
  else if (s[i] == '-') {
    signal *= -1
    i++
  }

  while (i < s.length && s[i].match(digitRegex)) {
    result = result * 10 + +s[i]
    i++
  }

  result *= signal
  result = Math.max(result, -(2 ** 31))
  result = Math.min(result, 2 ** 31 - 1)
  return result
}
