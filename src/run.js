const fs = require('fs')
const path = require('path')
const functions = require('./index')
const axios = require('axios')

async function format () {
  const words = axios.get('https://raw.githubusercontent.com/vmotta8/words-dataset/master/words.txt')
    .then(resp => {
      return resp.data
    })

  const index = {}
  const numberOfDocs = 15341
  for (const word in words) {
    index[word] = words[word].number_doc
  }

  return { index, numberOfDocs }
}

async function getSubtitle (url) {
  const subtitle = axios.get(url)
    .then(resp => {
      return resp.data
    })

  return subtitle
}

async function generateSubtitle (englishUrl, path) {
  const words = await format()
  const subtitle = await getSubtitle(englishUrl)

  const subtitleWordsArray = functions.stringToArray(subtitle, 3)

  const subtitleWordsCounted = functions.countWords(subtitleWordsArray)

  const subtitleTF = functions.tf(subtitleWordsCounted)

  const wordsIDF = functions.idf(words.index, words.numberOfDocs)

  const subtitleTFIDF = functions.tfidf(subtitleTF, wordsIDF, words)

  const sortedWordsTFIDF = functions.sortable(subtitleTFIDF, 150)

  const translatedWords = await functions.translateArrayOfWords(sortedWordsTFIDF, 'en', 'pt')

  const newSubtitle = functions.addTranslatedWordsToSubtitle(subtitle, translatedWords)

  fs.writeFileSync(`${path}/subtitle.srt`, newSubtitle)
}

generateSubtitle('https://dl.opensubtitles.org/en/download/subencoding-utf8/src-api/vrf-19f60c60/sid-n2ZREOXcey6kUp8xitlRH5Z17ue/filead/1956677851', path.join(process.cwd(), 'public'))

// {"don't":{"number_occur":2310984,"number_doc":15339},"think":{"number_occur":1076860,"number_doc":15341},"you'll":{"number_occur":221791,"number_doc":15332},"have":{"number_occur":2674046,"number_doc":15341},"much":{"number_occur":399573,"number_doc":15341},"luck":{"number_occur":55498,"number_doc":14336},"finding":{"number_occur":18332,"number_doc":9578}}
