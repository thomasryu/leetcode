/*

You are given a list of airline tickets where tickets[i] = [fromi, toi]
represent the departure and the arrival airports of one flight.
Reconstruct the itinerary in order and return it.

All of the tickets belong to a man who departs from "JFK", thus,
the itinerary must begin with "JFK". If there are multiple valid itineraries,
you should return the itinerary that has the smallest lexical order when read as a single string.

For example, the itinerary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].
You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.

Example 1:
  Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
  Output: ["JFK","MUC","LHR","SFO","SJC"]

Example 2:
  Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
  Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
  Explanation: Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"]
    but it is larger in lexical order.

Constraints:
- 1 <= tickets.length <= 300
- tickets[i].length == 2
- fromi.length == 3
- toi.length == 3
- fromi and toi consist of uppercase English letters.
- fromi != toi

*/

// Performance = O(E * log(N) + E)
// Space = O(E + N)
var findItinerary = function (tickets) {
  const n = tickets.length
  tickets.sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]))

  const adj_list = {}
  for (let [from, to] of tickets) {
    adj_list[from] || (adj_list[from] = {})
    adj_list[from][to] = (adj_list[from][to] || 0) + 1
  }

  const answer = ['JFK']

  const dfs = (from) => {
    if (answer.length == n + 1) return answer
    if (!adj_list[from]) return

    for (let to in adj_list[from]) {
      if (adj_list[from][to] == 0) continue
      adj_list[from][to] -= 1

      answer.push(to)

      let result = dfs(to)
      if (result) return result

      adj_list[from][to] += 1
      answer.pop()
    }

    return
  }

  return dfs('JFK')
}

// Attempt made at 20/04/2024
var findItinerary = function (tickets) {
  const adj = {}

  tickets.sort((a, b) => {
    const [a_from, a_to] = a
    const [b_from, b_to] = b
    return a_from.localeCompare(b_from) || a_to.localeCompare(b_to)
  })

  for (const [from, to] of tickets) {
    adj[from] || (adj[from] = {})
    adj[from][to] = (adj[from][to] || 0) + 1
  }

  const result = []
  const dfs = function (curr = 'JFK') {
    // If the current node has unused outgoing edges, navigate through them
    for (const next in adj[curr]) {
      if (!adj[curr][next]) continue

      adj[curr][next]--
      dfs(next)
    }

    // If the node has no more outgoing edges, unshift it to the result
    // (the first "dead-end" will be the last node we visit,
    // and the second will be the second last, and so on)
    result.unshift(curr)
  }

  // This only works, because our starting point is fixed
  // and the problem gives us a valid itinerary
  dfs()
  return result
}
