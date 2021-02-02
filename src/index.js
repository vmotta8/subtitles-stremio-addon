/* eslint-disable no-prototype-builtins */
const fs = require('fs')
const tr = require('googletrans')
const words = require('./words/format')
const paths = require('./paths')
const translate = tr.default

function stringToArray (str, wordsMinimumLength) {
  const strWordsArray = str.toLocaleLowerCase().match(/[a-zA-Z'áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+/g)

  const index = []
  for (const word of strWordsArray) {
    const replaced = word.replace(/[']+/g, '')

    if (word.length > wordsMinimumLength && replaced === word) {
      index.push(word)
    }
  }

  return index
}

function countWords (wordsArray) {
  const index = {}

  wordsArray.forEach(function (word) {
    if (!(index.hasOwnProperty(word))) {
      index[word] = 0
    }
    index[word]++
  })

  return index
}

function tf (wordsCountedObj) {
  let sum = 0
  for (const word in wordsCountedObj) {
    sum += wordsCountedObj[word]
  }

  const index = {}
  for (const word in wordsCountedObj) {
    index[word] = (wordsCountedObj[word]) / sum
  }

  return index
}

function idf (wordsNumberOfOccurrencesObj, numberOfDocs) {
  const index = {}

  for (const word in wordsNumberOfOccurrencesObj) {
    const number = (numberOfDocs) / (wordsNumberOfOccurrencesObj[word])
    if (number > 10) {
      index[word] = Math.log10(number)
    }
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

function sortable (obj, numberOfWords) {
  const index = []
  for (const vehicle in obj) {
    index.push([vehicle, obj[vehicle]])
  }

  index.sort(function (a, b) {
    return b[1] - a[1]
  })

  return index.slice(0, numberOfWords)
}

async function translateArrayOfWords (wordsObj, from, to) {
  const wordsArray = []
  for (const obj of wordsObj) {
    wordsArray.push(obj[0])
  }

  const wordsStr = wordsArray.join('. ')

  const translated = await (translate(wordsStr, { from: from, to: to }))

  const translatedArray = (translated.text).split('. ')

  const index = {}
  for (let i = 0; i < wordsArray.length; i++) {
    const translatedWord = translatedArray[i].toLocaleLowerCase().replace(/[.':%]+/g, '')
    if (translatedWord !== wordsArray[i]) {
      index[wordsArray[i]] = translatedWord
    }
  }

  return index
}

function addTranslatedWordsToSubtitle (subtitle, translatedWords) {
  subtitle = subtitle.toLocaleLowerCase()

  for (const word in translatedWords) {
    const reg = new RegExp(` ${word} `, 'g')
    subtitle = subtitle.replace(reg, ` ${word}(${translatedWords[word]}) `)
  }

  return subtitle
}

async function run (wordsMinimumLength = 3, numberOfWordsTranslated = 200) {
  for (const file of paths.subtitles) {
    if (file.substr(file.length - 4) === '.srt') {
      const subtitle = fs.readFileSync(paths.subtitlesDir + file, 'utf-8')

      const subtitleWordsArray = stringToArray(subtitle, wordsMinimumLength)

      const subtitleWordsCounted = countWords(subtitleWordsArray)

      const subtitleTF = tf(subtitleWordsCounted)

      const wordsIDF = idf(words.index, words.numberOfDocs)

      const subtitleTFIDF = tfidf(subtitleTF, wordsIDF)

      const sortedWordsTFIDF = sortable(subtitleTFIDF, numberOfWordsTranslated)

      const translatedWords = await translateArrayOfWords(sortedWordsTFIDF, 'en', 'pt')

      const newSubtitle = addTranslatedWordsToSubtitle(subtitle, translatedWords)

      fs.writeFileSync(`${paths.newSubtitlesDir}NEW-${file}`, newSubtitle)
    }
  }
}

run(3, 1000)
