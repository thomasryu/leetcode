/*

Given a string s containing only three types of characters:
'(', ')' and '*', return true if s is valid.

The following rules define a valid string:

- Any left parenthesis '(' must have a corresponding right parenthesis ')'.
- Any right parenthesis ')' must have a corresponding left parenthesis '('.
- Left parenthesis '(' must go before the corresponding right parenthesis ')'.
- '*' could be treated as a single right parenthesis ')'
  or a single left parenthesis '(' or an empty string "".

Example 1:
  Input: s = "()"
  Output: true

Example 2:
  Input: s = "(*)"
  Output: true

Example 3:
  Input: s = "(*))"
  Output: true

Constraints:
- 1 <= s.length <= 100
- s[i] is '(', ')' or '*'.

*/

var checkValidString = function (s) {
  const n = s.length

  const left_par = []
  const asterisk = []

  // 1. Clear all right parenthesis from s
  for (let i = 0; i < n; i++) {
    switch (s[i]) {
      case '*':
        asterisk.push(i)
        break
      case '(':
        left_par.push(i)
        break
      case ')':
        // Remove the closest left parenthesis
        // Or an asterisk if none are available
        if (left_par.length) left_par.pop()
        else if (asterisk.length) asterisk.pop()
        // If no left parenthesis or asterisk exist
        // return false
        else return false
    }
  }

  // 2. Clear all left parenthesis from the stack
  while (left_par.length) {
    // Ignore all asterisks that come before a left parenthesis
    while (asterisk.length && asterisk[0] < left_par[0]) asterisk.shift()

    // If there are no matching asterisk for my left parenthesis, return false
    if (!asterisk.length) return false

    // Match the left parenthesis with its asterisk
    left_par.shift()
    asterisk.shift()
  }

  return true
}
