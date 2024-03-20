/*

You are given two linked lists: list1 and list2 of sizes n and m respectively.

Remove list1's nodes from the ath node to the bth node,
and put list2 in their place.

The blue edges and nodes in the following figure indicate the result:

Build the result list and return its head.

Example 1:
  Input: list1 = [10,1,13,6,9,5], a = 3, b = 4, list2 = [1000000,1000001,1000002]
  Output: [10,1,13,1000000,1000001,1000002,5]
  Explanation: We remove the nodes 3 and 4 and put the entire list2 in their place.
    The blue edges and nodes in the above figure indicate the result.

Example 2:
  Input: list1 = [0,1,2,3,4,5,6], a = 2, b = 5, list2 = [1000000,1000001,1000002,1000003,1000004]
  Output: [0,1,1000000,1000001,1000002,1000003,1000004,6]
  Explanation: The blue edges and nodes in the above figure indicate the result.

Constraints:
- 3 <= list1.length <= 104
- 1 <= a <= b < list1.length - 1
- 1 <= list2.length <= 104

*/

var mergeInBetween = function (list1, a, b, list2) {
  const dummy = new ListNode(-1, list1)

  // 1. Run through list1 to find both start_1 and end_1
  let start_1 = dummy
  let curr_node = dummy.next

  let count = 0
  while (count != a) {
    start_1 = curr_node
    curr_node = curr_node.next
    count++
  }
  while (count != b) {
    curr_node = curr_node.next
    count++
  }
  const end_1 = curr_node.next

  // 2. Run through list2 to find its last node end_2
  const start_2 = list2
  while (list2.next != null) list2 = list2.next
  const end_2 = list2

  // 3. Connect start_1 to start_2 and end_2 to end_1
  start_1.next = start_2
  end_2.next = end_1

  return dummy.next
}
