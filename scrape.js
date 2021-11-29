import axios from 'axios'
import cheerio from 'cheerio'
import promptSync from 'prompt-sync'

const prompt = promptSync()

let url = 'https://www.taste.com.au/recipes/one-pan-cheese-bacon-smothered-chicken-recipe/nrji6hy7?r=dinner&h=Dinner'
const newURL = prompt('Enter a URL: ')

axios
  .get(newURL)
  .then((res) => {
    let $ = cheerio.load(res.data)
    const header = $('.recipe-title-container h1').text()
    const ingredients = $('#tabIngredients .ingredient-description').text()
    const text = $('#tabMethodSteps li .recipe-method-step-content').text()
    console.log(header)
    console.log(ingredients)
    console.log(text)
  })
  .catch((err) => {
    console.log(err)
  })
