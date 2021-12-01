// THIS WEBSCRAPER ONLY WORKS ON taste.com.au !!!!!!!!!!!
// DOES NOT WORK ON OTHER WEBSITES
// @author: Ellaira Torio, Dec 2021

import axios from 'axios'
import cheerio from 'cheerio'
import promptSync from 'prompt-sync'
import getIngredients from './ingredients.js'
import getRecipeMethod from './methods.js'
import WriteToFile from './writeFile.js'
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

    // WriteToFile(JSON.stringify(header), header)
    WriteToFile(JSON.stringify(ingredients), header)
    // WriteToFile(JSON.stringify(method), header)
  })
  .catch((err) => {
    console.log('an error occured: ', err)
  })

// TODO: write ingredients list and method to JSON file.
