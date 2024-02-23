/*

There are n cities connected by some number of flights.
You are given an array flights where flights[i] = [fromi, toi, pricei]
indicates that there is a flight from city fromi to city toi with cost pricei.

You are also given three integers src, dst, and k, return the cheapest price
from src to dst with at most k stops. If there is no such route, return -1.

Example 1:
  Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]],
         src = 0, dst = 3, k = 1
  Output: 700
  Explanation:
    The graph is shown above.
    The optimal path with at most 1 stop from city 0 to 3 is
      marked in red and has cost 100 + 600 = 700.
    Note that the path through cities [0,1,2,3] is cheaper
      but is invalid because it uses 2 stops.

Example 2:
  Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
  Output: 200
  Explanation:
    The graph is shown above.
    The optimal path with at most 1 stop from city 0 to 2 is marked
      in red and has cost 100 + 100 = 200.


Example 3:
  Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0
  Output: 500
  Explanation:
    The graph is shown above.
    The optimal path with no stops from city 0 to 2 is marked in red and has cost 500.


Constraints:
- 1 <= n <= 100
- 0 <= flights.length <= (n * (n - 1) / 2)
- flights[i].length == 3
- 0 <= fromi, toi < n
- fromi != toi
- 1 <= pricei <= 104
- There will not be any multiple flights between two cities.
- 0 <= src, dst, k < n
- src != dst

*/

// DFS + DP solution
var findCheapestPrice = function (n, flights, src, dst, k) {
  const graph = {}
  const dp = Array(n)
    .fill()
    .map(() => Array(k).fill())

  for (let [from, to, price] of flights) {
    graph[from] || (graph[from] = [])
    graph[from].push([to, price])
  }

  // We can't use a "navigate" set because, if our dp[i][k] gives me the cheapest
  // path to the destination, starting from city i and within k steps, we need to
  // test all possibilities, even if they go back to cities our DFS already passed by.
  const navigate = (src, dst, k) => {
    // Reached our destination
    if (src == dst) return 0
    // No more steps or dead end
    if (k == 0 || !graph[src]) return Infinity
    // Already calculated value
    if (dp[src][k]) return dp[src][k]

    let result = Infinity
    for (let [neighbor, cost] of graph[src]) {
      result = Math.min(result, navigate(neighbor, dst, k - 1) + cost)
    }

    dp[src][k] = result
    return result
  }

  const result = navigate(src, dst, k + 1)
  return result == Infinity ? -1 : result
}

// Bellman-Ford solution
const findCheapestPrice = (n, flights, src, dst, k) => {
  // dp[i] gives the current cheapest cost of reaching i, starting from src.
  // dp[] will be updated k times, each representing a jump
  let dp = Array(n + 1).fill(Infinity)
  dp[src] = 0 // The cost of reaching src from src, in 0 steps is 0

  for (let i = 0; i <= k; i++) {
    const temp_dp = [...dp]

    // For each possible step
    for (let [from, to, price] of flights) {
      if (dp[from] == Infinity) continue // We are not able to reach "from" at this times
      temp_dp[to] = Math.min(temp_dp[to], dp[from] + price) // See if we found a cheaper path to "to"
    }

    dp = temp_dp
  }

  return dp[dst] == Infinity ? -1 : dp[dst]
}
