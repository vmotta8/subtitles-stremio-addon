const fs = require('fs')
// const words = require('./words/words.json')
const subtitle = fs.readFileSync('/Users/vmotta8/repositories/subtitles-translator-ts/src/subtitle/Interstellar.2014.720p.BluRay.x264.YIFY.srt', 'utf-8')

function stringToArray (str) {
  return str.toLocaleLowerCase().match(/[a-zA-Z']+/g)
}

function countWords (words) {
  const index = {}

  words.forEach(function (word) {
    // eslint-disable-next-line no-prototype-builtins
    if (!(index.hasOwnProperty(word))) {
      index[word] = 0
    }
    index[word]++
  })

  return index
}

const subtitleArr = stringToArray(subtitle)
const subtitleCounted = countWords(subtitleArr)

console.log(subtitleCounted)
