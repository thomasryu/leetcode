/*

Given the head of a linked list, reverse the nodes of the list k at a time,
and return the modified list.

k is a positive integer and is less than or equal to the length of the linked list.
If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

Example 1:
  Input: head = [1,2,3,4,5], k = 2
  Output: [2,1,4,3,5]

Example 2:
  Input: head = [1,2,3,4,5], k = 3
  Output: [3,2,1,4,5]

Constraints:
- The number of nodes in the list is n.
- 1 <= k <= n <= 5000
- 0 <= Node.val <= 1000

Follow-up: Can you solve the problem in O(1) extra memory space?

*/

var reverseKGroup = function (head, k) {
  if (head == null || head.next == null) return head

  const nodes = []

  while (head != null) {
    nodes.push(head)
    head = head.next
  }

  if (k > nodes.length) return head

  // The logic is to reverse each k-nodes section from right to left,
  // which makes it easier to connect the reverse section to the remaining of the nodes,
  // knowing there won't be further alterations on the right side
  let right = nodes.length - (nodes.length % k) - 1
  let left = right - (k - 1)

  while (left >= 0) {
    // Reverse the nodes in the section
    // (we set the previous node's next as null to break cyclic connection)
    for (let i = right; i > left; i--) {
      nodes[i - 1].next = null
      nodes[i].next = nodes[i - 1]
    }

    // Connects the reversed section to the loose end to the right,
    if (right + 1 < nodes.length) {
      nodes[left].next = nodes[right + 1]
    }

    // Updates the nodes array to allow the next (i.e. previous)
    // section to be able to connect to the current one
    nodes[left] = nodes[right]

    left -= k
    right -= k
  }

  return nodes[right + k]
}
