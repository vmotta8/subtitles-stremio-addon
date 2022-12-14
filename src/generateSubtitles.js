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
    console.log('Error on open subtitles method', error)
    return null
  }
}

function formatSubtitles (subtitles) {
  if (!subtitles) {
    console.log('No subtitles to format')
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
      console.log('Error on format subtitles method', error)
    }
  })

  return formattedSubtitles || []
}

async function translateSubtitles (formattedSubtitles) {
  const englishSubtitlesUrls = formattedSubtitles.map(subtitle => {
    if (subtitle?.id?.includes('en')) {
      return subtitle.url
    }
    return null
  })?.filter(Boolean)

  const translatedSubtitlesUrls = englishSubtitlesUrls // TODO: implement translation

  const translatedSubtitles = translatedSubtitlesUrls.map((url, index) => {
    return {
      id: `translated-${index + 1}`,
      url,
      lang: 'Translated'
    }
  })

  return translatedSubtitles
}

async function generateSubtitles (data) {
  const subtitles = await openSubtitles(data)
  const formattedSubtitles = formatSubtitles(subtitles)
  const translatedSubtitles = await translateSubtitles(formattedSubtitles)
  const subtitlesToReturn = [...formattedSubtitles, ...translatedSubtitles]
  console.log(`Found ${subtitlesToReturn.length} subtitles`)

  return subtitlesToReturn
}

module.exports = { generateSubtitles, formatSubtitles, translateSubtitles }
