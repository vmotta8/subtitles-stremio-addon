const dataset = require('./words.json')

function format (words) {
  const index = {}
  const numberOfDocs = 15341
  for (const word in words) {
    index[word] = words[word].number_doc
  }

  return { index, numberOfDocs }
}

const words = format(dataset)

module.exports = Object.freeze(
  words
)
