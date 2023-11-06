/*

Given an input string s, reverse the order of the words.

A word is defined as a sequence of non-space characters.
The words in s will be separated by at least one space.

Return a string of the words in reverse order concatenated by a single space.

Note that s may contain leading or trailing spaces or multiple spaces between two words.
The returned string should only have a single space separating the words. Do not include any extra spaces.

Example 1:
  Input: s = "the sky is blue"
  Output: "blue is sky the"

Example 2:
  Input: s = "  hello world  "
  Output: "world hello"
  Explanation: Your reversed string should not contain leading or trailing spaces.

Example 3:
  Input: s = "a good   example"
  Output: "example good a"
  Explanation: You need to reduce multiple spaces between
               two words to a single space in the reversed string.

Constraints:
- 1 <= s.length <= 104
- s contains English letters (upper-case and lower-case), digits, and spaces ' '.
- There is at least one word in s.

Follow-up: If the string data type is mutable in your language,
           can you solve it in-place with O(1) extra space?

*/

// Short solution
var reverseWords = function (s) {
  return s.trim().replace(/\s+/g, ' ').split(' ').reverse().join(' ')
}

// Manual solution
var reverseWords = function (s) {
  let result = []

  // Utility function to reverse a string
  // within the given indexes
  const reverse = (start, end) => {
    while (start <= end) {
      const x = result[start]
      result[start] = result[end]
      result[end] = x
      start++
      end--
    }
  }

  // Remove excess spaces from both ends and from
  // between words
  s = s.trim().replace(/\s+/g, ' ')
  result = [...s]

  // 1. Revert the entire array
  const n = result.length
  reverse(0, n - 1)

  // 2. Reverse each word in the array
  let start = 0
  for (let end = 1; end <= n; end++) {
    if (end == n || result[end] == ' ') {
      reverse(start, end - 1)
      end++
      start = end
    }
  }

  return result.join('')
}
