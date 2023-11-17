/*

Given the head of a linked list,
remove the nth node from the end of the list and return its head.

Example 1:
  Input: head = [1,2,3,4,5], n = 2
  Output: [1,2,3,5]

Example 2:
  Input: head = [1], n = 1
  Output: []

Example 3:
  Input: head = [1,2], n = 1
  Output: [1]

Constraints:
- The number of nodes in the list is sz.
- 1 <= sz <= 30
- 0 <= Node.val <= 100
- 1 <= n <= sz

Follow up: Could you do this in one pass?

*/

var removeNthFromEnd = function (head, n) {
  if (head == null || head.next == null) return null

  const nodes = []
  let result = head

  while (head != null) {
    nodes.push(head)
    head = head.next
  }

  if (n == nodes.length) result = result.next
  else nodes[nodes.length - n - 1].next = nodes[nodes.length - n].next
  return result
}
