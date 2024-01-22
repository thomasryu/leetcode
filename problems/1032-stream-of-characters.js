/*

Design an algorithm that accepts a stream of characters
and checks if a suffix of these characters is a string of a given array of strings words.

For example, if words = ["abc", "xyz"] and the stream added the four characters (one by one) 'a', 'x', 'y', and 'z',
your algorithm should detect that the suffix "xyz" of the characters "axyz" matches "xyz" from words.

Implement the StreamChecker class:

- StreamChecker(String[] words) Initializes the object with the strings array words.
- boolean query(char letter) Accepts a new character from the stream and returns true
  if any non-empty suffix from the stream forms a word that is in words.

Example 1:
  Input
    ["StreamChecker", "query", "query", "query", "query", "query", "query", "query", "query", "query", "query", "query", "query"]
    [[["cd", "f", "kl"]], ["a"], ["b"], ["c"], ["d"], ["e"], ["f"], ["g"], ["h"], ["i"], ["j"], ["k"], ["l"]]
  Output
    [null, false, false, false, true, false, true, false, false, false, false, false, true]
  Explanation
    StreamChecker streamChecker = new StreamChecker(["cd", "f", "kl"]);
    streamChecker.query("a"); // return False
    streamChecker.query("b"); // return False
    streamChecker.query("c"); // return False
    streamChecker.query("d"); // return True, because 'cd' is in the wordlist
    streamChecker.query("e"); // return False
    streamChecker.query("f"); // return True, because 'f' is in the wordlist
    streamChecker.query("g"); // return False
    streamChecker.query("h"); // return False
    streamChecker.query("i"); // return False
    streamChecker.query("j"); // return False
    streamChecker.query("k"); // return False
    streamChecker.query("l"); // return True, because 'kl' is in the wordlist

Constraints:
- 1 <= words.length <= 2000
- 1 <= words[i].length <= 200
- words[i] consists of lowercase English letters.
- letter is a lowercase English letter.
- At most 4 * 104 calls will be made to query.

*/

var StreamChecker = function (words) {
  // The trick here is to create a reverse trie, because doing it in order we have
  // the problem where a letter can be at different stages of different words and
  // building a trie that refences itself causes performance issues
  this.trie = {}
  this.stream = [] // A reversed stream of typed letters

  for (let word of words) {
    let node = this.trie

    for (let i = word.length - 1; i >= 0; i--) {
      const letter = word[i]
      node[letter] || (node[letter] = {})
      node = node[letter]
      if (i == 0) node.word = true
    }
  }
}

StreamChecker.prototype.query = function (letter) {
  this.stream.unshift(letter)

  // We only check our trie if the current letter
  // is the last one of one of our words (performance optimization)
  if (!this.trie[letter]) return false

  let i = 1
  let node = this.trie[letter]

  while (node) {
    if (node.word) return true
    node = node[this.stream[i]]
    i++
  }

  return false
}
