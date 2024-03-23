/*

Given the head of a singly linked list,
return true if it is a palindrome or false otherwise.

Example 1:
  Input: head = [1,2,2,1]
  Output: true

Example 2:
  Input: head = [1,2]
  Output: false

Constraints:
- The number of nodes in the list is in the range [1, 105].
- 0 <= Node.val <= 9

Follow up: Could you do it in O(n) time and O(1) space?

*/

var isPalindrome = function (head) {
  if (head.next == null) return true

  let prev = head
  let curr = head.next
  prev.prev = null

  let length = 2

  while (curr.next) {
    curr.prev = prev
    prev = curr
    curr = curr.next
    length++
  }

  for (let i = 1; i < Math.floor(length / 2); i++) prev = prev.prev

  if (length % 2 == 0) curr = prev.next
  else curr = prev

  while (prev != null && curr != null) {
    if (prev.val != curr.val) return false
    prev = prev.prev
    curr = curr.next
  }

  return true
}
