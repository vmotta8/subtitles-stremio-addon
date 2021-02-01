/* eslint-disable no-prototype-builtins */
const fs = require('fs')
const words = require('./words/words.json')
const subtitle = fs.readFileSync('/Users/vmotta8/repositories/subtitles-translator-ts/src/subtitle/Interstellar.2014.720p.BluRay.x264.YIFY.srt', 'utf-8')

function stringToArray (str) {
  return str.toLocaleLowerCase().match(/[a-zA-Z']+/g)
}

function countWords (words) {
  const index = {}

  words.forEach(function (word) {
    if (!(index.hasOwnProperty(word))) {
      index[word] = 0
    }
    index[word]++
  })

  return index
}

function tf (subtitleCounted) {
  let sum = 0
  for (const word in subtitleCounted) {
    sum += parseFloat(subtitleCounted[word])
  }

  const index = {}
  for (const word in subtitleCounted) {
    index[word] = subtitleCounted[word] / sum
  }

  return index
}

function idf (wordsCounted) {
  const index = {}

  for (const word in wordsCounted) {
    index[word] = Math.log10(15341 / wordsCounted[word].number_doc)
  }

  return index
}

function tfidf (TFObj, IDFObj) {
  const index = {}

  for (const word in TFObj) {
    if (!(IDFObj[word])) {
      //
    } else {
      index[word] = TFObj[word] * IDFObj[word]
    }
  }

  return index
}

function sortable (obj, number) {
  const index = []
  for (const vehicle in obj) {
    index.push([vehicle, obj[vehicle]])
  }

  index.sort(function (a, b) {
    return b[1] - a[1]
  })

  const newIndex = []

  for (let i = 0; i < number; i++) {
    newIndex.push(index[i])
  }

  return newIndex
}

const subtitleArr = stringToArray(subtitle)

const subtitleCounted = countWords(subtitleArr)

const subtitleTF = tf(subtitleCounted)

const wordsIDF = idf(words)

const subtitleTFIDF = tfidf(subtitleTF, wordsIDF)

const sortedWords = sortable(subtitleTFIDF, 150)

console.log(sortedWords)
