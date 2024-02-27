/*

You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times
as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node,
and wi is the time it takes for a signal to travel from source to target.

We will send a signal from a given node k. Return the minimum time it takes for
all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.

Example 1:
  Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
  Output: 2

Example 2:
  Input: times = [[1,2,1]], n = 2, k = 1
  Output: 1

Example 3:
  Input: times = [[1,2,1]], n = 2, k = 2
  Output: -1

Constraints:
- 1 <= k <= n <= 100
- 1 <= times.length <= 6000
- times[i].length == 3
- 1 <= ui, vi <= n
- ui != vi
- 0 <= wi <= 100
- All the pairs (ui, vi) are unique. (i.e., no multiple edges.)

*/

var networkDelayTime = function (times, n, k) {
  const dp = Array(n).fill(Infinity)
  dp[k - 1] = 0

  // The worst case scenario is our graph is a line
  // so we test, at most n steps
  for (let i = 0; i < n; i++) {
    for (let [from, to, time] of times) {
      if (dp[from - 1] == Infinity) continue
      dp[to - 1] = Math.min(dp[to - 1], dp[from - 1] + time)
    }
  }
  const result = Math.max(...dp)
  return result == Infinity ? -1 : result
}
