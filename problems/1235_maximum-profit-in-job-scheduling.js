/*

We have n jobs, where every job is scheduled to be done from
startTime[i] to endTime[i], obtaining a profit of profit[i].

You're given the startTime, endTime and profit arrays,
return the maximum profit you can take such that there are no two jobs
in the subset with overlapping time range.

If you choose a job that ends at time X you will be able to
start another job that starts at time X.

Example 1:
  Input: startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]
  Output: 120
  Explanation: The subset chosen is the first and fourth job.
    Time range [1-3]+[3-6] , we get profit of 120 = 50 + 70.

Example 2:
  Input: startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60]
  Output: 150
  Explanation: The subset chosen is the first, fourth and fifth job.
    Profit obtained 150 = 20 + 70 + 60.

Example 3:
  Input: startTime = [1,1,1], endTime = [2,3,4], profit = [5,6,4]
  Output: 6

Constraints:
- 1 <= startTime.length == endTime.length == profit.length <= 5 * 104
- 1 <= startTime[i] < endTime[i] <= 109
- 1 <= profit[i] <= 104

*/

// Time limit exceeded top-down DP solution
var jobScheduling = function (startTime, endTime, profit) {
  const n = profit.length

  const jobs = profit.map((p, i) => [startTime[i], endTime[i], p]).sort((a, b) => a[0] - b[0])
  const dp = Array(n).fill() // dp[i] gives me the highest profit starting from jobs[i]

  const schedule = (i) => {
    if (dp[i]) return dp[i]
    const [_, curr_end, curr_profit] = jobs[i]

    let max_profit = 0
    for (let j = i + 1; j < n; j++) {
      const next_start = jobs[j][0]
      if (next_start >= curr_end) max_profit = Math.max(schedule(j), max_profit)
    }

    dp[i] = max_profit + curr_profit
    return dp[i]
  }

  let result = 0
  for (let i = 0; i < n; i++) result = Math.max(schedule(i), result)
  return result
}

// Optimal bottom-up DP solution
var jobScheduling = function (startTime, endTime, profit) {
  const n = profit.length
  const jobs = profit.map((p, i) => [startTime[i], endTime[i], p]).sort((a, b) => a[1] - b[1])

  const binary_search = (upper_limit, right) => {
    let left = 0

    while (left < right) {
      const mid = Math.floor((left + right) / 2)
      const end_time = jobs[mid][1]
      if (end_time <= upper_limit) left = mid + 1
      else right = mid
    }

    return left
  }

  // dp[i] gives me the highest possible profit until the i-th job's end time
  // (which may or may not include. the i-th job itself)
  const dp = Array(n + 1).fill(0)

  for (let i = 0; i < n; i++) {
    const [start, end, profit] = jobs[i]
    const latest_previous_job_index = binary_search(start, i)

    // We either choose to:
    // 1. Keep the direct previous profit which doesn't include the current job
    // 2. Get the latest possible saved previous profit which the current job
    //    can fit and add the current job's profit to it
    dp[i + 1] = Math.max(dp[i], dp[latest_previous_job_index] + profit)
  }

  return dp[n]
}
