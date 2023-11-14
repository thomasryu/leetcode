/*

Given a string s containing just the characters
'(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.


Example 1:
  Input: s = "()"
  Output: true

Example 2:
  Input: s = "()[]{}"
  Output: true

Example 3:
  Input: s = "(]"
  Output: false

Constraints:
- 1 <= s.length <= 104
- s consists of parentheses only '()[]{}'.

*/

var isValid = function (s) {
  const stack = []
  const map = {
    ')': '(',
    ']': '[',
    '}': '{',
  }

  for (c of s) {
    // Opening parenthesis
    if (Object.values(map).includes(c)) {
      stack.push(c)
    }

    // Closing parenthesis
    else {
      if (map[c] !== stack.pop()) return false
    }
  }

  return stack.length == 0
}
