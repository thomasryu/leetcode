// Auxiliary array solution
var flatten = function (root) {
  if (root == null) return root

  const nodes = []
  const traverseTree = (node) => {
    if (!node) return node
    nodes.push(node)
    traverseTree(node.left)
    traverseTree(node.right)
  }

  traverseTree(root)

  let i = 0
  for (i; i < nodes.length - 1; i++) {
    nodes[i].left = null
    nodes[i].right = nodes[i + 1]
  }
  nodes[i].left = null
  nodes[i].right = null

  return root
}

// Linear extra space solution
var flatten = function (root) {
  if (root == null) return root

  // We save the previous node in a variable
  let previous = null
  const traverseTree = (node) => {
    if (!node) return node

    // Since we transform the tree's right nodes to form a linked list,
    // we need to preserve them in a variable
    const rightNode = node.right

    if (previous) {
      previous.right = node
      previous.left = null
    }
    previous = node

    traverseTree(node.left)
    traverseTree(rightNode)
  }

  traverseTree(root)
  previous.left = previous.right = null

  return root
}
