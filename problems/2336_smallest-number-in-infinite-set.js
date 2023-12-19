// MinPriorityQueue solution
var SmallestInfiniteSet = function () {
  this.queue = new MinPriorityQueue({ priority: (num) => num })
  this.queue.enqueue(1)

  this.current = 1
  this.set = new Set()
}

SmallestInfiniteSet.prototype.popSmallest = function () {
  const { element } = this.queue.dequeue()

  if (this.set.has(element)) this.set.delete(element)

  if (this.queue.size() == 0) {
    this.current = element + 1
    this.queue.enqueue(element + 1)
  }

  return element
}

SmallestInfiniteSet.prototype.addBack = function (num) {
  if (this.set.has(num) || num >= this.current) return
  this.queue.enqueue(num)
  this.set.add(num)
}

// Optimized solution
var SmallestInfiniteSet = function () {
  this.current = 1
  this.inserts = []
}

SmallestInfiniteSet.prototype.popSmallest = function () {
  if (this.inserts.length > 0) return this.inserts.shift()
  this.current++
  return this.current - 1
}

SmallestInfiniteSet.prototype.addBack = function (num) {
  if (this.inserts.includes(num) || num >= this.current) return
  this.inserts.push(num)
  this.inserts.sort((a, b) => a - b)
}
