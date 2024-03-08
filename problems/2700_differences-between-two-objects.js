function objDiff(obj1, obj2, result = {}) {
  // 0. Check if the object themselves are incompatible
  if (typeof obj1 != typeof obj2 || Array.isArray(obj1) !== Array.isArray(obj2)) return [obj1, obj2]

  for (let prop in obj1) {
    // 1. Property is not shared between objects, skip
    if (obj2[prop] === undefined) continue

    // 2. At least one of the properties values is an object
    if (typeof obj1[prop] === 'object' || typeof obj2[prop] === 'object') {
      // 2.1. There is a type mismatch (both checks are necessary
      //      because arrays are considered "objects" in JS)
      if (typeof obj1[prop] !== typeof obj2[prop] || Array.isArray(obj1[prop]) !== Array.isArray(obj2[prop]))
        result[prop] = [obj1[prop], obj2[prop]]
      // 2.2. Both are either objects or arrays
      else {
        result[prop] = {}
        result[prop] = objDiff(obj1[prop], obj2[prop], result[prop])
        if (Object.keys(result[prop]).length == 0) delete result[prop]
      }

      continue
    }

    // 3. The simple values of both properties don't match
    if (obj1[prop] !== obj2[prop]) result[prop] = [obj1[prop], obj2[prop]]
  }

  return result
}

// Shortened version
function objDiff(obj1, obj2, result = {}) {
  // 0. Check if the object themselves are incompatible
  if (typeof obj1 != typeof obj2 || Array.isArray(obj1) !== Array.isArray(obj2)) return [obj1, obj2]

  for (let prop in obj1) {
    // 1. Property is not shared between objects, skip
    if (obj2[prop] === undefined) continue

    // 2. At least one of the properties values is an object
    if (typeof obj1[prop] === 'object' || typeof obj2[prop] === 'object') {
      result[prop] = {}
      result[prop] = objDiff(obj1[prop], obj2[prop], result[prop])
      if (Object.keys(result[prop]).length == 0) delete result[prop]
      continue
    }

    // 3. The simple values of both properties don't match
    if (obj1[prop] !== obj2[prop]) {
      result[prop] = [obj1[prop], obj2[prop]]
    }
  }

  return result
}
