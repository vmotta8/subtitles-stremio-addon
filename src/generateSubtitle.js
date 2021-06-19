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
      limit: '5',
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

  const languages = ['en', 'pb', 'pt', 'es']

  const formattedSubtitles = []
  languages.forEach(langCode => {
    try {
      for (const data of subtitles[langCode]) {
        formattedSubtitles.push({
          id: '1',
          url: data.utf8,
          lang: data.lang
        })
      }
    } catch {
      // do nothing if the subtitles[langCode] are not iterable
    }
  })

  // try {
  //   formattedSubtitles.push({
  //     id: 'engptbrId',
  //     url: `${process.env.TRANSLATE_URL}/${(subtitles.en[0].utf8).split('/').join('%2F')}`,
  //     lang: 'Translated'
  //   })
  // } catch {
  //   // do nothing if there is no english subtitle
  // }

  return formattedSubtitles
}

async function generateSubtitle (data) {
  const subtitles = await openSubtitles(data)
  const formattedSubtitles = formatSubtitles(subtitles)

  return formattedSubtitles
}

module.exports = { generateSubtitle }
