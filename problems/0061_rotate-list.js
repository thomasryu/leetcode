/*

Given the head of a linked list, rotate the list to the right by k places.

Example 1:
  Input: head = [1,2,3,4,5], k = 2
  Output: [4,5,1,2,3]

Example 2:
  Input: head = [0,1,2], k = 4
  Output: [2,0,1]

Constraints:
- The number of nodes in the list is in the range [0, 500].
- -100 <= Node.val <= 100
- 0 <= k <= 2 * 109

*/

var rotateRight = function (head, k) {
  if (head == null || head.next == null) return head

  const nodes = []
  while (head) {
    nodes.push(head)
    head = head.next
  }

  // Rotate the nodes array
  k = k % nodes.length
  while (k > 0) {
    nodes.unshift(nodes.pop())
    k--
  }

  // Adjust the .next of each node
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1]
  nodes[nodes.length - 1].next = null

  return nodes[0]
}
