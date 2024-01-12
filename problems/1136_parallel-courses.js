// Unoptimized graph + BFS solution
var minimumSemesters = function (n, relations) {
  const graph = {}

  // 1. Build a courses graph
  for (let relation of relations) {
    const [prev, next] = relation

    graph[prev] || (graph[prev] = { prev: [], next: [] })
    graph[next] || (graph[next] = { prev: [], next: [] })

    graph[prev].next.push(next)
    graph[next].prev.push(prev)
  }

  // 2. Fill the graph with all courses
  //    without any requirements
  let queue = []
  for (let course in graph)
    if (graph[course].prev.length == 0) queue.push(course)

  // 3. Perform a BFS to find the minimum required semesters
  const bfs = (queue, finished, semester) => {
    if (!queue.length)
      return finished.size == Object.keys(graph).length ? semester : -1

    const nextQueue = []
    const nextFinished = new Set(finished.values())

    while (queue.length) {
      const course = +queue.shift()
      const node = graph[course]

      if (finished.has(course)) continue

      if (
        node.prev.length == 0 ||
        node.prev.every((req) => finished.has(req))
      ) {
        nextFinished.add(course)
        node.next.forEach((next) => nextQueue.push(next))
      }
    }

    return bfs(nextQueue, nextFinished, semester + 1)
  }

  return bfs(queue, new Set(), 0)
}

// Optimized graph + BFS solution
var minimumSemesters = function (n, relations) {
  // graph[i] gives me the list of course course i is requirement of
  const graph = Array(n)
    .fill()
    .map((_) => [])
  // requirements[i] gives me how many requirements course i has
  const requirements = Array(n).fill(0)

  // 1. Build a courses graph
  for (let [prev, next] of relations) {
    // The courses are 1-index, our arrays are 0-indexed
    graph[prev - 1].push(next - 1)
    requirements[next - 1]++
  }

  // 2. Fill the queue with all courses without any requirements
  let queue = []
  let next_queue = []
  requirements.forEach((req, i) => req == 0 && queue.push(i))

  let semester = 1

  // 3. Perform BFS on the graph
  while (queue.length) {
    const course = queue.shift()
    for (let next_course of graph[course]) {
      requirements[next_course]--

      // If all requirements were completed, we can push
      // the next course to the next semester
      if (requirements[next_course] == 0) next_queue.push(next_course)
    }

    // At each layer, we complete a semester
    if (!queue.length && next_queue.length) {
      queue = next_queue
      next_queue = []
      semester++
    }
  }

  // 4. We check if all courses were completed
  return requirements.every((reqs) => reqs == 0) ? semester : -1
}
