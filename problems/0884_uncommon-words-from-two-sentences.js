/*

A sentence is a string of single-space separated words where
each word consists only of lowercase letters.

A word is uncommon if it appears exactly once in one of the sentences,
and does not appear in the other sentence.

Given two sentences s1 and s2, return a list of all the uncommon words.
You may return the answer in any order.

Example 1:
  Input: s1 = "this apple is sweet", s2 = "this apple is sour"
  Output: ["sweet","sour"]

Example 2:
  Input: s1 = "apple apple", s2 = "banana"
  Output: ["banana"]

Constraints:
- 1 <= s1.length, s2.length <= 200
- s1 and s2 consist of lowercase English letters and spaces.
- s1 and s2 do not have leading or trailing spaces.
- All the words in s1 and s2 are separated by a single space.

*/

var uncommonFromSentences = function (s1, s2) {
  const map = new Map()
  const result = []

  for (let word of (s1 + ' ' + s2).split(' '))
    map.set(word, (map.get(word) || 0) + 1)

  for (let [word, count] of map.entries()) if (count == 1) result.push(word)

  return result
}
