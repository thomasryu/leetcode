/*

Given a binary tree

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}

Populate each next pointer to point to its next right node.
If there is no next right node, the next pointer should be set to NULL.

Initially, all next pointers are set to NULL.

Example 1:
  Input: root = [1,2,3,4,5,null,7]
  Output: [1,#,2,3,#,4,5,7,#]
  Explanation: Given the above binary tree (Figure A),
               your function should populate each next pointer to point to its next right node, just like in Figure B.
               The serialized output is in level order as connected by the next pointers,
               with '#' signifying the end of each level.

Example 2:
  Input: root = []
  Output: []

Constraints:
- The number of nodes in the tree is in the range [0, 6000].
- -100 <= Node.val <= 100

Follow-up:
- You may only use constant extra space.
- The recursive approach is fine.
  You may assume implicit stack space does not count as extra space for this problem.

*/

// Inefficient solution
var connect = function (root) {
  const tree = []

  // Populate the tree array with its nodes, saving which tier/layer
  // of the tree they are in
  const populateTree = (node, tier) => {
    tree.push(node)
    if (node == null) return null

    node.tier = tier

    populateTree(node.left, tier + 1)
    populateTree(node.right, tier + 1)
  }

  populateTree(root, 0)

  // For each tier of the tree, filter all the nodes in the tier
  // and point each one to the one next to it
  let tier = 0
  let tierNodes = tree.filter((node) => node != null && node.tier == tier)
  while (tierNodes.length > 0) {
    let i = 0
    for (i; i < tierNodes.length - 1; i++) {
      tierNodes[i].next = tierNodes[i + 1]
    }
    tierNodes[i] == null

    tier++
    tierNodes = tree.filter((node) => node != null && node.tier == tier)
  }

  return root
}

// Efficient solution
var connect = function (root) {
  if (!root) return root

  // queue is filled with the current tier/layer's nodes
  let queue = [root]
  // tempQueue is filled with the next tier/layer's nodes
  let tempQueue = []

  while (queue.length) {
    let current = queue.shift()

    let { left, right } = current
    if (left) tempQueue.push(left)
    if (right) tempQueue.push(right)

    // If the queue is empty, we proceed to the next tier
    if (queue.length === 0) {
      current.next = null
      queue = tempQueue
      tempQueue = []
    }
    // Else, we assign the .next accordingly
    else {
      current.next = queue[0]
    }
  }

  return root
}
