/*

Given an array of strings wordsDict and two different strings that
already exist in the array word1 and word2, return the shortest distance
between these two words in the list.

Example 1:
  Input: wordsDict = ["practice", "makes", "perfect", "coding", "makes"],
    word1 = "coding", word2 = "practice"
  Output: 3

Example 2:
  Input: wordsDict = ["practice", "makes", "perfect", "coding", "makes"],
    word1 = "makes", word2 = "coding"
  Output: 1

Constraints:
- 2 <= wordsDict.length <= 3 * 104
- 1 <= wordsDict[i].length <= 10
- wordsDict[i] consists of lowercase English letters.
- word1 and word2 are in wordsDict.
- word1 != word2

*/

var shortestDistance = function (wordsDict, word1, word2) {
  if (word1 == word2) return 0

  const wordToIndex = new Map()
  for (let i = 0; i < wordsDict.length; i++) {
    const word = wordsDict[i]
    if (!wordToIndex.has(word)) wordToIndex.set(word, [])
    wordToIndex.get(word).push(i)
  }

  let result = Infinity
  for (let i of wordToIndex.get(word1))
    for (let j of wordToIndex.get(word2))
      result = Math.min(result, Math.abs(i - j))

  return result
}
