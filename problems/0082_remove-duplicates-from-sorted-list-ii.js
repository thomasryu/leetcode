/*

Given the head of a sorted linked list, delete all nodes that have duplicate numbers,
leaving only distinct numbers from the original list. Return the linked list sorted as well.

Example 1:
  Input: head = [1,2,3,3,4,4,5]
  Output: [1,2,5]

Example 2:
  Input: head = [1,1,1,2,3]
  Output: [2,3]

Constraints:
- The number of nodes in the list is in the range [0, 300].
- -100 <= Node.val <= 100
- The list is guaranteed to be sorted in ascending order.

*/

var deleteDuplicates = function (head) {
  if (head == null || head.next == null) return head

  let result = head
  const map = new Map()

  // Find the duplicates in the list
  while (head) {
    map.set(head.val, (map.get(head.val) || 0) + 1)
    head = head.next
  }

  // Set the result pointer to the first non duplicate
  // element of the nodes list
  while (result != null && map.get(result.val) > 1) result = result.next
  if (result == null) return result

  let previous = result
  head = previous.next
  while (head) {
    // Skip duplicates
    if (map.get(head.val) == 1) {
      previous.next = head
      previous = head
    }
    // Don't forget to cut the ending
    // if the list ends in duplicates
    else if (head.next == null) {
      previous.next = null
    }
    head = head.next
  }

  return result
}
