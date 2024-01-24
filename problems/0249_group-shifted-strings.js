/*

We can shift a string by shifting each of its letters to its successive letter.

- For example, "abc" can be shifted to be "bcd".

We can keep shifting the string to form a sequence.

- For example, we can keep shifting "abc" to form the sequence: "abc" -> "bcd" -> ... -> "xyz".

Given an array of strings strings, group all strings[i] that belong to the same shifting sequence.
You may return the answer in any order.

Example 1:
  Input: strings = ["abc","bcd","acef","xyz","az","ba","a","z"]
  Output: [["acef"],["a","z"],["abc","bcd","xyz"],["az","ba"]]

Example 2:
  Input: strings = ["a"]
  Output: [["a"]]

Constraints:
- 1 <= strings.length <= 200
- 1 <= strings[i].length <= 50
- strings[i] consists of lowercase English letters.

*/

const map = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
}

const checkShift = (a, b) => {
  if (a.length != b.length) return false
  if (a.length == 1) return true

  for (let i = 1; i < a.length; i++) {
    const jump_a = (map[a[i]] - map[a[i - 1]] + 26) % 26
    const jump_b = (map[b[i]] - map[b[i - 1]] + 26) % 26
    if (jump_a != jump_b) return false
  }

  return true
}

var groupStrings = function (strings) {
  const in_a_group = new Set()
  const answer = []

  for (let i = 0; i < strings.length; i++) {
    if (in_a_group.has(i)) continue

    const a = strings[i]
    const group = [a]
    in_a_group.add(i)

    for (j = i + 1; j < strings.length; j++) {
      if (in_a_group.has(j)) continue

      const b = strings[j]
      if (checkShift(a, b)) {
        group.push(b)
        in_a_group.add(j)
      }
    }
    answer.push(group)
  }

  return answer
}
