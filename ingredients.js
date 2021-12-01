// import cheerio from 'cheerio'
import groupBy from './util.js'
export default function getIngredients($) {
  //   let $ = cheerio.load(res.data)

  // ingredients that do not have section headings are assumed to be for the 'main' dish
  var ingredientsList = []
  var currentSection = 'main'

  $('div[id="tabIngredients"]')
    .find('ul > li')
    .each(function (index, element) {
      var text = $(element).text().trim()

      // check if list element is a section
      if ($(element).attr('class') === 'section-heading') {
        currentSection = text
      } else if ($(element).find('div[class="ingredient-description"]').text().trim()) {
        ingredientsList.push({ section: [currentSection], ingredient: [text] })
      }
    })

  console.log('-----START------')
  console.log(groupBy(ingredientsList, 'section', 'ingredient'))
  console.log('------END------')
}
