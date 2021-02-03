const functions = require('../../src/index')

describe('inverse document frequency', () => {
  it('should return an object with the words and their idf', () => {
    const obj = { give: 4, have: 10, head: 5, lame: 6, maybe: 7, name: 10, only: 10, remember: 10, should: 10, slippery: 2, slope: 3, that: 10 }

    const result = functions.idf(obj, 100)
    expect(result).toEqual({
      give: 1.3979400086720377,
      head: 1.3010299956639813,
      lame: 1.2218487496163564,
      maybe: 1.154901959985743,
      slippery: 1.6989700043360187,
      slope: 1.5228787452803376
    })
  })
})
