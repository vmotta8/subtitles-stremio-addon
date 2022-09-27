const { formatSubtitles } = require('./generateSubtitles')
const { mockSubtitles, mockFormattedSubtitles } = require('./generateSubtitles.mock')

describe('formatSubtitles', () => {
  it('should return formatted subtitles', async () => {
    const formattedSubtitles = formatSubtitles(mockSubtitles)
    expect(formattedSubtitles).toEqual(mockFormattedSubtitles)
  })
})
