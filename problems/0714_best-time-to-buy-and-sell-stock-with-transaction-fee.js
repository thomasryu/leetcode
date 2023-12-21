/*

You are given an array prices where prices[i]
is the price of a given stock on the ith day,
and an integer fee representing a transaction fee.

Find the maximum profit you can achieve.
You may complete as many transactions as you like,
but you need to pay the transaction fee for each transaction.

Note:

- You may not engage in multiple transactions simultaneously
  (i.e., you must sell the stock before you buy again).
- The transaction fee is only charged once for each stock purchase and sale.

Example 1:
  Input: prices = [1,3,2,8,4,9], fee = 2
  Output: 8
  Explanation: The maximum profit can be achieved by:
               - Buying at prices[0] = 1
               - Selling at prices[3] = 8
               - Buying at prices[4] = 4
               - Selling at prices[5] = 9
               The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.

Example 2:
  Input: prices = [1,3,7,5,10,3], fee = 3
  Output: 6

Constraints:
- 1 <= prices.length <= 5 * 104
- 1 <= prices[i] < 5 * 104
- 0 <= fee < 5 * 104

*/

// Default solution
var maxProfit = function (prices, fee) {
  // dp[i][0] gives me the highest profit, with no current stocks
  // dp[i][1] gives me the highest profit, while currently holding stocks
  const dp = Array(prices.length)
    .fill()
    .map(() => [0, -Infinity])
  dp[0] = [0, -prices[0]]

  for (let i = 1; i < prices.length; i++) {
    // We either just skip the current price or buy/sell the current price
    // based on the previous empty-handed/holding stock state
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee)
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
  }

  return dp[prices.length - 1][0]
}

// Optimized solution
var maxProfit = function (prices, fee) {
  const dp = [0, -prices[0]]
  for (let i = 1; i < prices.length; i++) {
    // We either just skip the current price or buy/sell the current price
    // based on the previous empty-handed/holding stock state
    dp[0] = Math.max(dp[0], dp[1] + prices[i] - fee)
    dp[1] = Math.max(dp[1], dp[0] - prices[i])
  }

  return dp[0]
}
