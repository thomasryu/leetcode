var maxProfit = function (prices) {
  let min = 10000
  let profit = 0
  let total = 0

  prices.forEach((price, i) => {
    min = Math.min(min, price)
    profit = Math.max(profit, price - min)

    // profit + min is equal to the max value found until now in the prices array

    // Strategy:
    //   if price stays the same or dips OR if we are at the end of the array,
    //   we add our current profit to the total and update our min price to the current one

    // Explanation:
    //   Even if we encounter a higher max value in the future, which would allow us to make
    //   a biger sales, if we make partial sales when the prices stay the same or dips, the total
    //   of these partials will be equal or higher than the bigger one.
    if (price <= profit + min || i == prices.length - 1) {
      min = price
      total += profit
      profit = 0
    }
  })

  return total
}

// Attempt made at 05/04/2024
var maxProfit = function (prices) {
  // 0: The current maximum profit if tou currently hold no stock (i.e. can only buy)
  // 1: The current maximum profit if you currently have stock (i.e. can only sell)

  const dp = Array(3)
  dp[0] = 0
  dp[1] = -Infinity

  for (let price of prices) {
    // We either keep the status quo or sell our previous stock
    dp[0] = Math.max(dp[0], dp[1] + price)

    // We either keep the status quo or buy the current stuck
    dp[1] = Math.max(dp[1], dp[0] - price)
  }

  return Math.max(dp[0], dp[1])
}
