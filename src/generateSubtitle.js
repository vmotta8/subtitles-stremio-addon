/* eslint-disable no-unused-vars */
require('dotenv').config()
const OS = require('opensubtitles-api')
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const functions = require('./index')
const ww = require('../public/words.json')

async function openSubtitles (imdbId) {
  const OpenSubtitles = new OS({
    useragent: 'UserAgent',
    ssl: true
  })

  const subtitles = await OpenSubtitles.search({
    extensions: ['srt'],
    limit: '1',
    imdbid: imdbId
  })

  const obj = { en: subtitles.en[0], pb: subtitles.pb[0] }
  return obj
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
  const words = await format(ww)
  const subtitle = await getSubtitle(subtitles.en.utf8)

  const subtitleWordsArray = functions.stringToArray(subtitle, 3)
  const subtitleWordsCounted = functions.countWords(subtitleWordsArray)

  const subtitleTF = functions.tf(subtitleWordsCounted)
  const wordsIDF = functions.idf(words.index, words.numberOfDocs)
  const subtitleTFIDF = functions.tfidf(subtitleTF, wordsIDF, words)
  const sortedWordsTFIDF = functions.sortable(subtitleTFIDF, 100)

  const translatedWords = await functions.translateArrayOfWords(sortedWordsTFIDF, 'en', 'pt')
  const newSubtitle = functions.addTranslatedWordsToSubtitle(subtitle, translatedWords)
  // fs.writeFileSync(`${path.join(process.cwd(), 'public')}/subtitle.srt`, newSubtitle)

  return [
    {
      url: subtitles.en.utf8,
      lang: 'ENGLISH'
    },
    {
      url: subtitles.pb.utf8,
      lang: 'PORTUGUESE BR'
    }
  ]
}

module.exports = { generateSubtitle }
