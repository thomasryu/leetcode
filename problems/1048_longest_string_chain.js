// (Very) unoptimized graph + DFS solution
var longestStrChain = function (words) {
  let result = 0
  words.sort((a, b) => a.length - b.length || a[0] - b[0])

  // A graph where graph[i] gives me the indexes of all words
  // which words[i] is a predecessor of
  const graph = {}

  // Build the predecessor graph
  for (let i = 0; i < words.length - 1; i++) {
    for (let j = i + 1; j < words.length; j++) {
      if (isPredecessor(words[i], words[j])) {
        graph[words[i]] || (graph[words[i]] = [])
        graph[words[i]].push(words[j])
      }
    }
  }
  // Perform a BFS on our graph to determine max depth
  const visited = new Set()

  const dfs = (word, depth) => {
    if (!graph[word] || visited.has(word)) result = Math.max(result, depth)
    visited.add(word)
    for (succ of graph[word] || []) dfs(succ, depth + 1)
  }

  for (let word of words) dfs(word, 1)
  return result
}

// Optimized DP solution
var longestStrChain = function (words) {
  // dp[i] gives me the longest string chain
  // from words.slice(0, i + 1)
  const dp = Array(words.length).fill(1)
  words.sort((a, b) => a.length - b.length || a[0] - b[0])

  for (let i = 0; i < words.length; i++) {
    for (let j = i - 1; j >= 0 && words[i].length - words[j].length < 2; j--) {
      if (
        words[i].length - words[j].length == 1 &&
        isPredecessor(words[j], words[i])
      )
        dp[i] = Math.max(dp[i], dp[j] + 1)
    }
  }

  return Math.max(...dp)
}
// Auxiliary function that test whether pred is a predecessor to succ
const isPredecessor = (pred, succ) => {
  let diff = 0
  for (let i = 0; i < pred.length; i++) {
    if (diff > 1) return false
    if (pred[i] != succ[i + diff]) {
      diff++
      i--
    }
  }

  return true
}
