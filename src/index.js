/* eslint-disable no-prototype-builtins */
const tr = require('googletrans')
const translate = tr.default

module.exports = {
  stringToArray: function (str, wordsMinimumLength) {
    const strWordsArray = str.match(/[a-zA-Z'áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+/g)

    const index = []
    for (const word of strWordsArray) {
      const replaced = word.replace(/[']+/g, '')
      const lower = word.toLocaleLowerCase()

      if (word.length > wordsMinimumLength && replaced === word && word === lower) {
        index.push(word)
      }
    }

    return index
  },

  countWords: function (wordsArray) {
    const index = {}

    wordsArray.forEach(function (word) {
      if (!(index.hasOwnProperty(word))) {
        index[word] = 0
      }
      index[word]++
    })

    return index
  },

  tf: function (wordsCountedObj) {
    let sum = 0
    for (const word in wordsCountedObj) {
      sum += wordsCountedObj[word]
    }

    const index = {}
    for (const word in wordsCountedObj) {
      index[word] = (wordsCountedObj[word]) / sum
    }

    return index
  },

  idf: function (wordsNumberOfOccurrencesObj, numberOfDocs) {
    const index = {}

    for (const word in wordsNumberOfOccurrencesObj) {
      const number = (numberOfDocs) / (wordsNumberOfOccurrencesObj[word])
      if (number > 10) {
        index[word] = Math.log10(number)
      }
    }

    return index
  },

  tfidf: function (TFObj, IDFObj, dataset) {
    const index = {}

    for (const word in TFObj) {
      if (IDFObj[word]) {
        index[word] = TFObj[word] * IDFObj[word]
      } else if (!dataset.index[word]) {
        index[word] = TFObj[word] * dataset.numberOfDocs
      }
    }

    return index
  },

  sortable: function (obj, numberOfWords) {
    const index = []
    for (const vehicle in obj) {
      index.push([vehicle, obj[vehicle]])
    }

    index.sort(function (a, b) {
      return b[1] - a[1]
    })

    return index.slice(0, numberOfWords)
  },

  translateArrayOfWords: async function (wordsObj, from, to) {
    const wordsArray = []
    for (const obj of wordsObj) {
      wordsArray.push(obj[0])
    }

    const wordsStr = wordsArray.join('. ')

    const translated = await (translate(wordsStr, { from: from, to: to }))

    const translatedArray = (translated.text).split('. ')

    const index = {}
    for (let i = 0; i < translatedArray.length; i++) {
      const translatedWord = translatedArray[i].toLocaleLowerCase().replace(/[.':%]+/g, '')
      if (translatedWord !== wordsArray[i]) {
        index[wordsArray[i]] = translatedWord
      }
    }

    return index
  },

  addTranslatedWordsToSubtitle: function (subtitle, translatedWords) {
    for (const word in translatedWords) {
      const reg = new RegExp(` ${word} `, 'g')
      subtitle = subtitle.replace(reg, ` ${word}(${translatedWords[word]}) `)
    }

    return subtitle
  }
}
