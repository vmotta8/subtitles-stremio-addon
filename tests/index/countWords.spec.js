const functions = require('../../src/index')

describe('count words', () => {
  it('should return an object with the words counted', () => {
    const arr = [
      'lame',
      'maybe',
      'should',
      'give',
      'name',
      'slippery',
      'slope',
      'only',
      'head',
      'have',
      'remember',
      'that',
      'that'
    ]

    const result = functions.countWords(arr)
    expect(result).toEqual({ give: 1, have: 1, head: 1, lame: 1, maybe: 1, name: 1, only: 1, remember: 1, should: 1, slippery: 1, slope: 1, that: 2 })
  })
})
