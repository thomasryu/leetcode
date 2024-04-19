/*

You are given the head of a linked list with n nodes.

For each node in the list, find the value of the next greater node.
That is, for each node, find the value of the first node that is next to it and has a strictly larger value than it.

Return an integer array answer where answer[i] is the value of the next greater node of the ith node (1-indexed).
If the ith node does not have a next greater node, set answer[i] = 0.

Example 1:
  Input: head = [2,1,5]
  Output: [5,5,0]

Example 2:
  Input: head = [2,7,4,3,5]
  Output: [7,0,5,5,0]

Constraints:
- The number of nodes in the list is n.
- 1 <= n <= 104
- 1 <= Node.val <= 109

*/

var nextLargerNodes = function (head) {
  let curr_last = null

  let node = head
  while (node != null) {
    // If stack empty or element is smaller than stack top, add to stack
    if (curr_last == null || curr_last.val >= node.val) {
      node.prev = curr_last
      curr_last = node
    }

    // Else, pop every top element whose value is smaller from monotonic stack,
    // and replace its value with greater value, and lastly push current element
    else {
      while (curr_last && node.val > curr_last.val) {
        curr_last.val = node.val
        curr_last = curr_last.prev
      }
      node.prev = curr_last
      curr_last = node
    }

    node = node.next
  }

  // If There are still elements in the stack replace them with 0's
  while (curr_last) {
    curr_last.val = 0
    curr_last = curr_last.prev
  }

  let result = []
  while (head) {
    result.push(head.val)
    head = head.next
  }

  return result
}
