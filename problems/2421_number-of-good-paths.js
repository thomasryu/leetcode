// Time limit exceeded DFS solution
var numberOfGoodPaths = function (vals, edges) {
  const in_path = new Set()
  let result = 0

  const graph = {}
  for (let [a, b] of edges) {
    graph[a] || (graph[a] = [])
    graph[b] || (graph[b] = [])
    graph[a].push(b)
    graph[b].push(a)
  }

  console.log(graph)

  const dfs = (i, start_val, visited) => {
    console.log(i, start_val, vals[i], visited)
    // If not a good path, skip
    if (vals[i] > start_val) return 0

    let good_nodes = 0

    // If our current good path, has x nodes with the same value as the starting one,
    // finding another valid node with the correct value, adds x new good paths,
    // one starting from each previous ones we've found (similar to a fibonacci)
    if (vals[i] == start_val) {
      good_nodes++
      // If we add a node to an existing good path, don't need to calculate
      // it again (i.e. start another DFS from it in the future)
      in_path.add(i)
    }

    if (graph[i]) {
      for (let neighbor of graph[i]) {
        if (visited.has(neighbor)) continue
        visited.add(neighbor)
        good_nodes += dfs(neighbor, start_val, visited)
        visited.delete(neighbor)
      }
    }

    return good_nodes
  }

  const visited = new Set()
  for (let i = 0; i < vals.length; i++) {
    visited.add(i)
    if (!in_path.has(i)) {
      const good_nodes = dfs(i, vals[i], visited)
      result += (good_nodes * (good_nodes + 1)) / 2
    }
    visited.delete(i)
  }

  return result
}

// Optimal Union-Find solution
class UnionFind {
  constructor(n) {
    this.parent = [...Array(n).keys()]
    this.rank = Array(n).fill(1)
  }
  find = (b) => {
    if (this.parent[b] == b) return b
    return (this.parent[b] = this.find(this.parent[b]))
  }
  union = (a, b) => {
    const root_a = this.find(a)
    const root_b = this.find(b)

    if (root_a == root_b) return

    if (this.rank[root_a] > this.rank[root_b]) this.parent[root_b] = root_a
    else if (this.rank[root_b] > this.rank[root_a]) this.parent[root_a] = root_b
    else {
      this.parent[root_a] = root_b
      this.rank[root_b]++
    }
  }
}
var numberOfGoodPaths = function (vals, edges) {
  const n = vals.length

  // Create an adjency list
  const adjacent = {}
  for (let [a, b] of edges) {
    adjacent[a] || (adjacent[a] = [])
    adjacent[b] || (adjacent[b] = [])
    adjacent[a].push(b)
    adjacent[b].push(a)
  }

  // Create a values-to-nodes map
  const val_to_nodes = {}
  for (let i = 0; i < n; i++) {
    const val = vals[i]
    val_to_nodes[val] || (val_to_nodes[val] = [])
    val_to_nodes[val].push(i)
  }

  // And a union find of all nodes in the current good paths group
  // (this is updated for each value in ascending order)
  const union_find = new UnionFind(n)
  let result = 0

  for (let val in val_to_nodes) {
    const nodes = val_to_nodes[val]

    // For each node of value val, unite them with their respective
    // neighbors if their values are lesser or equal than theirs
    for (let node of nodes) {
      if (!adjacent[node]) continue
      for (let neighbor of adjacent[node]) if (vals[neighbor] <= val) union_find.union(node, neighbor)
    }

    // Get the sizes of unions, considering only nodes of value val
    const union_sizes = new Map()
    for (let node of nodes) {
      const root = union_find.find(node)
      union_sizes.set(root, (union_sizes.get(root) || 0) + 1)
    }

    // Update the good paths count by getting each size and adding the combinatory
    // (size * (size + 1)) / 2, which gives all possible good paths count
    for (let size of union_sizes.values()) {
      result += (size * (size + 1)) / 2
    }
  }

  return result
}
