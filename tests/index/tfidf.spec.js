const functions = require('../../src/index')

describe('term frequency - inverse document frequency', () => {
  it('should return an object with the words and their tfidf', () => {
    const dataset = {
      index: { give: 4, have: 10, head: 5, lame: 6, maybe: 7, name: 10, only: 10, remember: 10, should: 10, slippery: 2, slope: 3, that: 10 },
      numberOfDocs: 100
    }

    const TFObj = {
      give: 0.07692307692307693,
      have: 0.07692307692307693,
      head: 0.07692307692307693,
      lame: 0.07692307692307693,
      maybe: 0.07692307692307693,
      name: 0.07692307692307693,
      only: 0.07692307692307693,
      remember: 0.07692307692307693,
      should: 0.07692307692307693,
      slippery: 0.07692307692307693,
      slope: 0.07692307692307693,
      that: 0.15384615384615385
    }

    const IDFObj = {
      give: 1.3979400086720377,
      head: 1.3010299956639813,
      lame: 1.2218487496163564,
      maybe: 1.154901959985743,
      slippery: 1.6989700043360187,
      slope: 1.5228787452803376
    }

    const result = functions.tfidf(TFObj, IDFObj, dataset)
    expect(result).toEqual({
      give: 0.10753384682092598,
      head: 0.10007923043569088,
      lame: 0.09398836535510434,
      maybe: 0.08883861230659562,
      slippery: 0.13069000033353992,
      slope: 0.11714451886771829
    })
  })
})
