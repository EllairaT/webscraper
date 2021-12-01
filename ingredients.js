import groupBy from './util.js'

// accepts cheerio document
export default function getIngredients($) {
  // ingredients that do not have section headings are assumed to be for the 'main' dish
  var ingredientsList = []
  var currentSection = 'main'

  $('div[id="tabIngredients"]')
    .find('ul > li')
    .each((index, element) => {
      var text = $(element).text().trim()

      // check if list element is a section
      if ($(element).attr('class') === 'section-heading') {
        currentSection = text
      } else if ($(element).find('div[class="ingredient-description"]').text().trim()) {
        ingredientsList.push({ section: [currentSection], ingredient: [text] })
      }
    })

  const result = groupBy(ingredientsList, 'section', 'ingredient')

  return result
}
