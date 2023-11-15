/*

You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list.
The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

Example 1:
  Input: list1 = [1,2,4], list2 = [1,3,4]
  Output: [1,1,2,3,4,4]

Example 2:
  Input: list1 = [], list2 = []
  Output: []

Example 3:
  Input: list1 = [], list2 = [0]
  Output: [0]

Constraints:
- The number of nodes in both lists is in the range [0, 50].
- -100 <= Node.val <= 100
- Both list1 and list2 are sorted in non-decreasing order.

*/

var mergeTwoLists = function (list1, list2) {
  if (!list1 && !list2) return null

  let head = new ListNode()
  const result = head

  while (true) {
    if (
      (list1?.val != undefined ? list1.val : 101) <
      (list2?.val != undefined ? list2.val : 101)
    ) {
      head.val = list1?.val
      list1 = list1?.next || null
    } else {
      head.val = list2?.val
      list2 = list2?.next || null
    }

    if (list1 || list2) {
      head.next = new ListNode()
      head = head.next
    } else break
  }

  return result
}
