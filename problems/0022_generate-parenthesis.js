/*

Given n pairs of parentheses,
write a function to generate all combinations of well-formed parentheses.

Example 1:
  Input: n = 3
  Output: ["((()))","(()())","(())()","()(())","()()()"]

Example 2:
  Input: n = 1
  Output: ["()"]

Constraints:
- 1 <= n <= 8

*/

var generateParenthesis = function (n) {
  const result = []

  const combinations = (current, open, close) => {
    if (open + close == 2 * n) result.push(current)

    if (open < n) combinations(current + '(', open + 1, close)
    if (close < open) combinations(current + ')', open, close + 1)
  }

  // We always need to start with a open parenthesis
  combinations('(', 1, 0)
  return result
}
