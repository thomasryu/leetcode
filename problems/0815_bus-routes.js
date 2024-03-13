/*

You are given an array routes representing bus routes
where routes[i] is a bus route that the ith bus repeats forever.

For example, if routes[0] = [1, 5, 7], this means that the 0th bus travels
in the sequence 1 -> 5 -> 7 -> 1 -> 5 -> 7 -> 1 -> ... forever.
You will start at the bus stop source (You are not on any bus initially),
and you want to go to the bus stop target. You can travel between bus stops by buses only.

Return the least number of buses you must take to travel from source to target.
Return -1 if it is not possible.

Example 1:
  Input: routes = [[1,2,7],[3,6,7]], source = 1, target = 6
  Output: 2
  Explanation: The best strategy is take the first bus to the bus stop 7,
    then take the second bus to the bus stop 6.

Example 2:
Input: routes = [[7,12],[4,5,15],[6],[15,19],[9,12,13]], source = 15, target = 12
Output: -1

Constraints:
- 1 <= routes.length <= 500.
- 1 <= routes[i].length <= 105
- All the values of routes[i] are unique.
- sum(routes[i].length) <= 105
- 0 <= routes[i][j] < 106
- 0 <= source, target < 106

*/

// DFS + DP solution
var numBusesToDestination = function (bus_to_routes, source, target) {
  if (source == target) return 0

  const n = bus_to_routes.length
  const route_to_buses = new Map()

  // dp[i] gives me the shortest number of bus routes to reach
  // the target route's bus(es) from the ith bus
  const dp = Array(n).fill()

  // Create the inverse route-to-buses map
  for (let bus = 0; bus < n; bus++) {
    const routes = bus_to_routes[bus]
    for (let route of routes) {
      if (!route_to_buses.has(route)) route_to_buses.set(route, new Set())
      route_to_buses.get(route).add(bus)
    }
  }

  // We directly construct a bus adjacency list, which tells me which
  // buses' routes intersect with which
  const bus_adj_list = new Map()
  for (let bus = 0; bus < n; bus++) {
    if (!bus_adj_list.has(bus)) bus_adj_list.set(bus, new Set())
    const bus_adj_set = bus_adj_list.get(bus)

    for (let route of bus_to_routes[bus])
      for (let adj_bus of route_to_buses.get(route)) bus != adj_bus && bus_adj_set.add(adj_bus)
  }

  const source_buses = route_to_buses.get(source)
  const target_buses = route_to_buses.get(target)

  // No buses reach source or target routes
  if (!source_buses || !target_buses) return -1

  // Classic top-down DFS to go from source bus to target bus
  const shortest_path = (bus, visited) => {
    if (target_buses.has(bus)) return 0
    if (dp[bus]) return dp[bus]

    let result = Infinity
    for (let adj_bus of bus_adj_list.get(bus)) {
      if (visited.has(adj_bus)) continue
      visited.add(adj_bus)
      result = Math.min(result, shortest_path(adj_bus, visited) + 1)
      visited.delete(adj_bus)
    }

    dp[bus] = result
    return result
  }

  let answer = Infinity
  const visited = new Set()
  for (let bus of source_buses) {
    visited.add(bus)
    answer = Math.min(answer, shortest_path(bus, visited) + 1)
    visited.delete(bus)
  }

  return answer == Infinity ? -1 : answer
}

// Bellman-Ford-esque solution
var numBusesToDestination = function (routes, source, target) {
  if (source == target) return 0

  const n = routes.length
  let reached_stops = new Set([source])

  let new_stops_added = true
  let count = 0

  while (new_stops_added) {
    const new_stops = []
    new_stops_added = false
    count++

    for (let i = 0; i < n; i++) {
      const route = routes[i]
      let route_has_reachable_stop = false

      for (let stop of route) {
        if (reached_stops.has(stop)) {
          route_has_reachable_stop = true
          new_stops_added = true

          routes[i] = []
          break
        }
      }

      if (route_has_reachable_stop) new_stops.push(...route)
    }

    new_stops.forEach((stop) => reached_stops.add(stop))
    if (reached_stops.has(target)) return count
  }

  return -1
}
