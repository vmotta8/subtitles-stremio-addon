const fs = require('fs')
// const words = require('./words/words.json')
let subtitle = fs.readFileSync('/Users/vmotta8/repositories/subtitles-translator-ts/src/subtitle/Interstellar.2014.720p.BluRay.x264.YIFY.srt', 'utf-8')

function stringToArray (str) {
  return str.toLocaleLowerCase().match(/[a-zA-Z']+/g)
}

subtitle = stringToArray(subtitle)

console.log(subtitle)
