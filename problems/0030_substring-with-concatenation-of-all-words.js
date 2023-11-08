/*

You are given a string s and an array of strings words.
All the strings of words are of the same length.

A concatenated substring in s is a substring that contains
all the strings of any permutation of words concatenated.

For example, if words = ["ab","cd","ef"], then "abcdef", "abefcd", "cdabef", "cdefab", "efabcd", and "efcdab"
are all concatenated strings. "acdbef" is not a concatenated substring because it is not the concatenation of any permutation of words.
Return the starting indices of all the concatenated substrings in s. You can return the answer in any order.

Example 1:
  Input: s = "barfoothefoobarman", words = ["foo","bar"]
  Output: [0,9]
  Explanation: Since words.length == 2 and words[i].length == 3, the concatenated substring has to be of length 6.
               The substring starting at 0 is "barfoo". It is the concatenation of ["bar","foo"] which is a permutation of words.
               The substring starting at 9 is "foobar". It is the concatenation of ["foo","bar"] which is a permutation of words.
               The output order does not matter. Returning [9,0] is fine too.

Example 2:
  Input: s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
  Output: []
  Explanation: Since words.length == 4 and words[i].length == 4, the concatenated substring has to be of length 16.
               There is no substring of length 16 in s that is equal to the concatenation of any permutation of words.
               We return an empty array.

Example 3:
  Input: s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
  Output: [6,9,12]
  Explanation: Since words.length == 3 and words[i].length == 3, the concatenated substring has to be of length 9.
               The substring starting at 6 is "foobarthe". It is the concatenation of ["foo","bar","the"] which is a permutation of words.
               The substring starting at 9 is "barthefoo". It is the concatenation of ["bar","the","foo"] which is a permutation of words.
               The substring starting at 12 is "thefoobar". It is the concatenation of ["the","foo","bar"] which is a permutation of words.

Constraints:
- 1 <= s.length <= 104
- 1 <= words.length <= 5000
- 1 <= words[i].length <= 30
- s and words[i] consist of lowercase English letters.

*/

// Simple, very inefficient solution with recursion
var findSubstring = function (s, words) {
  const result = []

  const wordLength = words[0].length
  const concatLength = wordLength * words.length

  const stringContainsAllWords = (s, words) => {
    if (words.length == 0) return true

    // 1. For each word in our word array
    for (let i = 0; i < words.length; i++) {
      // 2. We check if the substring starts with it
      if (s.substring(0, wordLength) == words[i]) {
        // 3. If it does, we splice it from the words array
        words.splice(i, 1)

        // 4. And call the function recursively with a spliced string as well
        return stringContainsAllWords(s.substring(wordLength), words)
      }
    }

    // If none of the words were found, return false
    return false
  }

  // Iterate over each possible substring that might contain the concatenation
  for (let i = 0; i <= s.length - concatLength; i++) {
    if (stringContainsAllWords(s.substring(i), [...words])) {
      result.push(i)
    }
  }

  return result
}

// Same outer logic but efficient check logic
var findSubstring = function (s, words) {
  const result = []

  const wordLength = words[0].length
  const concatLength = words.length * wordLength

  // Auxiliary function that checks if a string contains exactly all required words
  var stringContainsAllWords = function (
    currentSubstring,
    requiredWordsMap,
    wordLength,
  ) {
    // I. We create another map with all words found in the substring
    let foundWordsMap = new Map()
    for (let i = 0; i < currentSubstring.length; i += wordLength) {
      const word = currentSubstring.substring(i, i + wordLength)
      foundWordsMap.set(word, (foundWordsMap.get(word) || 0) + 1)
    }

    // II. And compare both to see if they exactly match
    for ([key, value] of foundWordsMap) {
      if (value != requiredWordsMap.get(key)) return false
    }

    return true
  }

  // 1. Create a map with all words that will need to be found in a substring of s
  const requiredWordsMap = new Map()
  for (word of words) {
    requiredWordsMap.set(word, (requiredWordsMap.get(word) || 0) + 1)
  }

  // 2. Iterate over each possible substring that might contain the concatenation
  for (let i = 0; i <= s.length - concatLength; i++) {
    const currentSubstring = s.substring(i, i + concatLength)

    // 3. If the substring contains all words from words[], we add its index
    if (
      stringContainsAllWords(currentSubstring, requiredWordsMap, wordLength)
    ) {
      result.push(i)
    }
  }

  return result
}
