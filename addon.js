/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const { addonBuilder, serveHTTP, publishToCentral } = require('stremio-addon-sdk')
const { generateSubtitle } = require('./src/generateSubtitle')

const builder = new addonBuilder({
  id: 'org.subtitletranslateaddon',
  version: '1.0.0',

  name: 'English Portuguese Br Subtitles',

  types: ['movie'],
  catalogs: [],
  resources: [
    'subtitles'
  ]
})

builder.defineSubtitlesHandler(async function (args) {
  try {
    const subtitles = await generateSubtitle(args.id)
    return Promise.resolve({ subtitles: subtitles })
  } catch (err) {
    console.log(err)
    return Promise.resolve({ subtitles: [] })
  }
})

serveHTTP(builder.getInterface(), {
  port: process.env.PORT || 7000,
  static: '/public'
})

// If you want this addon to appear in the addon catalogs, call .publishToCentral() with the publically available URL to your manifest
// publishToCentral('https://my-addon.com/manifest.json')
