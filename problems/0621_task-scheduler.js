// 2-heap O(N * log(k)) = O(N) solution
var leastInterval = function (tasks, n) {
  // [0: letter, 1: last used, 2: the quantity]
  const ready = new MaxPriorityQueue({ priority: (e) => e[2] }) // Ordered by quantity
  const standby = new MinPriorityQueue({ priority: (e) => e[1] }) // Ordered by last used

  const map = {}
  for (let task of tasks) {
    map[task] || (map[task] = 0)
    map[task]++
  }
  for (let letter in map) ready.enqueue([letter, -(n + 1), map[letter]])

  let intervals = 0
  while (!ready.isEmpty() || !standby.isEmpty()) {
    if (!ready.isEmpty()) {
      const [letter, last_used, quantity] = ready.dequeue().element

      // 1. Pick the ready task with the highest and "execute" it
      if (quantity - 1 > 0)
        // There are still tasks remaining
        standby.enqueue([letter, intervals, quantity - 1])
    }

    intervals++

    // 2. Move all the ready tasks on the standby queue
    //    to the ready queue
    while (!standby.isEmpty() && intervals - standby.front().element[1] > n)
      ready.enqueue(standby.dequeue().element)
  }

  return intervals
}

// O(N) solution
var leastInterval = function (tasks, n) {
  const freq = Array(26).fill(0)
  for (let task of tasks) {
    let i = task.charCodeAt(0) - 'A'.charCodeAt(0)
    freq[i] || (freq[i] = 0)
    freq[i]++
  }
  freq.sort((a, b) => b - a)

  const max_freq = freq[0]
  const gaps_between = max_freq - 1
  let idle_slots = gaps_between * n

  for (let i = 1; i < 26; i++) {
    // Imagine A and B occurs 2 times each.
    // gaps_between is then 1, but since B can fill more gaps than that,
    // all remaning B's are moved to the right of A (in this case, 1 at most
    // since B would be the one with the highest frequency otherwise)
    idle_slots -= Math.min(freq[i], gaps_between)
  }

  return idle_slots < 0 ? tasks.length : tasks.length + idle_slots
}
