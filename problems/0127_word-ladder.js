/*

A transformation sequence from word beginWord to word endWord
using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:
- Every adjacent pair of words differs by a single letter.
- Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
- sk == endWord

Given two words, beginWord and endWord, and a dictionary wordList,
return the number of words in the shortest transformation sequence from beginWord to endWord,
or 0 if no such sequence exists.

Example 1:
  Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
  Output: 5
  Explanation: One shortest transformation sequence
               is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.

Example 2:
  Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
  Output: 0
  Explanation: The endWord "cog" is not in wordList,
               therefore there is no valid transformation sequence.

Constraints:
- 1 <= beginWord.length <= 10
- endWord.length == beginWord.length
- 1 <= wordList.length <= 5000
- wordList[i].length == beginWord.length
- beginWord, endWord, and wordList[i] consist of lowercase English letters.
- beginWord != endWord
- All the words in wordList are unique.

*/

// Unoptimized solution
var ladderLength = function (beginWord, endWord, wordList) {
  const queue = [[beginWord, 1]] // 1. Current word 2. Number of transformations
  const visited = new Set()

  // Checks if the difference between two strings is a single character
  const validTransformation = (a, b) => {
    if (a.length != b.length) return false
    let difference = 0
    for (let i = 0; i < a.length; i++) if (a[i] != b[i]) difference++
    return difference == 1
  }

  while (queue.length) {
    const [current, transformations] = queue.shift()

    if (current == endWord) return transformations

    // Add words that are in the list, have one-character difference,
    // and have not been visited yet
    for (word of wordList) {
      if (validTransformation(current, word) && !visited.has(word)) {
        visited.add(word)
        queue.push([word, transformations + 1])
      }
    }
  }

  return 0
}

// Optimized solution
var ladderLength = function (beginWord, endWord, wordList) {
  const queue = [[beginWord, 1]] // 1. Current word 2. Number of transformations
  const valid = new Set(wordList)

  while (queue.length) {
    const [current, transformations] = queue.shift()

    if (current == endWord) return transformations

    // For every position, we replace it with every character in the alphabet
    // if the resulting word is in the word list, we add it to the queue
    for (let i = 0; i < current.length; i++) {
      for (let j = 0; j < 26; j++) {
        const word =
          current.slice(0, i) +
          String.fromCharCode(j + 97) +
          current.slice(i + 1)

        if (valid.has(word)) {
          valid.delete(word)
          queue.push([word, transformations + 1])
        }
      }
    }
  }

  return 0
}

// LESSON: Includes is a heavy operation
