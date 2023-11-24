/*

There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.
You are given an array prerequisites where prerequisites[i] = [ai, bi]
indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.

Example 1:
  Input: numCourses = 2, prerequisites = [[1,0]]
  Output: true
  Explanation: There are a total of 2 courses to take.
               To take course 1 you should have finished course 0. So it is possible.

Example 2:
  Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
  Output: false
  Explanation: There are a total of 2 courses to take.
               To take course 1 you should have finished course 0,
               and to take course 0 you should also have finished course 1. So it is impossible.

Constraints:
- 1 <= numCourses <= 2000
- 0 <= prerequisites.length <= 5000
- prerequisites[i].length == 2
- 0 <= ai, bi < numCourses
- All the pairs prerequisites[i] are unique.

*/

var canFinish = function (numCourses, prerequisites) {
  // Graph containing courses, where graph[i]
  // is an object containing all of course i's prerequisites
  // (we use a JavaScript Map because we need to easily remove nodes)
  const graph = new Map()

  // A set determining if we already visited a course node
  let visited = new Set()

  // 1. Build the graph
  for (let prerequisite of prerequisites) {
    const [course, requirement] = prerequisite
    if (!graph.has(course)) graph.set(course, [])
    graph.get(course).push(requirement)
  }

  // If the course is completable,
  // the course itself wii not be present in the graph
  // or its requirements will eventually lead to courses not in the graph

  // Otherwise, our search will lead to a node we already visited, which
  // means we have a circular depedency
  const dfs = (course) => {
    if (!graph.has(course)) return true
    if (visited.has(course)) return false

    visited.add(course)

    for (let requirement of graph.get(course)) {
      if (!dfs(requirement)) return false
    }

    // At this point, the course is completable, so we
    // remove it from the graph, not only quickening future searches
    // but allowing them to work without constantly erasing visited[]
    graph.delete(course)
    return true
  }

  // 2. For each course, we perform a DFS verifying
  //    whether the course is completed or not
  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) return false
  }

  return true
}
