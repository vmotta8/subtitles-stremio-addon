const { formatSubtitles } = require('./generateSubtitles')
const { mockSubtitles, mockFormattedSubtitles } = require('./generateSubtitles.mock')

jest.mock('axios')

describe('formatSubtitles', () => {
  it('should return formatted subtitles', () => {
    const formattedSubtitles = formatSubtitles(mockSubtitles)
    expect(formattedSubtitles).toEqual(mockFormattedSubtitles)
  })
})
