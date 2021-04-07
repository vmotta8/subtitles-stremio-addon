/* eslint-disable no-unused-vars */
require('dotenv').config()
const OS = require('opensubtitles-api')
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const functions = require('./index')
const ww = require('../public/words.json')

const langcodes = ['en', 'pb', 'pt', 'zt', 'ja', 'ar', 'es', 'ru']

async function openSubtitles (imdbId) {
  const OpenSubtitles = new OS({
    useragent: 'UserAgent',
    ssl: true
  })

  const subtitles = await OpenSubtitles.search({
    extensions: ['srt'],
    limit: '3',
    imdbid: imdbId
  })

  const all = []
  const sub = {}
  for (const langcode in subtitles) {
    if (langcodes.includes(langcode)) {
      for (const data of subtitles[langcode]) {
        sub.lang = (data.lang)
        sub.url = data.utf8
        const temp = JSON.stringify(sub)
        all.push(JSON.parse(temp))
      }
      // all.push({ langcode: langcode, lang: subtitles[langcode][0].lang })
    }
  }

  return all
}

async function format (words) {
  const index = {}
  const numberOfDocs = 15341
  for (const word in words) {
    index[word] = words[word].number_doc
  }

  return { index, numberOfDocs }
}

async function getSubtitle (url) {
  const subtitle = await axios.get(url)
  return subtitle.data
}

async function generateSubtitle (imdbId) {
  const subtitles = await openSubtitles(imdbId)
  // const words = await format(ww)
  // const subtitle = await getSubtitle(subtitles.en.utf8)

  // const subtitleWordsArray = functions.stringToArray(subtitle, 3)
  // const subtitleWordsCounted = functions.countWords(subtitleWordsArray)

  // const subtitleTF = functions.tf(subtitleWordsCounted)
  // const wordsIDF = functions.idf(words.index, words.numberOfDocs)
  // const subtitleTFIDF = functions.tfidf(subtitleTF, wordsIDF, words)
  // const sortedWordsTFIDF = functions.sortable(subtitleTFIDF, 100)

  // const translatedWords = await functions.translateArrayOfWords(sortedWordsTFIDF, 'en', 'pt')
  // const newSubtitle = functions.addTranslatedWordsToSubtitle(subtitle, translatedWords)
  // fs.writeFileSync(`${path.join(process.cwd(), 'public')}/subtitle.srt`, newSubtitle)

  return subtitles
}

module.exports = { generateSubtitle }
