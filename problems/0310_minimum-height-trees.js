/*

A tree is an undirected graph in which any two vertices are connected by exactly one path.
In other words, any connected graph without simple cycles is a tree.

Given a tree of n nodes labelled from 0 to n - 1, and an array of n - 1 edges where edges[i] = [ai, bi]
indicates that there is an undirected edge between the two nodes ai and bi in the tree,
you can choose any node of the tree as the root. When you select a node x as the root, the result tree has height h.
Among all possible rooted trees, those with minimum height (i.e. min(h))  are called minimum height trees (MHTs).

Return a list of all MHTs' root labels. You can return the answer in any order.

The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.

Example 1:
  Input: n = 4, edges = [[1,0],[1,2],[1,3]]
  Output: [1]
  Explanation: As shown, the height of the tree is 1 when the root is the node with label 1 which is the only MHT.

Example 2:
  Input: n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
  Output: [3,4]

Constraints:
- 1 <= n <= 2 * 104
- edges.length == n - 1
- 0 <= ai, bi < n
- ai != bi
- All the pairs (ai, bi) are distinct.
- The given input is guaranteed to be a tree and there will be no repeated edges.

*/

var findMinHeightTrees = function (n, edges) {
  if (n <= 2)
    return Array(n)
      .fill()
      .map((e, i) => i)

  // Build the adjacency list
  const graph = new Map()
  for (const [a, b] of edges) {
    if (!graph.has(a)) graph.set(a, new Set())
    if (!graph.has(b)) graph.set(b, new Set())
    graph.get(a).add(b)
    graph.get(b).add(a)
  }

  let queue = []
  let next_queue = []

  // Topological sort: At each BFS step, trim all the leaves
  // until 2 or fewer nodes remain (the centroid nodes)
  for (let i = 0; i < n; i++) if (graph.get(i).size == 1) queue.push(i) // Start with the leaves

  while (queue.length) {
    const node = queue.shift()

    for (let neighbor of graph.get(node)) {
      // 1. Remove the edge between neighbor and node
      graph.get(neighbor).delete(node)
      // 2. If neighbor becomes a leaf, add it to next_queue
      if (graph.get(neighbor).size == 1) next_queue.push(neighbor)
    }
    // 3. Lastly, remove node from the tree
    graph.delete(node)
    n--

    if (!queue.length && next_queue.length) {
      // If 2 or fewer nodes remain, they're the solution
      // (since we have a non cyclic tree, there can't be 3 or more)
      if (n <= 2) break
      queue = next_queue
      next_queue = []
    }
  }

  // Return the remaining nodes
  return [...graph.keys()]
}
