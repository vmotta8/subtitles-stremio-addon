const { formatSubtitles, translateSubtitles } = require('./generateSubtitles')
const { mockSubtitles, mockFormattedSubtitles, mockTranslatedSubtitles } = require('./generateSubtitles.mock')

describe('formatSubtitles', () => {
  it('should return formatted subtitles', () => {
    const formattedSubtitles = formatSubtitles(mockSubtitles)
    expect(formattedSubtitles).toEqual(mockFormattedSubtitles)
  })
})

describe('translateSubtitles', () => {
  it('should return translated subtitles', async () => {
    const notEnglishSubtitles = {
      id: 'pt-1',
      url: 'https://www.opensubtitles.org/en/subtitles/1234567/pt',
      lang: 'Portuguese (Brazil)'
    }
    const translatedSubtitles = await translateSubtitles([...mockFormattedSubtitles, notEnglishSubtitles])
    expect(translatedSubtitles).toEqual(mockTranslatedSubtitles)
  })
})
