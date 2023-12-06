// Trie solution (time limit exceeded)
var wordBreak = function (s, wordDict) {
  // We build a trie with the words in wordDict
  const trie = {}

  for (let word of wordDict) {
    let node = trie
    for (let char of word) {
      node[char] || (node[char] = {})
      node = node[char]
    }
    node.word = word
  }

  const search = (i, node) => {
    if (!node) return false
    if (i == s.length) return !!node.word

    // We continue searching for a word
    // (or even a longer word if one was already found)
    const a = search(i + 1, node[s[i]])

    // Or, if a word was found, we begin searching for
    // a new word from the trie's root
    const b = !!node.word && search(i, trie)

    return a || b
  }

  return search(0, trie)
}

// Efficient DP solution
var wordBreak = function (s, wordDict) {
  // dp[x] tells me if its possible to reach
  // s[x] using the dictionary
  const dp = {}
  dp[0] = true

  for (let i = 0; i < s.length; i++) {
    if (!dp[i]) continue

    wordDict.forEach((word) => {
      if (s.slice(i, i + word.length) == word) dp[i + word.length] = true
    })
  }

  return !!dp[s.length]
}
