/*

Given the head of a linked list and a value x,
partition it such that all nodes less than x come before nodes greater than or equal to x.

You should preserve the original relative order of the nodes in each of the two partitions.

Example 1:
  Input: head = [1,4,3,2,5,2], x = 3
  Output: [1,2,2,4,3,5]

Example 2:
  Input: head = [2,1], x = 2
  Output: [1,2]

Constraints:
- The number of nodes in the list is in the range [0, 200].
- -100 <= Node.val <= 100
- -200 <= x <= 200

*/

// Array solution
var partition = function (head, x) {
  if (head == null || head.next == null) return head

  const result = head
  const before = []
  const after = []

  while (head) {
    head.val < x ? before.push(head.val) : after.push(head.val)
    head = head.next
  }

  head = result
  for (value of [...before, ...after]) {
    head.val = value
    head = head.next
  }

  return result
}

// Node solution
var partition = function (head, x) {
  if (head == null || head.next == null) return head

  let initAfter = null
  let initBefore = null
  let before = null
  let after = null

  // Analogously to the array solution, we fill each separate linked list
  // with values lower, or greater and equal to x, and save their initial nodes
  while (head) {
    if (head.val < x) {
      if (before) {
        before.next = head
        before = before.next
      } else {
        before = head
        initBefore = before
      }
    } else {
      if (after) {
        after.next = head
        after = after.next
      } else {
        after = head
        initAfter = after
      }
    }

    head = head.next
  }

  // If necessary, we stitch both lists
  if (before) before.next = initAfter

  // If necessary, we cut the end of after to avoid a cyclic list
  if (after) after.next = null

  return initBefore ? initBefore : initAfter
}
