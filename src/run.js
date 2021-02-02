const fs = require('fs')
const words = require('./words/format')
const paths = require('./paths')
const functions = require('./index')

async function run (wordsMinimumLength = 3, numberOfWordsTranslated = 200) {
  for (const file of paths.subtitles) {
    if (file.substr(file.length - 4) === '.srt') {
      const subtitle = fs.readFileSync(paths.subtitlesDir + file, 'utf-8')

      const subtitleWordsArray = functions.stringToArray(subtitle, wordsMinimumLength)

      const subtitleWordsCounted = functions.countWords(subtitleWordsArray)

      const subtitleTF = functions.tf(subtitleWordsCounted)

      const wordsIDF = functions.idf(words.index, words.numberOfDocs)

      const subtitleTFIDF = functions.tfidf(subtitleTF, wordsIDF, words)

      const sortedWordsTFIDF = functions.sortable(subtitleTFIDF, numberOfWordsTranslated)

      const translatedWords = await functions.translateArrayOfWords(sortedWordsTFIDF, 'en', 'pt')

      const newSubtitle = functions.addTranslatedWordsToSubtitle(subtitle, translatedWords)

      fs.writeFileSync(`${paths.newSubtitlesDir}NEW-${file}`, newSubtitle)
    }
  }
}

run(3, 1000)
