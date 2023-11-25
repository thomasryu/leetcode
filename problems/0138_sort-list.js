/*

Given the head of a linked list,
return the list after sorting it in ascending order.

Example 1:
  Input: head = [4,2,1,3]
  Output: [1,2,3,4]

Example 2:
  Input: head = [-1,5,3,4,0]
  Output: [-1,0,3,4,5]

Example 3:
  Input: head = []
  Output: []

Constraints:
- The number of nodes in the list is in the range [0, 5 * 104].
- -105 <= Node.val <= 105

Follow up: Can you sort the linked list in O(n logn) time and O(1) memory (i.e. constant space)?

*/

// Unoptimized solution
var sortList = function (head) {
  if (!head || !head?.next) return head

  const nodes = []
  while (head) {
    nodes.push(head)
    head = head.next
  }

  nodes.sort((a, b) => a.val - b.val)
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1]
  }
  nodes[nodes.length - 1].next = null

  return nodes[0]
}
