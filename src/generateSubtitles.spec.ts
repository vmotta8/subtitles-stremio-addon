const { generateSubtitle } = require('./generateSubtitle')

describe('generate subtitle', () => {
  it('should return an array os objects', async () => {
    const subtitles = await generateSubtitle({ imdbid: 'tt4158110', season: '1', episode: '1' })
    expect(typeof subtitles).toBe('object')
  })
})