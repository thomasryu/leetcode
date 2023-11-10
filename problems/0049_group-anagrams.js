/*

Given an array of strings strs, group the anagrams together.
You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
typically using all the original letters exactly once.

Example 1:
  Input: strs = ["eat","tea","tan","ate","nat","bat"]
  Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Example 2:
  Input: strs = [""]
  Output: [[""]]

Example 3:
  Input: strs = ["a"]
  Output: [["a"]]

Constraints:
- 1 <= strs.length <= 104
- 0 <= strs[i].length <= 100
- strs[i] consists of lowercase English letters.

*/

// Direct version
var groupAnagrams = function (strs) {
  const result = []
  const dictionary = []

  for (s of strs) {
    // We create an alphabetically sorted version
    // of the string to compare against a dictionary
    // of words already in the result
    const sorted = s.split('').sort().join('')
    const index = dictionary.indexOf(sorted)

    // If the words is already in the dictionary
    // we just add it to the result
    if (index >= 0) {
      result[index].push(s)
    }

    // If it isn't we add a new word to the dictionary
    // and a new array to the result
    else {
      dictionary.push(sorted)
      result.push([s])
    }
  }

  return result
}

// Optimized version with map
var groupAnagrams = function (strs) {
  // A map where the key is the dictionary,
  // and value is the result array
  const result = new Map()

  for (s of strs) {
    // We create an alphabetically sorted version
    // of the string to compare against a dictionary
    // of words already in the result
    const sorted = s.split('').sort().join('')

    // If the words is already in the dictionary
    // we just add it to the result
    if (result.has(sorted)) {
      result.get(sorted).push(s) // Remember that you can do this
    }

    // If it isn't we add a new word to the dictionary
    // and a new array to the result
    else {
      result.set(sorted, [s])
    }
  }

  // Very elegant return
  return [...result.values()]
}
