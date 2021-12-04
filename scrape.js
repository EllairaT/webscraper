// THIS WEBSCRAPER ONLY WORKS ON taste.com.au !!!!!!!!!!!
// DOES NOT WORK ON OTHER WEBSITES
// @author: Ellaira Torio, Dec 2021

import axios from 'axios'
import cheerio from 'cheerio'
import promptSync from 'prompt-sync'
import getIngredients from './ingredients.js'
import getRecipeMethod from './methods.js'
import WriteToFile from './writeFile.js'

// TODO: refactor to accept URL instead of doing it by prompt

// get contents from website and write to JSON file
export default function scrape() {
  // prompt
  const prompt = promptSync()
  const url = prompt('Enter a URL: ')

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
