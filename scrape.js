// THIS WEBSCRAPER ONLY WORKS ON taste.com.au !!!!!!!!!!!
// DOES NOT WORK ON OTHER WEBSITES
// @author: Ellaira Torio

import axios from 'axios'
import cheerio from 'cheerio'
import promptSync from 'prompt-sync'
import fs from 'fs'
import parseIngredients from './util.js'

var ingredientsList = []

var currentSection = 'main'
// prompt
const prompt = promptSync()
const url = prompt('Enter a URL: ')

// GET request to website
axios
  .get(url)
  .then((res) => {
    let $ = cheerio.load(res.data)
    const header = $('.recipe-title-container h1').text()
    let list = []
    // ingredients that do not have section headings are assumed to be for the 'main' dish

    $('div[id="tabIngredients"]')
      .find('ul > li')
      .each(function (index, element) {
        var text = $(element).text().trim()

        // check if list element is a section
        if ($(element).attr('class') === 'section-heading') {
          currentSection = text
        } else if ($(element).find('div[class="ingredient-description"]').text().trim()) {
          ingredientsList.push({ [currentSection]: text })
        }
      })

    console.log('-----START------')
    parseIngredients(ingredientsList)
    console.log('------END------')
  })
  .catch((err) => {
    console.log(err)
  })
