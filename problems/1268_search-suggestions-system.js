/*

You are given an array of strings products and a string searchWord.

Design a system that suggests at most three product names
rom products after each character of searchWord is typed.
Suggested products should have common prefix with searchWord.
If there are more than three products with a common prefix return
the three lexicographically minimums products.

Return a list of lists of the suggested products after each character of searchWord is typed.

Example 1:
  Input: products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"
  Output: [["mobile","moneypot","monitor"],["mobile","moneypot","monitor"],
           ["mouse","mousepad"],["mouse","mousepad"],["mouse","mousepad"]]
  Explanation: products sorted lexicographically = ["mobile","moneypot","monitor","mouse","mousepad"].
               After typing m and mo all products match and we show user ["mobile","moneypot","monitor"].
               After typing mou, mous and mouse the system suggests ["mouse","mousepad"].

Example 2:
  Input: products = ["havana"], searchWord = "havana"
  Output: [["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]
  Explanation: The only word "havana" will be always suggested while typing the search word.

Constraints:
- 1 <= products.length <= 1000
- 1 <= products[i].length <= 3000
- 1 <= sum(products[i].length) <= 2 * 104
- All the strings of products are unique.
- products[i] consists of lowercase English letters.
0 1 <= searchWord.length <= 1000
- searchWord consists of lowercase English letters.

*/

var suggestedProducts = function (products, searchWord) {
  const trie = {}

  // Generate Trie
  products.sort()
  for (product of products) {
    let node = trie
    for (c of product) {
      node[c] || (node[c] = {})
      node = node[c]
    }
    node.word = product
  }

  // Use DFS to find closest words
  const suggest = (trie) => {
    const suggestions = []

    const dfs = (node) => {
      if (!node || suggestions.length >= 3) return
      if (node?.word) suggestions.push(node.word)
      for (c in node) if (c != 'word') dfs(node[c])
    }

    dfs(trie)
    return suggestions
  }

  // Fill the suggestions
  let results = []
  let node = trie
  for (let c of searchWord) {
    let suggestions = []
    if (c in node) {
      node = node[c]
      suggestions = suggest(node)
    } else node = {}

    results.push(suggestions)
  }

  return results
}
