/*

Given the head of a singly linked list and two integers left and right where left <= right,
reverse the nodes of the list from position left to position right, and return the reversed list.

Example 1:
  Input: head = [1,2,3,4,5], left = 2, right = 4
  Output: [1,4,3,2,5]

Example 2:
  Input: head = [5], left = 1, right = 1
  Output: [5]

Constraints:
- The number of nodes in the list is n.
- 1 <= n <= 500
- -500 <= Node.val <= 500
- 1 <= left <= right <= n

*/

var reverseBetween = function (head, left, right) {
  if (head == null || head.next == null) return head

  const nodes = []
  let result = head

  while (head != null) {
    nodes.push(head)
    head = head.next
  }

  for (let i = right - 1; i > left - 1; i--) {
    nodes[i].next = nodes[i - 1]
  }

  // 1. If there are remains to the right of the reversed section,
  //    connect them
  if (right < nodes.length) nodes[left - 1].next = nodes[right]
  // 2. If right is the last element of the list, the new end (left)
  //    will have to have a .next pointing to null to avoid a cyclic list
  else nodes[left - 1].next = null

  // 3. If there are remains to the left of the reversed section,
  //    connect them
  if (left > 1) nodes[left - 2].next = nodes[right - 1]
  // 4. If left starts at 1, the new head will be the right node
  else result = nodes[right - 1]

  return result
}
