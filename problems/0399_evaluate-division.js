/*

You are given an array of variable pairs equations and an array of real numbers values,
where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i].
Each Ai or Bi is a string that represents a single variable.

You are also given some queries, where queries[j] = [Cj, Dj]
represents the jth query where you must find the answer for Cj / Dj = ?.

Return the answers to all queries. If a single answer cannot be determined, return -1.0.

Note: The input is always valid.
      You may assume that evaluating the queries
      will not result in division by zero and that there is no contradiction.

Note: The variables that do not occur in the list of equations are undefined,
      so the answer cannot be determined for them.

Example 1:
  Input: equations = [["a","b"],["b","c"]],
         values = [2.0,3.0],
         queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
  Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
  Explanation:
    Given: a / b = 2.0, b / c = 3.0
    queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
    return: [6.0, 0.5, -1.0, 1.0, -1.0 ]
    note: x is undefined => -1.0

Example 2:
  Input: equations = [["a","b"],["b","c"],["bc","cd"]],
         values = [1.5,2.5,5.0],
         queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
  Output: [3.75000,0.40000,5.00000,0.20000]

Example 3:
  Input: equations = [["a","b"]],
         values = [0.5],
         queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
  Output: [0.50000,2.00000,-1.00000,-1.00000]

Constraints:
- 1 <= equations.length <= 20
- equations[i].length == 2
- 1 <= Ai.length, Bi.length <= 5
- values.length == equations.length
- 0.0 < values[i] <= 20.0
- 1 <= queries.length <= 20
- queries[i].length == 2
- 1 <= Cj.length, Dj.length <= 5
- Ai, Bi, Cj, Dj consist of lower case English letters and digits.

*/

var calcEquation = function (equations, values, queries) {
  // We create an object that represents a graph, where:
  // 1. Each of the properties (e.g. graph['a']) represent a node
  // 2. Each of the properties is also an object
  //    a. Each of this object's properties (e.g. graph['a']['b']) represent a neighbor
  //    b. And these properties' values represent the value of 'a' / 'b'
  const graph = {}
  for (let i = 0; i < equations.length; i++) {
    const [a, b] = equations[i]

    graph[a] || (graph[a] = {}) // equivalent to if (!graph[a]) graph[a] = {}
    graph[b] || (graph[b] = {}) // equivalent to if (!graph[b]) graph[b] = {}

    graph[a][b] = values[i]
    graph[b][a] = 1 / values[i]
  }

  // Evaluate queries
  const result = []
  for (let query of queries) {
    const [numerator, denominator] = query
    const visited = new Set()
    result.push(evaluate(numerator, denominator, visited, graph))
  }

  return result
}

// We use DFS to calculate the result of numerator / denominator.

// We do this by, starting from the numerator, depth-first searching the graph for every neighbors,
// and neighbors' neighbors until we find the path leading to the denominator
// (in which we reach the numerator == denominator condition below)

// Once the path is found, we calculate the product of every relationship defined
// in the graph populating step, by running neighbors[neighbor] * result
var evaluate = function (numerator, denominator, visited, graph) {
  if (!(numerator in graph) || !(denominator in graph)) return -1
  if (numerator == denominator) return 1

  visited.add(numerator)
  let neighbors = graph[numerator]

  for (let neighbor in neighbors) {
    if (visited.has(neighbor)) continue

    let result = evaluate(neighbor, denominator, visited, graph)
    if (result != -1) return neighbors[neighbor] * result
  }

  return -1
}
