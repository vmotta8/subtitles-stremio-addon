const functions = require('../../src/index')

describe('sortable', () => {
  it('should return an array with the words ordered by tfidf', () => {
    const obj = {
      give: 0.10753384682092598,
      head: 0.10007923043569088,
      lame: 0.09398836535510434,
      maybe: 0.08883861230659562,
      slippery: 0.13069000033353992,
      slope: 0.11714451886771829
    }

    const result = functions.sortable(obj, 5)
    expect(result).toEqual([['slippery', 0.13069000033353992], ['slope', 0.11714451886771829], ['give', 0.10753384682092598], ['head', 0.10007923043569088], ['lame', 0.09398836535510434]])
  })
})
