/*

You are given the head of a non-empty linked list representing
a non-negative integer without leading zeroes.

Return the head of the linked list after doubling it.

Example 1:
  Input: head = [1,8,9]
  Output: [3,7,8]
  Explanation: The figure above corresponds to the given linked list which represents the number 189.
    Hence, the returned linked list represents the number 189 * 2 = 378.

Example 2:
  Input: head = [9,9,9]
  Output: [1,9,9,8]
  Explanation: The figure above corresponds to the given linked list which represents the number 999.
    Hence, the returned linked list reprersents the number 999 * 2 = 1998.

Constraints:
- The number of nodes in the list is in the range [1, 104]
- 0 <= Node.val <= 9
- The input is generated such that the list represents a number that does not have leading zeros,
  except the number 0 itself.

*/

var doubleIt = function (head) {
  head.prev = null
  while (head.next) {
    head.next.prev = head
    head = head.next
  }

  let overflow = 0
  while (head) {
    const double = head.val * 2
    const remaining = double % 10

    head.val = remaining + overflow
    overflow = double >= 10 ? 1 : 0

    if (!head.prev) {
      if (overflow) {
        const node = new ListNode(1, head)
        head = node
      }
      break
    }

    head = head.prev
  }

  return head
}
