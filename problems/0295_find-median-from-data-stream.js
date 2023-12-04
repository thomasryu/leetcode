/*

The median is the middle value in an ordered integer list.
If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

For example, for arr = [2,3,4], the median is 3.
For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
Implement the MedianFinder class:

MedianFinder() initializes the MedianFinder object.
void addNum(int num) adds the integer num from the data stream to the data structure.
double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.

Example 1:
  Input
    ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
    [[], [1], [2], [], [3], []]
  Output
    [null, null, null, 1.5, null, 2.0]
  Explanation
    MedianFinder medianFinder = new MedianFinder();
    medianFinder.addNum(1);    // arr = [1]
    medianFinder.addNum(2);    // arr = [1, 2]
    medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
    medianFinder.addNum(3);    // arr[1, 2, 3]
    medianFinder.findMedian(); // return 2.0

Constraints:
- -105 <= num <= 105
- There will be at least one element in the data structure before calling findMedian.
- At most 5 * 104 calls will be made to addNum and findMedian.

Follow up:
- If all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
- If 99% of all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?

*/

// Standard solution
var MedianFinder = function () {
  // At any given point:
  // 1. The size of both heaps will be as even as possible
  // 2. The max of leftHeap with be smaller or equal to the min of rightHeap

  this.leftHeap = new MaxPriorityQueue({ priority: (num) => num })
  this.rightHeap = new MinPriorityQueue({ priority: (num) => num })
}

MedianFinder.prototype.addNum = function (num) {
  const left = this.leftHeap.front()?.element

  if (!left || num <= left) {
    this.leftHeap.enqueue(num)
    if (this.leftHeap.size() - 1 > this.rightHeap.size())
      this.rightHeap.enqueue(this.leftHeap.dequeue().element)
  } else {
    this.rightHeap.enqueue(num)
    if (this.rightHeap.size() > this.leftHeap.size())
      this.leftHeap.enqueue(this.rightHeap.dequeue().element)
  }
}

MedianFinder.prototype.findMedian = function () {
  const m = this.leftHeap.size()
  const n = this.rightHeap.size()

  // console.log('left', this.leftHeap.toArray().map(a => a.priority))
  // console.log('right', this.rightHeap.toArray().map(a => a.priority))

  if ((m + n) % 2 == 1) {
    if (m > n) return this.leftHeap.front().element
    else return this.rightHeap.front().element
  }

  return (this.leftHeap.front().element + this.rightHeap.front().element) / 2
}

// Refined solution
var MedianFinder = function () {
  this.leftHeap = new MaxPriorityQueue()
  this.rightHeap = new MinPriorityQueue()
}

MedianFinder.prototype.addNum = function (num) {
  // We quickly maintain both heaps properly sorted by enqueueing
  // num to the rightHeap and dequeueing rightHeap to leftHeap
  this.rightHeap.enqueue(num)
  this.leftHeap.enqueue(this.rightHeap.dequeue().element)

  // We balance queues, and also in case of an odd amount of
  // numbers the median will be kept at the top of rightHeap
  if (this.leftHeap.size() > this.rightHeap.size())
    this.rightHeap.enqueue(this.leftHeap.dequeue().element)
}

MedianFinder.prototype.findMedian = function () {
  if ((this.leftHeap.size() + this.rightHeap.size()) % 2 == 1)
    return this.rightHeap.front().element
  return (this.leftHeap.front().element + this.rightHeap.front().element) / 2
}
