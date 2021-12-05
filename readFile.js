import fs, { read } from 'fs'

// accepts json file and string option
export default function readFromFile(file, opt) {
  let options = ['title', 'ingredients', 'steps', 'all']
  let file = 'recipes/Chocolate mint Aero trifle.json'
  let rawData = fs.readFileSync(file)

  // recipe is now an object
  let recipe = JSON.parse(rawData)

  let title = Object.keys(recipe).toString()
  //   let ingredientsList = recipe[title].ingredients
  //   let methodsList = recipe[title].methods

  let returnValue
  if (options.includes(opt)) {
    switch (key) {
      case 'title':
        returnValue = title
        break
      case 'ingredients':
        returnValue = recipe[title].ingredients
        break
      case 'steps':
        returnValue = recipe[title].methods
        break
      case 'all': // fall-through
      default:
        returnValue = recipe
        break
    }
  }
  return returnValue
}

readFromFile()
