/*

There are n cities numbered from 0 to n - 1 and n - 1 roads such that
there is only one way to travel between two different cities (this network form a tree).
Last year, The ministry of transport decided to orient the roads in one direction
because they are too narrow.

Roads are represented by connections where connections[i] = [ai, bi]
represents a road from city ai to city bi.

This year, there will be a big event in the capital (city 0),
and many people want to travel to this city.

Your task consists of reorienting some roads such that each city can visit the city 0.
Return the minimum number of edges changed.

It's guaranteed that each city can reach city 0 after reorder.

Example 1:
  Input: n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]
  Output: 3
  Explanation: Change the direction of edges show in red such that
               each node can reach the node 0 (capital).

Example 2:
  Input: n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]
  Output: 2
  Explanation: Change the direction of edges show in red such that
               each node can reach the node 0 (capital).

Example 3:
  Input: n = 3, connections = [[1,0],[2,0]]
  Output: 0

Constraints:
- 2 <= n <= 5 * 104
- connections.length == n - 1
- connections[i].length == 2
- 0 <= ai, bi <= n - 1
- ai != bi

*/

var minReorder = function (n, connections) {
  let result = 0
  const roads = []

  // Create a graph with each connection
  // from and to, and to and from
  for (let c of connections) {
    const from = c[0]
    const to = c[1]

    roads[from] || (roads[from] = [])
    roads[to] || (roads[to] = [])

    // We also save the direction of the connection:
    // 1 if straight and 0 if reversed
    roads[from].push([to, 1])
    roads[to].push([from, 0])
  }

  // With a BFS, we navigate every road, reversing
  // the road if necessary (by simply adding the value of road[1])
  const queue = [roads[0]]
  while (queue.length) {
    const city = queue.shift()

    while (city.length) {
      const road = city.shift()

      if (roads[road[0]]?.length) {
        queue.push(roads[road[0]])
        result += road[1]
      }
    }
  }

  return result
}
