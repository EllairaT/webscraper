// THIS WEBSCRAPER ONLY WORKS ON taste.com.au !!!!!!!!!!!
// DOES NOT WORK ON OTHER WEBSITES
// @author: Ellaira Torio, Dec 2021

import axios from 'axios'
import cheerio from 'cheerio'
import getIngredients from './ingredients.js'
import getRecipeMethod from './methods.js'
import WriteToFile from './writeFile.js'

// get contents from website and write to JSON file
export default function scrape(url) {
  // GET request to website
  axios
    .get(url)
    .then((res) => {
      let $ = cheerio.load(res.data)
      const header = $('.recipe-title-container h1').text()

      const ingredients = getIngredients($)

      const method = getRecipeMethod($)
      const content =
        '{' +
        JSON.stringify(header) +
        ':' +
        '{' +
        '"ingredients"' +
        ':' +
        ingredients +
        ',' +
        '"methods"' +
        ':' +
        method +
        '}' +
        '}'
      WriteToFile(content, header)
    })
    .catch((err) => {
      console.log('an error occured: ', err)
    })
    .then(console.log('scraping finished.'))
}
