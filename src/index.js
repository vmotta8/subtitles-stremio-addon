/* eslint-disable no-prototype-builtins */
const fs = require('fs')
const path = require('path')
const translate = require('googletrans').default

const words = require('./words/words.json')
const dir = path.join(__dirname) + '/subtitle/'
const files = fs.readdirSync(dir, { withFileTypes: true })
  .filter(item => !item.isDirectory())
  .map(item => item.name)

function stringToArray (str) {
  return str.toLocaleLowerCase().match(/[a-zA-Z'áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+/g)
}

function removeWords (arr, number) {
  const index = []
  for (const word of arr) {
    const replaced = word.replace(/[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+/g, '')
    if (word.length > number && replaced !== "'") {
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

async function translateArr (arr, from, to) {
  const index = {}
  let i = 1
  let k = 1
  for (const obj of arr) {
    let translated = await (translate(obj[0], { from: from, to: to }))
    translated = (translated.text).toLocaleLowerCase().replace('.', '')

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
    const reg = new RegExp(word, 'g')
    subtitle = subtitle.replace(reg, `${word}(${words[word]})`)
  }

  return subtitle
}

async function run () {
  for (const file of files) {
    if (file.substr(file.length - 4) === '.srt') {
      const subtitle = fs.readFileSync(dir + file, 'utf-8')

      const subtitleArr = stringToArray(subtitle)

      const newSubtitleArr = removeWords(subtitleArr, 3)

      const subtitleCounted = countWords(newSubtitleArr)

      const subtitleTF = tf(subtitleCounted)

      const wordsIDF = idf(words)

      const subtitleTFIDF = tfidf(subtitleTF, wordsIDF)

      const sortedWords = sortable(subtitleTFIDF, 50)

      const translatedWords = await translateArr(sortedWords, 'en', 'pt')

      const newSubtitle = addWords(subtitle, translatedWords)

      fs.writeFileSync(`${dir}new/NEW-${file}`, newSubtitle)
    }
  }
}

run()
