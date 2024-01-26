/*

Two players play a turn based game on a binary tree.
We are given the root of this binary tree, and the number of nodes n in the tree.
n is odd, and each node has a distinct value from 1 to n.

Initially, the first player names a value x with 1 <= x <= n,
and the second player names a value y with 1 <= y <= n and y != x.
The first player colors the node with value x red, and the second player colors the node with value y blue.

Then, the players take turns starting with the first player.
In each turn, that player chooses a node of their color (red if player 1, blue if player 2) and colors an uncolored neighbor of
the chosen node (either the left child, right child, or parent of the chosen node.)

If (and only if) a player cannot choose such a node in this way, they must pass their turn.
If both players pass their turn, the game ends, and the winner is the player that colored more nodes.

You are the second player. If it is possible to choose such a y to ensure you win the game, return true.
If it is not possible, return false.

Example 1:
  Input: root = [1,2,3,4,5,6,7,8,9,10,11], n = 11, x = 3
  Output: true
  Explanation: The second player can choose the node with value 2.

Example 2:
  Input: root = [1,2,3], n = 3, x = 1
  Output: false

Constraints:
- The number of nodes in the tree is n.
- 1 <= x <= n <= 100
- n is odd.
- 1 <= Node.val <= n
- All the values of the tree are unique.

*/

var btreeGameWinningMove = function (root, n, x) {
  const graph = {}

  // Build the graph from the tree
  let queue = [root]
  while (queue.length) {
    const node = queue.shift()
    graph[node.val] || (graph[node.val] = [])

    if (node.left) {
      graph[node.left.val] || (graph[node.left.val] = [])
      graph[node.left.val].push(node.val)
      graph[node.val].push(node.left.val)

      queue.push(node.left)
    }
    if (node.right) {
      graph[node.right.val] || (graph[node.right.val] = [])
      graph[node.right.val].push(node.val)
      graph[node.val].push(node.right.val)

      queue.push(node.right)
    }
  }

  const contenders = graph[x]
  graph[x] = []
  const visited = new Set([x])

  // Case where there is only one node adjacent path connecting to x,
  // the path needs to be longer than 1 to win
  let branch_sizes = [0]

  for (let path of contenders) {
    let current_size = 1
    let queue = [path]
    visited.add(path)

    while (queue.length) {
      const node = queue.shift()
      for (let neighbor of graph[node]) {
        if (visited.has(neighbor)) continue

        visited.add(neighbor)
        queue.push(neighbor)
        current_size++
      }
    }

    branch_sizes.push(current_size)
  }

  // Our chosen branch's size needs to be bigger tahn the other two combined
  branch_sizes.sort((a, b) => b - a)
  return branch_sizes[0] > n - branch_sizes[0]
}
