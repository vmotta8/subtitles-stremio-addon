/* eslint-disable no-unused-vars */
require('dotenv').config()
const OS = require('opensubtitles-api')
const axios = require('axios')

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
        sub.url = data.utf8
        sub.lang = (data.lang)
        const temp = JSON.stringify(sub)
        all.push(JSON.parse(temp))
      }
    }
  }

  let englishSubtitle
  if (subtitles.en[0].utf8) {
    englishSubtitle = subtitles.en[0].utf8
    englishSubtitle = englishSubtitle.split('/').join('%2F')
  } else {
    englishSubtitle = ''
  }

  return { all, englishSubtitle }
}

async function generateSubtitle (imdbId) {
  const subtitles = await openSubtitles(imdbId)
  const url = `${process.env.TRANSLATE_URL}/${subtitles.englishSubtitle}`

  const translated = {
    url: url,
    lang: 'Translated'
  }

  subtitles.all.push(translated)

  await axios.get(url)

  return subtitles.all
}

module.exports = { generateSubtitle }
