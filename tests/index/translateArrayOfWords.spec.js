const functions = require('../../src/index')

describe('translate array os words', () => {
  it('should return an object with the words translated', async () => {
    const arr = [['slippery', 0.13069000033353992], ['slope', 0.11714451886771829], ['give', 0.10753384682092598], ['head', 0.10007923043569088], ['vinicius', 0.09298836535510434]]

    const result = await functions.translateArrayOfWords(arr, 'en', 'pt')
    expect(result).toEqual({ give: 'dar', head: 'cabeça', slippery: 'escorregadio', slope: 'declive' })
  })
})
