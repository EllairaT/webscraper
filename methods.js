import groupBy from './util.js'

export default function getRecipeMethod($) {
  var methodsList = []
  $('div[id="tabMethodSteps"]')
    .find('ul > li')
    .each((index, element) => {
      var step = $(element).find('div[class="recipe-method-step-number"]').text().trim().toString()
      var text = $(element).find('.recipe-method-step-content').text().trim().toString()
      methodsList.push({ stepNum: step, instruction: text })
    })

  return methodsList
}
