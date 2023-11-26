/*

A gene string can be represented by an 8-character long string,
with choices from 'A', 'C', 'G', and 'T'.

Suppose we need to investigate a mutation from a gene string startGene
to a gene string endGene where one mutation is defined as one single character changed in the gene string.

For example, "AACCGGTT" --> "AACCGGTA" is one mutation.
There is also a gene bank bank that records all the valid gene mutations.
A gene must be in bank to make it a valid gene string.

Given the two gene strings startGene and endGene and the gene bank bank,
return the minimum number of mutations needed to mutate from startGene to endGene.
If there is no such a mutation, return -1.

Note that the starting point is assumed to be valid, so it might not be included in the bank.

Example 1:
  Input: startGene = "AACCGGTT", endGene = "AACCGGTA", bank = ["AACCGGTA"]
  Output: 1

Example 2:
  Input: startGene = "AACCGGTT", endGene = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]
  Output: 2

Constraints:
- 0 <= bank.length <= 10
- startGene.length == endGene.length == bank[i].length == 8
- startGene, endGene, and bank[i] consist of only the characters ['A', 'C', 'G', 'T'].

*/

var minMutation = function (startGene, endGene, bank) {
  const queue = [[startGene, 0]] // 1. Gene 2. Number of mutations
  const visited = new Set()

  while (queue.length) {
    const [gene, mutations] = queue.shift()

    if (gene == endGene) return mutations

    for (let i = 0; i < 8; i++)
      for (let char of ['A', 'C', 'G', 'T']) {
        const mutation = gene.slice(0, i) + char + gene.slice(i + 1)

        if (!visited.has(mutation) && bank.includes(mutation)) {
          visited.add(mutation)
          queue.push([mutation, mutations + 1])
        }
      }
  }

  return -1
}
