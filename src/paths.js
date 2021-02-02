const path = require('path')
const fs = require('fs')

const dir = path.join(__dirname)
const subtitlesDir = dir + '/subtitle/'
const newSubtitlesDir = dir + '/subtitle/new/'

const subtitles = fs.readdirSync(subtitlesDir, { withFileTypes: true })
  .filter(item => !item.isDirectory())
  .map(item => item.name)

module.exports = Object.freeze({
  subtitlesDir,
  newSubtitlesDir,
  subtitles
})
