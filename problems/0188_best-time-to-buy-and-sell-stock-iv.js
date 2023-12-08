/*

You are given an integer array prices where prices[i]
is the price of a given stock on the ith day,and an integer k.

Find the maximum profit you can achieve.
You may complete at most k transactions:
i.e. you may buy at most k times and sell at most k times.

Note: You may not engage in multiple transactions simultaneously
(i.e., you must sell the stock before you buy again).

Example 1:
  Input: k = 2, prices = [2,4,1]
  Output: 2
  Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4),
               profit = 4-2 = 2.

Example 2:
  Input: k = 2, prices = [3,2,6,5,0,3]
  Output: 7

Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6),
             profit = 6-2 = 4. Then buy on day 5 (price = 0)
             and sell on day 6 (price = 3), profit = 3-0 = 3.

Constraints:
- 1 <= k <= 100
- 1 <= prices.length <= 1000
- 0 <= prices[i] <= 1000

*/

var maxProfit = function (k, prices) {
  // dp[i][0] gives me the best profit with, at most, (i - 1) transactions,
  //          and one transaction started (i.e., I can only sell stock)
  // dp[i][1] gives me the best profit with, at most, i transactions
  //          (i.e., I can only buy stock)
  const dp = Array(k + 1)
    .fill()
    .map(() => [-Infinity, 0])
  dp[0] = [0, 0]

  for (let price of prices)
    for (let i = 1; i <= k; i++) {
      // 1. dp[i][0]             -> We keep our current best profit, ignoring new price (open ended)
      // 2. dp[i - 1][1] - price -> From (i - 1) (at most) transactions, we initiate a new one
      dp[i][0] = Math.max(dp[i][0], dp[i - 1][1] - price)
      // 1. dp[i][1]             -> We keep our current best profit, ignoring new price (close ended)
      // 2. dp[i][0] + price     -> We sell (the trick here is to realize that we will never buy
      //                            and sell on the same day, because that won't maximize profit)
      dp[i][1] = Math.max(dp[i][1], dp[i][0] + price)
    }

  return dp[k][1]
}
