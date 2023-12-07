/*

You are given an array prices where prices[i]
is the price of a given stock on the ith day.

Find the maximum profit you can achieve.
You may complete at most two transactions.

Note: You may not engage in multiple transactions simultaneously
(i.e., you must sell the stock before you buy again).

Example 1:
  Input: prices = [3,3,5,0,0,3,1,4]
  Output: 6
  Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
               Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.

Example 2:
  Input: prices = [1,2,3,4,5]
  Output: 4
  Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
               Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.
Example 3:
  Input: prices = [7,6,4,3,1]
  Output: 0
  Explanation: In this case, no transaction is done, i.e. max profit = 0.

Constraints:
- 1 <= prices.length <= 105
- 0 <= prices[i] <= 105

*/

var maxProfit = function (prices) {
  if (prices.length <= 1) return 0

  const n = prices.length

  // The strategy is to create two arrays,
  // - bestEndingAt[i] which stores the maximum profit possible until prices[i]
  // - maxStartingAt[i] which stores the maximum profit possible from prices[i] onwards
  const bestEndingAt = Array(n)
  const bestStartingAt = Array(n)

  bestEndingAt[0] = 0
  bestStartingAt[n - 1] = 0

  let min = prices[0]
  let max = prices[n - 1]

  for (let i = 1; i < n; i++) {
    min = Math.min(min, prices[i])
    bestEndingAt[i] = Math.max(bestEndingAt[i - 1], prices[i] - min)

    max = Math.max(max, prices[n - 1 - i])
    bestStartingAt[n - 1 - i] = Math.max(
      bestStartingAt[n - i],
      max - prices[n - 1 - i],
    )
  }

  // The strategy is to find a position i that maximizes
  // the sum (bestEndingAt[i] + bestStartingAt[i + 1])
  let result = 0
  for (let i = 0; i < n; i++)
    result = Math.max(result, bestEndingAt[i] + bestStartingAt[i])
  return result
}
