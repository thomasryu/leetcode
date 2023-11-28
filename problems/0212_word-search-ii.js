// Very inefficient boardp[] trie solution
var findWords = function (board, words) {
  const m = board.length
  const n = board[0].length

  const graph = {}

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const visited = new Set()
      buildTrie(board, graph, i, j, visited, graph)
    }
  }

  return words.filter((word) => searchWord(word, graph))
}
var buildTrie = function (board, node, i, j, visited, graph) {
  // If out of bounds, return
  if (i < 0 || i >= board.length) return
  if (j < 0 || j >= board[0].length) return

  // If already visited, return
  // otherwise, mark as visited
  const key = `x:${i}y:${j}`
  if (visited.has(key)) return
  visited.add(key)

  const letter = board[i][j]
  node[letter] || (node[letter] = {})

  buildGraph(board, node[letter], i - 1, j, new Set(visited), graph) // North
  buildGraph(board, node[letter], i + 1, j, new Set(visited), graph) // South
  buildGraph(board, node[letter], i, j - 1, new Set(visited), graph) // West
  buildGraph(board, node[letter], i, j + 1, new Set(visited), graph) // East
}
var searchWord = function (word, graph) {
  let node = graph
  for (let letter of word) {
    if (!node) return false
    node = node[letter]
  }
  return node != null
}

// Efficient words[] trie solution
var findWords = function (board, words) {
  const result = []

  // Instead of building a graph from the board,
  // we build it from the words array
  const buildTrie = () => {
    const root = {}

    for (let word of words) {
      let node = root
      for (let letter of word) {
        node[letter] || (node[letter] = {})
        node = node[letter]
      }
      node.word = word
    }

    return root
  }

  // We iterate over the board,
  // searching for words in our trie
  const searchWord = (node, i, j) => {
    if (node.word) {
      result.push(node.word)
      node.word = null
    }

    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) return

    const letter = board[i][j]
    if (!node[letter]) return // Also filters visited tiles

    board[i][j] = '0' // Mark tile as visited
    searchWord(node[letter], i - 1, j) // North
    searchWord(node[letter], i + 1, j) // South
    searchWord(node[letter], i, j - 1) // West
    searchWord(node[letter], i, j + 1) // East

    board[i][j] = letter // After doing a DFS, we reset the tile
  }

  const root = buildTrie()
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      searchWord(root, i, j)
    }
  }

  return result
}
