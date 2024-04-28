/*

There is an undirected connected tree with n nodes labeled from 0 to n - 1 and n - 1 edges.

You are given the integer n and the array edges where edges[i] = [ai, bi] indicates that
there is an edge between nodes ai and bi in the tree.

Return an array answer of length n where answer[i] is the sum of the distances
between the ith node in the tree and all other nodes.

Example 1:
  Input: n = 6, edges = [[0,1],[0,2],[2,3],[2,4],[2,5]]
  Output: [8,12,6,10,10,10]
  Explanation: The tree is shown above.
    We can see that dist(0,1) + dist(0,2) + dist(0,3) + dist(0,4) + dist(0,5)
    equals 1 + 1 + 2 + 2 + 2 = 8.
    Hence, answer[0] = 8, and so on.

Example 2:
  Input: n = 1, edges = []
  Output: [0]

Example 3:
  Input: n = 2, edges = [[1,0]]
  Output: [1,1]

Constraints:
- 1 <= n <= 3 * 104
- edges.length == n - 1
- edges[i].length == 2
- 0 <= ai, bi < n
- ai != bi
- The given input represents a valid tree.

*/

// Unoptimal O(Nˆ2) BFS solution (time limit exceeded)
var sumOfDistancesInTree = function (n, edges) {
  if (n == 1) return [0]

  const graph = {}
  for (let [a, b] of edges) {
    graph[a] || (graph[a] = [])
    graph[b] || (graph[b] = [])
    graph[a].push(b)
    graph[b].push(a)
  }

  const queue = []
  const result = Array(n).fill(0)
  const visited = new Set()

  for (let i = 0; i < n; i++) {
    queue.push([i, 0])
    visited.add(i)

    while (queue.length) {
      const [node, dist] = queue.shift()
      result[node] += dist

      for (let neighbor of graph[node]) {
        if (visited.has(neighbor)) continue
        visited.add(neighbor)
        queue.push([neighbor, dist + 1])
      }
    }

    visited.clear()
  }

  return result
}

// Optimal O(N) double DFS solution
var sumOfDistancesInTree = function (n, edges) {
  if (n == 1) return [0]

  const graph = {}
  for (let [a, b] of edges) {
    graph[a] || (graph[a] = [])
    graph[b] || (graph[b] = [])
    graph[a].push(b)
    graph[b].push(a)
  }

  // Imagine a tree with root on 0
  // count[i] gives me the number of nodes
  // in the subtree with root on i
  const count = Array(n)

  // and sum[i] will give me the sum of all distances
  // from all the subtree's nodes to its root i
  const sum = Array(n)

  const visited = new Set([0])

  // For the tree that starts on node 0,
  // get the number of nodes for each subtree starting at node i and
  // the sum of all distances between the child nodes and root i
  const dfs_root = (node, dist) => {
    let curr_count = 1
    let curr_sum = 0

    for (let child of graph[node]) {
      if (visited.has(child)) continue
      visited.add(child)

      const [count, sum] = dfs_root(child, dist + 1)
      curr_count += count

      // Given a root X and a subtree with root Y with sum M and N nodes,
      // the distance sum that Y adds to X is M + N. This is because, for each
      // node Z of the subtree on Y, the distance of X to Z still needs to pass
      // through the edge between X and Y, N passes in total.
      curr_sum += sum + count
    }
    count[node] = curr_count
    sum[node] = curr_sum
    return [curr_count, curr_sum]
  }

  const dfs_rest = (node, parent) => {
    if (parent != null) {
      // For a subtree starting at node, the size of the tree
      // formed by all nodes not currently in the subtree is (n - count[node])
      const other_count = n - count[node]

      // The sum of all the distances from the node's parent to all nodes not
      // inside our current subtree is (sum[parent] - sum[node] - count[node])
      const other_sum = sum[parent] - sum[node] - count[node]

      // Therefore, the sum of the distances of our node to all the other nodes is
      sum[node] += other_sum + other_count
    }

    for (let child of graph[node]) {
      if (visited.has(child)) continue
      visited.add(child)
      dfs_rest(child, node)
    }
  }

  dfs_root(0, 0)
  visited.clear()
  visited.add(0)
  dfs_rest(0, null)

  return sum
}
