const functions = require('../../src/index')

describe('term frequency', () => {
  it('should return an object with the words and their tf', () => {
    const obj = { give: 1, have: 1, head: 1, lame: 1, maybe: 1, name: 1, only: 1, remember: 1, should: 1, slippery: 1, slope: 1, that: 2 }

    const result = functions.tf(obj)
    expect(result).toEqual({
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
    })
  })
})
