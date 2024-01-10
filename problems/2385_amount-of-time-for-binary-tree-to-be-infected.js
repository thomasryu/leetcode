/*

You are given the root of a binary tree with unique values, and an integer start.
At minute 0, an infection starts from the node with value start.

Each minute, a node becomes infected if:

- The node is currently uninfected.
- The node is adjacent to an infected node.
- Return the number of minutes needed for the entire tree to be infected.

Example 1:
  Input: root = [1,5,3,null,4,10,6,9,2], start = 3
  Output: 4
  Explanation: The following nodes are infected during:
    - Minute 0: Node 3
    - Minute 1: Nodes 1, 10 and 6
    - Minute 2: Node 5
    - Minute 3: Node 4
    - Minute 4: Nodes 9 and 2
    It takes 4 minutes for the whole tree to be infected so we return 4.

Example 2:
  Input: root = [1], start = 1
  Output: 0
  Explanation: At minute 0, the only node in the tree is infected so we return 0.

Constraints:
- The number of nodes in the tree is in the range [1, 105].
- 1 <= Node.val <= 105
- Each node has a unique value.
- A node with a value of start exists in the tree.

*/

var amountOfTime = function (root, start) {
  // Build a graph from the tree
  const graph = {}
  let queue = [root]

  while (queue.length) {
    const node = queue.shift()
    graph[node.val] || (graph[node.val] = [])

    if (node.left) {
      graph[node.left] || (graph[node.left.val] = [])
      graph[node.val].push(node.left.val)
      graph[node.left.val].push(node.val)
      queue.push(node.left)
    }
    if (node.right) {
      graph[node.right] || (graph[node.right.val] = [])
      graph[node.val].push(node.right.val)
      graph[node.right.val].push(node.val)
      queue.push(node.right)
    }
  }

  // Perform a BFS to determine the time
  let result = 0
  queue = [start]
  let nextQueue = []
  const infected = new Set([start])

  while (queue.length) {
    const node = queue.shift()

    for (let neighbor of graph[node]) {
      if (infected.has(neighbor)) continue
      infected.add(neighbor)
      nextQueue.push(neighbor)
    }

    if (queue.length == 0 && nextQueue.length > 0) {
      result++
      queue = nextQueue
      nextQueue = []
    }
  }

  return result
}
