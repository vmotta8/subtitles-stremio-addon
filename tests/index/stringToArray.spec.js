const functions = require('../../src/index')

describe('string to array', () => {
  it('should return an array with the words in the string', () => {
    const str = "1 \n 00:00:00,000 --> 00:00:01,143 \n That's lame. \n 2 \n 00:00:01,144 --> 00:00:03,339 \n Maybe I should give you a name, \n 3 \n 00:00:03,340 --> 00:00:05,011 \n but that's a slippery slope. \n 4 \n 00:00:05,012 --> 00:00:05,923 \n You're only in my head. \n 5 \n 00:00:05,924 --> 00:00:07,847 \n We have to remember that that."

    const arr = functions.stringToArray(str, 3)
    expect(arr).toEqual([
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
    ])
  })
})
