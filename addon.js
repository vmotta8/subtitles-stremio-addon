/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const { addonBuilder, serveHTTP, publishToCentral } = require('stremio-addon-sdk')
const { generateSubtitle } = require('./src/generateSubtitle')

const builder = new addonBuilder({
  id: 'org.subtitletranslateaddon',
  version: '1.1.0',

  logo: 'https://raw.githubusercontent.com/vmotta8/subtitles-stremio-addon/master/public/logo.png',
  name: 'English Portuguese Br Subtitles',
  description: 'Best English, Portuguese Br, Translated Subtitles and others to your movie',

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
        subtitles = await generateSubtitle({ imdbid: dataID[0], season: dataID[1], episode: dataID[2] })
      } else {
        subtitles = await generateSubtitle({ imdbid: dataID[0] })
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
  port: process.env.PORT || 7000
})

// If you want this addon to appear in the addon catalogs, call .publishToCentral() with the publically available URL to your manifest
// publishToCentral('https://my-addon.com/manifest.json')
