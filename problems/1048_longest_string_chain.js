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
      if (words[i].length - words[j].length == 1 && isPredecessor(words[j], words[i]))
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

// Revisit at 09/02/2024
var longestStrChain = function (words) {
  const is_predecessor = (pred, succ) => {
    if (succ.length != pred.length + 1) return false

    let i = 0
    let j = 0
    let diffs = 0

    while (i < pred.length && j < succ.length) {
      if (pred[i] != succ[j]) {
        // There is more than one difference
        if (diffs == 1) return false
        // We tolerate one difference
        else {
          diffs++
          j++
        }
      } else {
        i++
        j++
      }
    }

    return true
  }

  const n = words.length
  const dp = Array(n) // dp[i] is the length of the LSC, starting from words[i]

  words.sort((a, b) => a.length - b.length || a - b)

  const test_chain = (pred, start) => {
    if (dp[start]) return dp[start]

    let result = 1
    for (let i = start; i < n; i++) {
      const succ = words[i]
      if (pred.length == succ.length || succ.length > pred.length + 1) continue
      if (is_predecessor(pred, succ)) result = Math.max(result, test_chain(succ, i + 1) + 1)
    }

    dp[start] = result
    return result
  }

  let result = 1
  for (let i = 0; i < n; i++) result = Math.max(result, test_chain(words[i], i + 1))

  return result
}
