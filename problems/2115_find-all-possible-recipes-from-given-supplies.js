/*

You have information about n different recipes.
You are given a string array recipes and a 2D string array ingredients.
The ith recipe has the name recipes[i], and you can create it if you have all the needed ingredients from ingredients[i].
Ingredients to a recipe may need to be created from other recipes, i.e.,
ingredients[i] may contain a string that is in recipes.

You are also given a string array supplies containing all the ingredients that you initially have,
and you have an infinite supply of all of them.

Return a list of all the recipes that you can create. You may return the answer in any order.

Note that two recipes may contain each other in their ingredients.

Example 1:
  Input: recipes = ["bread"], ingredients = [["yeast","flour"]], supplies = ["yeast","flour","corn"]
  Output: ["bread"]
  Explanation:
    We can create "bread" since we have the ingredients "yeast" and "flour".

Example 2:
  Input: recipes = ["bread","sandwich"], ingredients = [["yeast","flour"],["bread","meat"]],
         supplies = ["yeast","flour","meat"]
  Output: ["bread","sandwich"]
  Explanation:
    We can create "bread" since we have the ingredients "yeast" and "flour".
    We can create "sandwich" since we have the ingredient "meat" and can create the ingredient "bread".

Example 3:
  Input: recipes = ["bread","sandwich","burger"],
        ingredients = [["yeast","flour"],["bread","meat"],["sandwich","meat","bread"]],
        supplies = ["yeast","flour","meat"]
  Output: ["bread","sandwich","burger"]
  Explanation:
    We can create "bread" since we have the ingredients "yeast" and "flour".
    We can create "sandwich" since we have the ingredient "meat" and can create the ingredient "bread".
    We can create "burger" since we have the ingredient "meat" and can create the ingredients "bread" and "sandwich".

Constraints:
- n == recipes.length == ingredients.length
- 1 <= n <= 100
- 1 <= ingredients[i].length, supplies.length <= 100
- 1 <= recipes[i].length, ingredients[i][j].length, supplies[k].length <= 10
- recipes[i], ingredients[i][j], and supplies[k] consist only of lowercase English letters.
- All the values of recipes and supplies combined are unique.
- Each ingredients[i] does not contain any duplicate values.

*/

var findAllRecipes = function (recipes, ingredients, supplies) {
  // Map of all ingredients in the supplies
  // and successful and failed recipes
  const tested_recipes = new Map()
  for (let supply of supplies) tested_recipes.set(supply, true)

  // Set specifically used to mark visited
  // graph nodes to avoid cyclical connections
  const visited = new Set()

  // Graph, where every node is a recipe
  const graph = {}
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i]
    graph[recipe] || (graph[recipe] = [...ingredients[i]])
  }

  // DFS function that checks whether we are able to make the recipe
  const make_recipe = (recipe) => {
    if (tested_recipes.has(recipe)) return tested_recipes.get(recipe)

    // If we already passed through this recipe node
    // but we haven't concluded whether its possible or not, it means
    // we've found a cyclical connection in our graph
    if (visited.has(recipe)) return false
    visited.add(recipe)

    // For each ingredient:
    let is_success = true
    for (let ingredient of graph[recipe]) {
      // 1. Check if we have it already
      if (tested_recipes.get(ingredient)) continue
      // 2. Or if it's possible to make it
      else if (graph[ingredient] && make_recipe(ingredient)) continue
      else {
        is_success = false
        break
      }
    }

    // Save and return result
    tested_recipes.set(recipe, is_success)
    return is_success
  }

  const result = []
  for (let recipe of recipes) if (make_recipe(recipe)) result.push(recipe)

  return result
}
