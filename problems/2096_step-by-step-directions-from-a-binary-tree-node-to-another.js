/*

You are given the root of a binary tree with n nodes.
Each node is uniquely assigned a value from 1 to n.
You are also given an integer startValue representing the value of the start node s,
and a different integer destValue representing the value of the destination node t.

Find the shortest path starting from node s and ending at node t.
Generate step-by-step directions of such path as a string consisting of only
the uppercase letters 'L', 'R', and 'U'. Each letter indicates a specific direction:

- 'L' means to go from a node to its left child node.
- 'R' means to go from a node to its right child node.
- 'U' means to go from a node to its parent node.

Return the step-by-step directions of the shortest path from node s to node t.

Example 1:
  Input: root = [5,1,2,3,null,6,4], startValue = 3, destValue = 6
  Output: "UURL"
  Explanation: The shortest path is: 3 → 1 → 5 → 2 → 6.

Example 2:
  Input: root = [2,1], startValue = 2, destValue = 1
  Output: "L"

Explanation: The shortest path is: 2 → 1.

Constraints:
- The number of nodes in the tree is n.
- 2 <= n <= 105
- 1 <= Node.val <= n
- All the values in the tree are unique.
- 1 <= startValue, destValue <= n
- startValue != destValue

*/

var getDirections = function (root, startValue, destValue) {
  const graph = {}

  // 1. Build the graph with bidirectional connections between tree nodes
  //    and also instructions from how to go from one to another in the tree
  let queue = [root]
  while (queue.length) {
    const node = queue.shift()

    const parent_val = node.val
    graph[parent_val] || (graph[parent_val] = [])

    if (node.left) {
      const child_val = node.left.val
      graph[child_val] || (graph[child_val] = [])
      graph[parent_val].push([child_val, 'L'])
      graph[child_val].push([parent_val, 'U'])

      queue.push(node.left)
    }
    if (node.right) {
      const child_val = node.right.val
      graph[child_val] || (graph[child_val] = [])
      graph[parent_val].push([child_val, 'R'])
      graph[child_val].push([parent_val, 'U'])

      queue.push(node.right)
    }
  }

  // 2. Run a BFS starting from startValue to find destValue
  queue = [[startValue, '']]
  const visited = new Set([startValue])
  while (queue.length) {
    const [curr_val, curr_steps] = queue.shift()
    if (curr_val == destValue) return curr_steps

    for (let neighbor of graph[curr_val]) {
      const [next_val, next_step] = neighbor

      if (visited.has(next_val)) continue
      visited.add(next_val)

      queue.push([next_val, curr_steps + next_step])
    }
  }

  return ''
}
