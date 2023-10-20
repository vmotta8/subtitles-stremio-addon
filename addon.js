/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const { addonBuilder, serveHTTP, publishToCentral } = require('stremio-addon-sdk')
const { generateSubtitles } = require('./src/generateSubtitles')

const builder = new addonBuilder({
  id: 'org.abcsubtitles',
  version: '1.0.0',

  logo: undefined,
  name: 'Abc Subtitles',
  description: 'Best subtitles to your movie',

  types: ['movie', 'series'],
  catalogs: [],
  resources: [
    'subtitles'
  ]
})

builder.defineSubtitlesHandler(async function (args) {
  const dataID = args.id.split(':')
  if ((dataID[0]).slice(0, 2) === 'tt' && dataID[0].length <= 12) {
    try {
      let subtitles
      if (dataID.length > 1) {
        subtitles = await generateSubtitles({ imdbid: dataID[0], season: dataID[1], episode: dataID[2] })
      } else {
        subtitles = await generateSubtitles({ imdbid: dataID[0] })
      }

      return Promise.resolve({ subtitles: subtitles })
    } catch (error) {
      console.log(error)
      return Promise.resolve({ subtitles: [] })
    }
  } else {
    return Promise.resolve({ subtitles: [] })
  }
})

serveHTTP(builder.getInterface(), {
  port: process.env.PORT || 3010
})

// If you want this addon to appear in the addon catalogs, call .publishToCentral() with the publically available URL to your manifest
// publishToCentral('https://my-addon.com/manifest.json')
