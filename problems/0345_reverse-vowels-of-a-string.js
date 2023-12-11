/*

Given a string s, reverse only all the vowels in the string and return it.

The vowels are 'a', 'e', 'i', 'o', and 'u',
and they can appear in both lower and upper cases, more than once.

Example 1:
  Input: s = "hello"
  Output: "holle"

Example 2:
  Input: s = "leetcode"
  Output: "leotcede"

Constraints:
- 1 <= s.length <= 3 * 105
- s consist of printable ASCII characters.

*/

var reverseVowels = function (s) {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'])
  let start = 0
  let end = s.length

  const result = [...s]

  while (start < end) {
    const startIsVowel = vowels.has(s[start])
    const endIsVowel = vowels.has(s[end])

    if (startIsVowel && endIsVowel) {
      result[end] = s[start]
      result[start] = s[end]
      start++
      end--
    } else if (startIsVowel) end--
    else if (endIsVowel) start++
    else {
      start++
      end--
    }
  }

  return result.join('')
}
