/*

Two strings are considered close if you can attain
one from the other using the following operations:

- Operation 1: Swap any two existing characters.
  - For example, abcde -> aecdb

- Operation 2: Transform every occurrence of one existing character
               into another existing character, and do the same with the other character.
  - For example, aacabb -> bbcbaa (all a's turn into b's, and all b's turn into a's)

You can use the operations on either string as many times as necessary.

Given two strings, word1 and word2,
return true if word1 and word2 are close, and false otherwise.

Example 1:
  Input: word1 = "abc", word2 = "bca"
  Output: true
  Explanation: You can attain word2 from word1 in 2 operations.
               Apply Operation 1: "abc" -> "acb"
               Apply Operation 1: "acb" -> "bca"

Example 2:
  Input: word1 = "a", word2 = "aa"
  Output: false
  Explanation: It is impossible to attain word2 from word1,
               or vice versa, in any number of operations.

Example 3:
  Input: word1 = "cabbba", word2 = "abbccc"
  Output: true
  Explanation: You can attain word2 from word1 in 3 operations.
               Apply Operation 1: "cabbba" -> "caabbb"
               Apply Operation 2: "caabbb" -> "baaccc"
               Apply Operation 2: "baaccc" -> "abbccc"

Constraints:
- 1 <= word1.length, word2.length <= 105
- word1 and word2 contain only lowercase English letters.

*/

var closeStrings = function (word1, word2) {
  // There are three conditions for two strings to be close:
  // 1. They need to be the same size
  // 2. They need to have the same dictionary of letters
  // 3. For different letters, they must have the same pattern of sizes
  //    (e.g. "aabbcccddd" and "ccbbdddaaa" do have, "aabb" and "abbb" do not)

  // Checking condition 1
  if (word1.length != word2.length) return false

  const letterMap1 = new Map()
  const letterMap2 = new Map()

  for (let i = 0; i < word1.length; i++) {
    letterMap1.set(word1[i], (letterMap1.get(word1[i]) || 0) + 1)
    letterMap2.set(word2[i], (letterMap2.get(word2[i]) || 0) + 1)
  }

  // Checking condition 2
  if (
    letterMap1.size != letterMap2.size ||
    ![...letterMap1.keys()].every((key) => letterMap2.has(key))
  )
    return false

  // Checking condition 3
  if (
    [...letterMap1.values()].sort((a, b) => a - b).join(',') !=
    [...letterMap2.values()].sort((a, b) => a - b).join(',')
  )
    return false

  return true
}
