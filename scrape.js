// THIS WEBSCRAPER ONLY WORKS ON taste.com.au !!!!!!!!!!!
// DOES NOT WORK ON OTHER WEBSITES
// @author: Ellaira Torio, Dec 2021

import axios from 'axios'
import cheerio from 'cheerio'
import promptSync from 'prompt-sync'
import fs from 'fs'
import groupBy from './util.js'

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
    // ingredients that do not have section headings are assumed to be for the 'main' dish

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
  })
  .catch((err) => {
    console.log('an error occured: ', err)
  })
