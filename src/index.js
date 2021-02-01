/* eslint-disable no-prototype-builtins */
const fs = require('fs')
const path = require('path')

const words = require('./words/words.json')
const dir = path.join(__dirname) + '/subtitle/'
const files = fs.readdirSync(dir, { withFileTypes: true })
  .filter(item => !item.isDirectory())
  .map(item => item.name)

function stringToArray (str) {
  return str.toLocaleLowerCase().match(/[a-zA-Z']+/g)
}

function removeWords (arr, number) {
  const index = []
  for (const word of arr) {
    if (word.length > number) {
      index.push(word)
    }
  }

  return index
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
    if (IDFObj[word]) {
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

function run (subtitle, words) {
  const subtitleArr = stringToArray(subtitle)

  const newSubtitleArr = removeWords(subtitleArr, 3)

  const subtitleCounted = countWords(newSubtitleArr)

  const subtitleTF = tf(subtitleCounted)

  const wordsIDF = idf(words)

  const subtitleTFIDF = tfidf(subtitleTF, wordsIDF)

  const sortedWords = sortable(subtitleTFIDF, 150)

  return sortedWords
}

for (const file of files) {
  const subtitle = fs.readFileSync(dir + file, 'utf-8')

  console.log(run(subtitle, words))
}
