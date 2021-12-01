// THIS WEBSCRAPER ONLY WORKS ON taste.com.au !!!!!!!!!!!
// DOES NOT WORK ON OTHER WEBSITES
// @author: Ellaira Torio, Dec 2021

import axios from 'axios'
import cheerio from 'cheerio'
import promptSync from 'prompt-sync'
import fs from 'fs'

import getIngredients from './ingredients.js'
import getRecipeMethod from './methods.js'

// prompt
const prompt = promptSync()
const url = prompt('Enter a URL: ')

// GET request to website
axios
  .get(url)
  .then((res) => {
    let $ = cheerio.load(res.data)
    const header = $('.recipe-title-container h1').text()
    console.log('Recipe for: ', header)
    console.log('INGREDIENTS: ---------------------\n', getIngredients($), '\n--------------------------------')
    console.log('METHOD: ---------------------\n', getRecipeMethod($), '\n--------------------------------')
  })
  .catch((err) => {
    console.log('an error occured: ', err)
  })
