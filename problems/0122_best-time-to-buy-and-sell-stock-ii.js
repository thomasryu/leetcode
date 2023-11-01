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
