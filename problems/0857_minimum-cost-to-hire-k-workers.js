var mincostToHireWorkers = function (quality, wage, k) {
  // Each worker has a (wage / quality)
  // we need to minimize total quality * max(wagei / qualityi)
  const n = quality.length

  // dp[i][j] will give me [total_quality, max_ratio] which minimizes the amount
  // of money needed when picking the i-th worker from the 0 to j-th workers
  const dp = Array(k)
    .fill()
    .map(() => Array(n).fill([]))

  for (let i = 0; i < n; i++) dp[0][i] = [wage[i] / quality[i], quality[i]]

  if (k == 1) return Math.min(...dp[0].map(x => x[0] * x[1]))

  for (let i = 1; i <= k; i++) {
    for (let j = 0; j < n; j++) {
      const curr_ratio = wage[j] / quality[j]
      const curr_quality = quality[j]

      // For our current choice, we can either choose to keep the previous
      // [i, j - 1] choice or add the j-th worker to the [i - 1, j - 1] one

      if (j < i) continue // There are less workers than choices
      if (j == i) {
        // Our only choice is to add the current worker
        const [prev_ratio, total] = dp[i - 1][j - 1]
        dp[i][j] = [Math.max(prev_ratio, curr_ratio), total + curr_quality]
        continue
      }

      const keep_cost = dp[i][j - 1][0] * dp[i][j - 1][1]
      let add_cost = Infinity
      let add_index = -1

      for (let l = i - 1; l < j; l++) {
        const test_ratio = Math.max(dp[i - 1][l][0], curr_ratio)
        const test_total = dp[i - 1][l][1] + curr_quality
        const test_cost = test_ratio * test_total

        if (test_cost < add_cost) {
          add_index = l
          add_cost = test_cost
        }
      }

      if (keep_cost <= add_cost) dp[i][j] = dp[i][j - ]
      else
        dp[i][j] = [
          Math.max(dp[i - 1][add_index][0], curr_ratio),
          dp[i - 1][add_index][1] + curr_quality,
        ]
    }
  }

  return dp[k - 1][n - 1][0] * dp[k - 1][n - 1][1]
}
