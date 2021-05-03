const { generateSubtitle } = require('./generateSubtitle')

describe('generate subtitle', () => {
  it('should return an array of objects', async () => {
    const subtitles = await generateSubtitle({ imdbid: 'tt4158110', season: '1', episode: '1' })
    expect(typeof subtitles).toBe('object')
  })

  it('should return an empty array', async () => {
    const subtitles = await generateSubtitle({ imdbid: 'ABCDEFGH', season: '1', episode: '1' })
    expect(subtitles).toEqual([])
  })
})