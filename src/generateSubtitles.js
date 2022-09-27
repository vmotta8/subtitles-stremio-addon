/* eslint-disable no-unused-vars */
require('dotenv').config()
const OS = require('opensubtitles-api')

async function openSubtitles (data) {
  try {
    const OpenSubtitles = new OS({
      useragent: 'UserAgent',
      ssl: true
    })

    const query = {
      extensions: ['srt'],
      limit: '10',
      ...data
    }

    const subtitles = await OpenSubtitles.search(query)

    if (!Object.keys(subtitles).length) {
      console.log('No subtitles found')
      return null
    }

    return subtitles
  } catch (error) {
    console.log(error)
    return null
  }
}

function formatSubtitles (subtitles) {
  if (!subtitles) {
    return []
  }

  const languages = ['en', 'pb', 'pt']

  const formattedSubtitles = []
  languages.forEach(langCode => {
    let i = 0
    try {
      for (const data of subtitles[langCode]) {
        i++
        formattedSubtitles.push({
          id: `${langCode}-${i}`,
          url: data.utf8,
          lang: data.lang
        })
      }
    } catch (error) {
      console.log(error)
    }
  })

  return formattedSubtitles
}

async function generateSubtitles (data) {
  const subtitles = await openSubtitles(data)
  const formattedSubtitles = formatSubtitles(subtitles)
  console.log(`Found ${formattedSubtitles.length} subtitles`)

  return formattedSubtitles
}

module.exports = { generateSubtitles, formatSubtitles }
