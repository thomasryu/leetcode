/*

Given the head of a linked list, we repeatedly delete consecutive
sequences of nodes that sum to 0 until there are no such sequences.

After doing so, return the head of the final linked list.
You may return any such answer.

(Note that in the examples below, all sequences are serializations of ListNode objects.)

Example 1:
  Input: head = [1,2,-3,3,1]
  Output: [3,1]
  Note: The answer [1,2,1] would also be accepted.

Example 2:
  Input: head = [1,2,3,-3,4]
  Output: [1,2,4]

Example 3:
  Input: head = [1,2,3,-3,-2]
  Output: [1]

Constraints:
- The given linked list will contain between 1 and 1000 nodes.
- Each node in the linked list has -1000 <= node.val <= 1000.

*/

// O(Nˆ2) solution
var removeZeroSumSublists = function (head) {
  const root = new ListNode(0, head)
  let left = root

  while (left != null) {
    let sum = 0
    let right = left.next

    while (right != null) {
      sum += right.val

      // By not breaking the loop here, we can find consecutive
      // subsequences that add up to zero (e.g. [-1, 1, -3, 3]),
      // since the sum will be at 0 anyway
      if (sum == 0) left.next = right.next
      right = right.next
    }

    left = left.next
  }

  return root.next
}

// O(N) prefix + map solution (which is slower than the O(Nˆ2) solution)
var removeZeroSumSublists = function (head) {
  const dummy = new ListNode(0, head)

  const prefixToNode = new Map()
  let prefix = 0

  let currNode = dummy
  while (currNode != null) {
    prefix += currNode.val

    // If the prefix was already in the map, it means there is a sum 0 in the list
    if (prefixToNode.has(prefix)) {
      const prevNode = prefixToNode.get(prefix)

      // 1. Remove all the nodes-to-be-deleted from the map
      let tempPrefix = prefix
      let tempNode = prevNode.next

      while (tempNode !== currNode) {
        // Remember, tempPrefix starts with the same value as prefix at prevNode
        tempPrefix += tempNode.val
        prefixToNode.delete(tempPrefix)
        tempNode = tempNode.next
      }

      // 2. Remove the nodes from the list
      prevNode.next = currNode.next
    } else prefixToNode.set(prefix, currNode)
    currNode = currNode.next
  }

  return dummy.next
}
