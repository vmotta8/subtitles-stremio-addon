/* eslint-disable no-prototype-builtins */
const fs = require('fs')
const path = require('path')
const translate = require('googletrans').default

const words = require('./words/words.json')
const dir = path.join(__dirname) + '/subtitle/'
const files = fs.readdirSync(dir, { withFileTypes: true })
  .filter(item => !item.isDirectory())
  .map(item => item.name)

function formatWords (words) {
  const index = {}
  for (const word in words) {
    index[word] = words[word].number_doc
  }

  return index
}

function stringToArray (str, number) {
  const strArr = str.toLocaleLowerCase().match(/[a-zA-Z'áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+/g)

  const index = []
  for (const word of strArr) {
    const replaced = word.replace(/[']+/g, '')

    if (word.length > number && replaced === word) {
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
    index[word] = (subtitleCounted[word] - 1) / sum
  }

  return index
}

function idf (wordsCounted) {
  const index = {}

  for (const word in wordsCounted) {
    const number = (15342) / (wordsCounted[word] + 1)
    if (number > 5) {
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

async function translateArr (arr, from, to) {
  const index = {}
  let i = 1
  let k = 1
  for (const obj of arr) {
    let translated = await (translate(obj[0], { from: from, to: to }))
    translated = (translated.text).toLocaleLowerCase().replace(/[.':%]+/g, '')

    if (translated !== obj[0]) {
      index[obj[0]] = translated
    }

    if (i === 10) {
      console.log(`${i * k} words have been translated.`)
      i = 1
      k++
    } else {
      i++
    }
  }

  return index
}

function addWords (subtitle, words) {
  subtitle = subtitle.toLocaleLowerCase()

  for (const word in words) {
    const reg = new RegExp(` ${word} `, 'g')
    subtitle = subtitle.replace(reg, ` ${word}(${words[word]}) `)
  }

  return subtitle
}

async function run (removeWordsSmallerThan, amountOfWordsTranslated) {
  for (const file of files) {
    if (file.substr(file.length - 4) === '.srt') {
      const formatedWords = formatWords(words)

      const subtitle = fs.readFileSync(dir + file, 'utf-8')

      const subtitleArr = stringToArray(subtitle, removeWordsSmallerThan)

      const subtitleCounted = countWords(subtitleArr)

      const subtitleTF = tf(subtitleCounted)

      const wordsIDF = idf(formatedWords)

      const subtitleTFIDF = tfidf(subtitleTF, wordsIDF)

      const sortedWords = sortable(subtitleTFIDF, amountOfWordsTranslated)

      const translatedWords = await translateArr(sortedWords, 'en', 'pt')

      const newSubtitle = addWords(subtitle, translatedWords)

      fs.writeFileSync(`${dir}new/NEW-${file}`, newSubtitle)
    }
  }
}

const removeWordsSmallerThan = 3
const amountOfWordsTranslated = 300

run(removeWordsSmallerThan, amountOfWordsTranslated)
