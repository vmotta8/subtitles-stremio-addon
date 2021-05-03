/* eslint-disable no-unused-vars */
require('dotenv').config()
const OS = require('opensubtitles-api')

const langcodes = ['en', 'pb', 'pt', 'es']

async function openSubtitles (data) {
  try {
    const OpenSubtitles = new OS({
      useragent: 'UserAgent',
      ssl: true
    })

    const query = {
      extensions: ['srt'],
      limit: '3',
      ...data
    }

    const subtitles = await OpenSubtitles.search(query)

    if (Object.keys(subtitles).length === 0) {
      console.log(subtitles)
      return 0
    }

    return subtitles
  } catch (error) {
    console.log(error)
    return 0
  }
}

function formatSubtitles (subtitles) {
  if (!subtitles) {
    return []
  }

  const all = []
  const sub = {}
  let i = 1
  for (const langcode in subtitles) {
    if (langcodes.includes(langcode)) {
      for (const data of subtitles[langcode]) {
        sub.id = `engptbrId${i}`
        sub.url = data.utf8
        sub.lang = `${data.lang}`
        i++
        const temp = JSON.stringify(sub)
        all.push(JSON.parse(temp))
      }
    }
  }

  let englishSubtitle
  if (subtitles.en) {
    englishSubtitle = subtitles.en[0].utf8
    englishSubtitle = englishSubtitle.split('/').join('%2F')
  } else {
    englishSubtitle = ''
  }

  const url = `${process.env.TRANSLATE_URL}/${englishSubtitle}`
  const translated = {
    id: 'engptbrId',
    url: url,
    lang: 'Translated'
  }
  all.push(translated)

  return all
}

async function generateSubtitle (data) {
  const opensubtitles = await openSubtitles(data)
  const subtitles = formatSubtitles(opensubtitles)

  return subtitles
}

module.exports = { generateSubtitle }
